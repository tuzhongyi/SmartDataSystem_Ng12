import { SelectionChange } from '@angular/cdk/collections';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ClassConstructor } from 'class-transformer';
import { ToastrService } from 'ngx-toastr';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';

import { Division } from 'src/app/network/model/garbage-station/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { CommonNestNode } from 'src/app/view-model/common-nest-node.model';

import { Deduplication } from '../../tools/deduplication';
import { CommonTree } from '../common-tree/common-tree';
import { CommonTreeComponent } from '../common-tree/common-tree.component';
import { DivisionTreeBusiness } from './division-tree.business';
import {
  DivisionTreeSource,
  IDivisionTreeBusiness,
  IDivisionTreeComponent,
} from './division-tree.model';
import { DivisionTreeService } from './division-tree.service';

@Component({
  selector: 'howell-division-tree',
  templateUrl: './division-tree.component.html',
  styleUrls: ['./division-tree.component.less'],
  providers: [DivisionTreeService, DivisionTreeBusiness],
})
export class DivisionTreeComponent
  extends CommonTree
  implements IDivisionTreeComponent, OnInit
{
  private _business?: IDivisionTreeBusiness;
  public get business(): IDivisionTreeBusiness {
    if (!this._business) {
      this._business = this.defaultBusiness;
    }
    return this._business;
  }
  @Input()
  public set business(v: IDivisionTreeBusiness | undefined) {
    this._business = v;
  }

  @Input()
  holdStatus = false;

  @Input()
  selectStrategy = SelectStrategy.Single;

  @Input('showStation')
  showStation = false; // 区划树或厢房树

  @Input()
  showSearchBar = true;

  @Input()
  showButtonIcon = false;

  // 默认选中列表
  private _defaultIds: string[] = [];
  @Input()
  set defaultIds(ids: string[]) {
    // 排除空字符串
    this._defaultIds = ids.filter((id) => id);
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
      val = 0;
    }
    this._depth = val;
  }
  get depth() {
    return this._depth;
  }

  // 展示数据的深度，一般等于 depth
  private _showDepth: number = -1;
  @Input()
  set showDepth(val: number) {
    if (val < 0) {
      val = 0;
    }
    this._showDepth = val;
  }
  get showDepth() {
    return this._showDepth;
  }

  // 最高区划等级
  private _resourceType: DivisionType = DivisionType.City;
  @Input()
  set resourceType(type: DivisionType) {
    this._resourceType = type;
  }
  get resourceType() {
    return this._resourceType;
  }

  // 抛出指定类型的节点
  @Input()
  filterTypes: ClassConstructor<any>[] = [];

  @Output()
  defaultIdsChange = new EventEmitter<string[]>();
  @Output()
  selectTreeNode: EventEmitter<CommonFlatNode<DivisionTreeSource>[]> =
    new EventEmitter<CommonFlatNode<DivisionTreeSource>[]>();
  @Output()
  holdStatusChange = new EventEmitter();
  @Output() buttonIconClickEvent = new EventEmitter<CommonFlatNode>();

  @Input()
  load?: EventEmitter<void>;
  @Output()
  loaded: EventEmitter<CommonNestNode[]> = new EventEmitter();
  @Input() trigger?: EventEmitter<string[]> = new EventEmitter();

  constructor(
    private defaultBusiness: DivisionTreeBusiness,
    private _toastrService: ToastrService
  ) {
    super();
    this._excludeGuards = Deduplication.generateExcludeArray(
      this._searchGuards
    );
  }

  @ViewChild(CommonTreeComponent) tree?: CommonTreeComponent;

  // 要屏蔽的搜索字符串
  private _condition: string | Symbol = Symbol.for('DIVISION-TREE');
  private _searchGuards: string[] = ['街道', '路居委会'];
  /**
   *  屏蔽: 街,街道,道,居,居委,居委会,委,委会,会
   */
  private _excludeGuards: string[] = [];

  treeLoad = new EventEmitter<void>();

  ngOnInit(): void {
    this.regist();
    // 如果showDepth没有设置或者比depth大，则用depth的值
    if (this.showDepth == -1 || this.showDepth > this.depth)
      this.showDepth = this.depth;

    this.business.showExtend = this.showStation;
    this.business.depthIsEnd = this.depthIsEnd;
    this._init();
  }

  regist() {
    if (this.load) {
      this.load.subscribe((x) => {
        this._init();
      });
    }
    if (this.trigger) {
      this.trigger.subscribe((x) => {
        this.toggleNodes(x);
      });
    }
  }

  private async _init() {
    this._nestedNodeMap = this.business.nestedNodeMap;

    let res = await this.business.load(this.resourceType, this.depth);
    this.loaded.emit(res);
    this.dataSubject.next(res);
    this.treeLoad.emit();
    if (this.tree) {
      this.tree.expandNodeRecursively(res, this.showDepth);
      this.tree.setDefaultNodes();
    }
  }

  async loadChildrenEvent(flat: CommonFlatNode<Division>) {
    let node = await this.business.loadChildren(flat);
    if (node) {
      this.dataSubject.next(this.dataSubject.value);

      if (this.tree) {
        this.tree.checkAllDescendants(flat);
        // 一定要在check之后设置默认
        this.tree.setDefaultNodes();
      }
    }
  }
  override selectTreeNodeHandler(change: SelectionChange<CommonFlatNode<any>>) {
    let nodes = change.source.selected;
    // console.log('选中节点', nodes)
    let filtered: CommonFlatNode<DivisionTreeSource>[] = [];
    if (this.filterTypes.length == 0) {
      filtered = nodes;
      this.selectTreeNode.emit(filtered);
    } else {
      filtered = nodes.filter((node) => {
        return this.filterTypes.some((type) => this._filterNode(type, node));
      });
      let has1 = change.added.some((node) =>
        this.filterTypes.some((type) => this._filterNode(type, node))
      );
      let has2 = change.removed.some((node) =>
        this.filterTypes.some((type) => this._filterNode(type, node))
      );
      // 添加/删除操作仅涉及到 filtered节点时,才抛事件
      if (has1 || has2) {
        // console.log('过滤后的节点', filtered)
        this.selectTreeNode.emit(filtered);
      }
    }
  }
  defaultIdsChangeHandler(ids: string[]) {
    this.defaultIdsChange.emit(ids);
  }
  async searchEventHandler(condition: string) {
    console.log('搜索字段', condition);
    if (this._condition == condition && this._condition != '') {
      this._toastrService.warning('重复搜索相同字段');
      return;
    }
    if (this._excludeGuards.includes(condition)) {
      this._toastrService.warning('关键字不能是: ' + condition);
      return;
    }

    this._condition = condition;

    let res = await this.business.searchNode(
      condition,
      this.resourceType,
      this.depth
    );
    if (res && res.length) {
      this._toastrService.success('操作成功');
      this.dataSubject.next(res);
      if (condition != '') {
        this.tree?.expandAll();
      } else {
        this.tree?.reset();
        this.tree?.collapseAll();
      }
    } else {
      this._toastrService.warning('无匹配结果');
    }
  }

  changeDivisionTreeConfig(type: DivisionType, depth?: number) {
    if (type == DivisionType.None) return;

    this.resourceType = type;
    if (depth) {
      this.depth = depth;
    }
    this._init();
  }
  buttonIconClick(node: CommonFlatNode) {
    this.buttonIconClickEvent.emit(node);
  }

  collapseAll() {
    this.tree?.collapseAll();
  }
  reset() {
    this.tree?.reset();
  }
  private _filterNode<T>(type: ClassConstructor<T>, node: CommonFlatNode) {
    let raw = node.RawData;
    if (raw instanceof Division) {
      return type.name === Division.name;
    } else if (raw instanceof GarbageStation) {
      return type.name === GarbageStation.name;
    }
    return false;
  }
}
