import { SelectionChange } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { DistrictTreeEnum } from 'src/app/enum/district-tree.enum';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { CommonNestNode } from 'src/app/view-model/common-nest-node.model';
import { Deduplication } from '../../tools/deduplication';
import { CommonTreeComponent } from '../common-tree/common-tree.component';
import { DivisionTreeBusiness } from './division-tree.business';

@Component({
  selector: 'howell-division-tree',
  templateUrl: './division-tree.component.html',
  styleUrls: ['./division-tree.component.less'],
  providers: [
    DivisionTreeBusiness
  ]
})
export class DivisionTreeComponent implements OnInit {


  // 要屏蔽的搜索字符串
  private _condition: string | Symbol = Symbol.for('DIVISION-TREE');
  private _searchGuards: string[] = ['街道', '路居委会'];
  /**
   *  屏蔽: 街,街道,道,居,居委,居委会,委,委会,会
   */
  private _excludeGuards: string[] = [];
  private _nestedNodeMap = new Map<string, CommonNestNode>();


  dataSubject = new BehaviorSubject<CommonNestNode[]>([]);


  @Input()
  holdStatus = false;

  @Input()
  selectStrategy = SelectStrategy.Single;

  @Input('showStation')
  showStation = false; // 区划树或厢房树

  @Input() showSearchBar = true;


  // 默认选中列表
  private _defaultIds: string[] = []
  @Input()
  set defaultIds(ids: string[]) {
    // 排除空字符串
    this._defaultIds = ids.filter(id => id);
  }
  get defaultIds() {
    return this._defaultIds;
  }

  // 强制最大深度节点为叶节点，虽然实际有子节点
  @Input()
  depthIsEnd = false;

  // 请求数据的深度
  private _depth: number = 0;
  @Input()
  set depth(val: number) {
    if (val < 0) {
      val = 0
    }
    this._depth = val;
  }
  get depth() {
    return this._depth
  }

  // 展示数据的深度，一般等于 depth
  private _showDepth: number = -1;
  @Input()
  set showDepth(val: number) {
    if (val < 0) {
      val = 0
    }
    this._showDepth = val;
  }
  get showDepth() {
    return this._showDepth
  }

  // 最高区划等级
  private _userResourceType: UserResourceType = UserResourceType.City;
  @Input()
  set resourceType(type: UserResourceType) {
    if (type !== UserResourceType.None) {
      this._userResourceType = type
    }
  }
  get resourceType() {
    return this._userResourceType
  }

  // 抛出指定类型的节点
  @Input() filterTypes: UserResourceType[] = []


  @Output() defaultIdsChange = new EventEmitter<string[]>();
  @Output() selectTreeNode: EventEmitter<CommonFlatNode<Division | GarbageStation>[]> = new EventEmitter<CommonFlatNode<Division | GarbageStation>[]>();

  @Output() holdStatusChange = new EventEmitter();

  @ViewChild(CommonTreeComponent) tree?: CommonTreeComponent;

  constructor(private _business: DivisionTreeBusiness, private _toastrService: ToastrService) {
    this._excludeGuards = Deduplication.generateExcludeArray(this._searchGuards)
  }

  ngOnInit(): void {
    // 如果showDepth没有设置或者比depth大，则用depth的值
    if (this.showDepth == -1 || this.showDepth > this.depth)
      this.showDepth = this.depth;

    this._business.showStation = this.showStation;
    this._business.depthIsEnd = this.depthIsEnd;
    this._init()
  }
  private async _init() {
    this._nestedNodeMap = this._business.nestedNodeMap;


    let res = await this._business.init(this.resourceType, this.depth);
    this.dataSubject.next(res)
    if (this.tree) {
      this.tree.expandNodeRecursively(res, this.showDepth)
    }
  }

  async loadChildrenEvent(flat: CommonFlatNode<Division>) {
    let node = await this._business.loadChildren(flat);
    if (node) {
      this.dataSubject.next(this.dataSubject.value)
      if (this.tree) {
        this.tree.checkAllDescendants(flat)
      }
    }

  }
  selectTreeNodeHandler(change: SelectionChange<CommonFlatNode<any>>) {
    let nodes = change.source.selected;
    // console.log('选中节点', nodes)
    let filtered: CommonFlatNode<Division | GarbageStation>[] = [];
    if (this.filterTypes.includes(UserResourceType.None) || this.filterTypes.length == 0) {
      filtered = nodes;
      this.selectTreeNode.emit(filtered);
    } else {
      filtered = nodes.filter(node => {
        return this.filterTypes.some(type => this._filterNode(type, node))
      })
      let has1 = change.added.some(node => this.filterTypes.some(type => this._filterNode(type, node)))
      let has2 = change.removed.some(node => this.filterTypes.some(type => this._filterNode(type, node)))
      // 添加/删除操作仅涉及到 filtered节点时,才抛事件
      if (has1 || has2) {
        // console.log('过滤后的节点', filtered)
        this.selectTreeNode.emit(filtered);
      }
    }
  }
  defaultIdsChangeHandler(ids: string[]) {
    this.defaultIdsChange.emit(ids)
  }
  holdStatusChangeHandler(change: boolean) {
    this.holdStatus = change;
    this.holdStatusChange.emit(change)
  }
  async searchEventHandler(condition: string) {
    console.log('搜索字段', condition)
    if (this._condition == condition && this._condition != '') {
      this._toastrService.warning('重复搜索相同字段');
      return;
    }
    if (this._excludeGuards.includes(condition)) {
      this._toastrService.warning('关键字不能是: ' + condition);
      return;
    }

    this._condition = condition;

    let res = await this._business.searchNode(condition, this.resourceType, this.depth)
    if (res && res.length) {
      this._toastrService.success('操作成功');
      this.dataSubject.next(res);
      if (condition != '') {
        this.tree?.expandAll()
      } else {
        this.tree?.reset();
        this.tree?.collapseAll()
      }
    } else {
      this._toastrService.warning('无匹配结果');
    }
  }

  changeDivisionTreeConfig(type: UserResourceType, depth?: number) {
    if (type == UserResourceType.None) return;

    this.resourceType = type;
    if (depth) {
      this.depth = depth
    }
    this._init()
  }

  addNode(node: CommonNestNode) {
    if (node.ParentId) {
      let parentNode = this._nestedNodeMap.get(node.ParentId);
      if (parentNode) {

        parentNode.HasChildren = true;
        parentNode.childrenChange.value.push(node);

      }
    } else {
      this.dataSubject.value.push(node);
    }
    this._nestedNodeMap.set(node.Id, node);
    this.dataSubject.next(this.dataSubject.value)
  }

  /**原节点有各种状态,使用原节点 */
  editNode(node: CommonNestNode) {
    let currentNode = this._nestedNodeMap.get(node.Id);
    if (currentNode) {
      currentNode.Name = node.Name;
      currentNode.RawData = node.RawData;
    }
    this.dataSubject.next(this.dataSubject.value);
  }

  deleteNode(flat: CommonFlatNode) {
    const node = flat;
    // 当前要删除的节点
    let currentNode = this._nestedNodeMap.get(node.Id);
    if (currentNode) {
      // 该节点有没有父节点
      if (currentNode.ParentId) {
        let parentNode = this._nestedNodeMap.get(currentNode.ParentId)!;
        let index = parentNode.childrenChange.value.indexOf(currentNode);
        if (index != -1) {
          parentNode.childrenChange.value.splice(index, 1);
          parentNode.HasChildren = parentNode.childrenChange.value.length > 0;
        }
      } else {
        let index = this.dataSubject.value.indexOf(currentNode);
        if (index != -1) {
          this.dataSubject.value.splice(index, 1);
        }
      }
      this._nestedNodeMap.delete(currentNode.Id);
    }
    this.dataSubject.next(this.dataSubject.value);
    this.tree?.deleteNode(flat)
  }


  private _filterNode(type: UserResourceType, node: CommonFlatNode) {
    let raw = node.RawData;
    let t: UserResourceType = UserResourceType.None
    if (raw instanceof Division) {
      t = EnumHelper.ConvertDivisionToUserResource(raw.DivisionType)
    } else if (raw instanceof GarbageStation) {
      t = UserResourceType.Station;
    }
    return t == type;
  }
}
