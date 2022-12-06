import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { DistrictTreeEnum } from 'src/app/enum/district-tree.enum';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { TreeBusinessEnum } from 'src/app/enum/tree-business.enum';
import { Deduplication } from 'src/app/common/tools/deduplication';
import { FlatTreeNode } from 'src/app/view-model/flat-tree-node.model';
import { NestTreeNode } from 'src/app/view-model/nest-tree-node.model';

import { TreeBusinessFactory } from './business/tree-business.factory';
import { TreeBusinessInterface } from './interface/tree-business.interface';
import { TreeBusinessProviders } from './tokens/tree-business.token';
import { ClassConstructor } from 'class-transformer';
import { DivisionType } from 'src/app/enum/division-type.enum';

@Component({
  selector: 'howell-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.less'],
  providers: [TreeBusinessFactory, ...TreeBusinessProviders],
})
export class TreeComponent implements OnInit {
  private _flatNodeMap = new Map<string, FlatTreeNode>();
  private _transformer = (nestNode: NestTreeNode, level: number) => {
    const existingNode = this._flatNodeMap.get(nestNode.id);

    if (existingNode) {
      existingNode.name = nestNode.name;
      existingNode.expandable = nestNode.hasChildren;
      return existingNode;
    }
    const flatNode = new FlatTreeNode(
      nestNode.id,
      nestNode.name,
      level,
      nestNode.description,
      nestNode.hasChildren,
      nestNode.parentId,
      nestNode.iconType,
      nestNode.type
    );

    if (nestNode.parentId) {
      let parentFlatNode = this._flatNodeMap.get(nestNode.parentId);
      flatNode.parentNode = parentFlatNode;
    }
    flatNode.rawData = nestNode.rawData;

    this._flatNodeMap.set(nestNode.id, flatNode);
    return flatNode;
  };
  private _getLevel = (node: FlatTreeNode) => node.level;
  private _isExpandable = (node: FlatTreeNode) => node.expandable;
  private _getChildren = (node: NestTreeNode) => node.childrenChange;
  private _hasChild = (index: number, node: FlatTreeNode) => node.expandable;
  private _treeFlattener: MatTreeFlattener<NestTreeNode, FlatTreeNode>;

  private dataChange = new BehaviorSubject<NestTreeNode[]>([]);
  private _nestedNodeMap = new Map<string, NestTreeNode>();
  private _currentNode: FlatTreeNode | null = null;

  // 要屏蔽的搜索字符串
  private _searchGuards: string[] = ['街道', '路居委会'];
  private _condition: string | Symbol = Symbol.for('DIVISION-TREE');

  private _business!: TreeBusinessInterface;

  /**
   *  屏蔽: 街,街道,道,居,居委,居委会,委,委会,会
   */
  private _excludeGuards: string[] = [];

  /****** public ********/
  treeControl: FlatTreeControl<FlatTreeNode>;
  dataSource: MatTreeFlatDataSource<NestTreeNode, FlatTreeNode>;
  // 一定要返回对象
  trackBy = (index: number, node: FlatTreeNode) => node;

  selection!: SelectionModel<FlatTreeNode>; // 保存选中节点
  TreeSelectEnum = SelectStrategy;

  // 高亮显示选中节点
  highLight = (node: FlatTreeNode) => {
    if (this.selectModel == SelectStrategy.Single) {
      return this.selection.isSelected(node);
    } else if (this.selectModel == SelectStrategy.Multiple) {
      // 仅当前点击的高亮，其他节点状态通过checkbox体现
      return this._currentNode && this._currentNode.id == node.id;

      // return this.selection.isSelected(node);// 所有选中的都高亮
    }
    return false;
  };

  @Input('treeServiceModel')
  serviceModel = DistrictTreeEnum.Division; // 区划树或厢房树

  @Input('treeSelectModel')
  selectModel = SelectStrategy.Single; // 单选或多选

  @Input('treeBusinessProvider')
  businessProvider = TreeBusinessEnum.District;

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
  // 强制最大深度节点为叶节点
  @Input()
  depthIsEnd = false;

  // 最高区划等级
  private _divisionType: DivisionType = DivisionType.County;
  @Input()
  set resourceType(type: DivisionType) {
    if (type !== DivisionType.None) {
      this._divisionType = type;
    }
  }
  get resourceType() {
    return this._divisionType;
  }

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
  // 当前节点选中后，再次点击不会取消选中，但是点击其他节点会取消当前节点选中
  @Input() holdStatus: boolean = false;

  // 指定类型的节点会被选中
  @Input() filterTypes: ClassConstructor<any>[] = [];

  @Input() showSearchBar = true;

  @Output() holdStatusChange = new EventEmitter<boolean>();

  @Output() selectTreeNode: EventEmitter<FlatTreeNode[]> = new EventEmitter<
    FlatTreeNode[]
  >();

  @Output() defaultIdsChange = new EventEmitter<string[]>();

  constructor(
    private _businessFactory: TreeBusinessFactory,
    private _toastrService: ToastrService
  ) {
    this._treeFlattener = new MatTreeFlattener(
      this._transformer,
      this._getLevel,
      this._isExpandable,
      this._getChildren
    );

    this.treeControl = new FlatTreeControl<FlatTreeNode>(
      this._getLevel,
      this._isExpandable
    );

    this.dataSource = new MatTreeFlatDataSource<NestTreeNode, FlatTreeNode>(
      this.treeControl,
      this._treeFlattener
    );

    this.dataChange.subscribe((data) => {
      this.dataSource.data = data;
    });

    this._excludeGuards = Deduplication.generateExcludeArray(
      this._searchGuards
    );
  }
  ngOnInit() {
    this._business = this._businessFactory.createBusiness(
      this.businessProvider
    );

    this._nestedNodeMap = this._business.nestedNodeMap;

    if (this.selectModel == SelectStrategy.Single) {
      this.selection = new SelectionModel<FlatTreeNode>();
    } else {
      this.selection = new SelectionModel<FlatTreeNode>(true);
    }
    this.selection.changed.subscribe((change) => {
      // console.log('添加节点', change.added);
      // console.log('删除节点', change.removed);
      // console.log("当前节点", change.source.selected)

      let filtered: FlatTreeNode[] = [];
      if (this.filterTypes.length == 0) {
        filtered = change.source.selected;
        this.selectTreeNode.emit(filtered);
      } else {
        filtered = change.source.selected.filter((node) => {
          return this.filterTypes.some(
            (type) => node.rawData.constructor.name == type.name
          );
        });
        let has1 = change.added.some((node) =>
          this.filterTypes.some(
            (type) => node.rawData.constructor.name == type.name
          )
        );
        let has2 = change.removed.some((node) =>
          this.filterTypes.some(
            (type) => node.rawData.constructor.name == type.name
          )
        );
        if (has1 || has2) {
          this.selectTreeNode.emit(filtered);
        }
      }
    });

    this._business.model = this.serviceModel;
    this._business.depthIsEnd = this.depthIsEnd;

    // 如果showDepth没有设置或者比depth大，则用depth的值
    if (this.showDepth == -1 || this.showDepth > this.depth)
      this.showDepth = this.depth;

    this._initialize();
  }

  async searchEventHandler(condition: string) {
    if (this._condition == condition && this._condition != '') {
      this._toastrService.warning('重复搜索相同字段');
      return;
    }
    if (this._excludeGuards.includes(condition)) {
      this._toastrService.warning('关键字不能是: ' + condition);
      return;
    }

    this._condition = condition;

    let res = await this.searchNode(condition);
    if (res && res.length) {
      this._toastrService.success('操作成功');
    } else {
      this._toastrService.warning('无匹配结果');
    }
  }
  private async _initialize() {
    this._flatNodeMap.clear();
    this.treeControl.collapseAll();

    const nodes = await this._business.initialize(
      this.resourceType,
      this.depth
    );
    console.log('树节点: ', nodes);

    this.dataChange.next(nodes);

    if (nodes.length == 1 && this.businessProvider == TreeBusinessEnum.Region) {
      this.defaultIds.push(nodes[0].id);
    }
    // 设置预选节点
    this._setDefaultNodes();

    // 展开树
    this._expandNodeRecursively(nodes);
  }
  // 根据 showDepth 自动展开
  private _expandNodeRecursively(nodes: NestTreeNode[]) {
    if (this.showDepth <= 0) return;

    for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i];
      let flatNode = this._flatNodeMap.get(node.id);
      if (flatNode && flatNode.level < this.showDepth) {
        this.treeControl.expand(flatNode);
        this._expandNodeRecursively(node.childrenChange.value);
      } else {
        break;
      }
    }
  }

  toggleSelect(ids: string[]) {
    this.selection.clear();
    for (let i = 0; i < ids.length; i++) {
      let id = ids[i];
      let flatNode = this._flatNodeMap.get(id);
      if (flatNode) {
        this.selection.toggle(flatNode);
      }
    }
  }
  changeTreeConfig(type: DivisionType, depth?: number) {
    if (type == DivisionType.None) return;

    this.resourceType = type;
    if (depth) {
      this.depth = depth;
    }
    this._initialize();
  }
  async loadChildren(node: FlatTreeNode) {
    if (this.treeControl.isExpanded(node)) {
      const nestedNode = this._nestedNodeMap.get(node.id);
      // 仅拉取子节点数据一次
      if (nestedNode && !nestedNode.childrenLoaded) {
        let nodes = await this._business.loadChildren(nestedNode);
        // // console.log('chidren', nodes);
        nestedNode.childrenLoaded = true;
        nestedNode.childrenChange.next(nodes);
        this.dataChange.next(this.dataChange.value);

        // 多选的时候
        this._checkAllDescendants(node);
      }
      this._setDefaultNodes();
    } else {
      this.treeControl.collapseDescendants(node);
    }
  }
  singleSelectNode(node: FlatTreeNode) {
    console.log(node);
    if (this.holdStatus) {
      if (this.selection.isSelected(node)) {
        return;
      } else {
        this.holdStatusChange.emit(false);
      }
    }

    this.selection.toggle(node);
  }
  multipleSelectNode(node: FlatTreeNode) {
    if (this.holdStatus) {
      if (this.selection.isSelected(node)) {
        return;
      }
    }

    // 处理当前节点
    this.selection.toggle(node);
    this._currentNode = node;

    // 更改后代节点状态
    this._checkAllDescendants(node);

    // 更改父节点状态
    this._checkAllParentsSelection(node);
  }
  /**
   *  当前节点的所有后代节点部分被选中，但不能全被选中，则显示 indetermindate 状态(优先级比checked状态低)
   * @param node
   * @returns
   */
  descendantsPartiallySelected(node: FlatTreeNode) {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some((child) =>
      this.selection.isSelected(child)
    );
    return result && !this._descendantAllSelected(node);
  }

  /***增，删，改，查节点 */

  addNode(node: NestTreeNode) {
    if (node.parentId) {
      let parentNode = this._nestedNodeMap.get(node.parentId);
      if (parentNode) {
        if (parentNode.childrenChange.value.length == 0) {
          parentNode.childrenLoaded = true;
        }
        parentNode.hasChildren = true;
        parentNode.childrenChange.value.push(node);
      }
    } else {
      this.dataChange.value.push(node);
    }
    this._nestedNodeMap.set(node.id, node);
    this.dataChange.next(this.dataChange.value);
  }
  deleteNode(id: string) {
    if (id) {
      const node = this._flatNodeMap.get(id);
      // 当前要删除的节点
      let currentNode = this._nestedNodeMap.get(id);
      if (currentNode) {
        // 该节点有没有父节点
        if (currentNode.parentId) {
          let parentNode = this._nestedNodeMap.get(currentNode.parentId)!;
          let index = parentNode.childrenChange.value.indexOf(currentNode);
          if (index != -1) {
            parentNode.childrenChange.value.splice(index, 1);
            parentNode.hasChildren = parentNode.childrenChange.value.length > 0;
          }
        } else {
          let index = this.dataChange.value.indexOf(currentNode);
          if (index != -1) {
            this.dataChange.value.splice(index, 1);
          }
        }
        this._nestedNodeMap.delete(currentNode.id);
      }
      this.dataChange.next(this.dataChange.value);

      if (node) {
        this.selection.deselect(node);
        this._flatNodeMap.delete(id);
        if (node.parentId) {
          let parentNode = this._flatNodeMap.get(node.parentId);
          if (parentNode) {
            this.selection.select(parentNode);
          }
        }
      }
    }
  }
  editNode(node: NestTreeNode) {
    let currentNode = this._nestedNodeMap.get(node.id);
    if (currentNode) {
      currentNode.name = node.name;
      currentNode.description = node.description;
    }
    this.dataChange.next(this.dataChange.value);
  }
  async searchNode(condition: string) {
    let selected = this.selection.selected;
    this.selection.clear();
    let nodes: NestTreeNode[] = [];
    nodes = await this._business.searchNode(
      condition,
      this.resourceType,
      this.depth
    );

    if (nodes.length) {
      this.dataChange.next(nodes);

      if (condition !== '') {
        this.treeControl.expandAll();
      } else {
        this.treeControl.collapseAll();
      }
      let selected = this._flatNodeMap.get(nodes[0].id);
      if (this.businessProvider == TreeBusinessEnum.Region) {
        selected && this.selection.select(selected);
      }
    } else {
      if (this.businessProvider == TreeBusinessEnum.Region) {
        this.selection.select(...selected);
      }
    }

    return nodes;
  }

  private _setDefaultNodes() {
    if (this.defaultIds.length == 0) return;
    if (this.selectModel == SelectStrategy.Single) {
      this.defaultIds.length = 1;
    }

    let len = this.defaultIds.length;

    let res: string[] = [];
    for (let i = 0; i < len; i++) {
      let id = this.defaultIds.shift(); // 会改变数组长度
      if (id) {
        let node = this._flatNodeMap.get(id);
        if (node) {
          // 最顶层节点，则直接选中状态
          if (node.parentId == null) {
            this.selection.select(node);
          } else {
            // 上层节点为打开状态,否则没有打开树，就抛选中事件不合逻辑
            let parentNode = this._flatNodeMap.get(node.parentId);
            if (parentNode && this.treeControl.isExpanded(parentNode)) {
              this.selection.select(node);
            } else {
              res.push(id);
            }
          }
        } else {
          // 还没有拉取到该节点
          res.push(id);
        }
      }
    }
    // 循环结束后，留下的都是没有匹配到的节点
    this.defaultIds = res;
    if (len !== this.defaultIds.length)
      this.defaultIdsChange.emit(this.defaultIds);

    console.log('defaultIds', this.defaultIds);
  }
  /**
   *
   * @param node
   * @returns
   * @description 当前节点所有后代节点都被选中
   */
  private _descendantAllSelected(node: FlatTreeNode) {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every((child) => this.selection.isSelected(child));
    return descAllSelected;
  }

  private _checkAllDescendants(node: FlatTreeNode) {
    const descendants = this.treeControl.getDescendants(node);

    /**
     * 如果当前节点选中，则所有子节点被选中
     * 如果当前节点取消选中，则所有子节点取消选中
     */

    if (descendants.length > 0 && this.selection.isMultipleSelection()) {
      this.selection.isSelected(node)
        ? this.selection.select(...descendants)
        : this.selection.deselect(...descendants);
    }
  }

  private _checkAllParentsSelection(node: FlatTreeNode) {
    let parent: FlatTreeNode | null = this._getParentNode(node);
    while (parent) {
      this._checkRootNodeSelection(parent);
      parent = this._getParentNode(parent);
    }
  }
  /**
   *
   * @param node
   * @description 节点从选中状态变成未选中状态，条件是任意后代节点未选中
   * @description 节点从未选中状态变成选中状态，条件是所有后代节点都选中
   */
  private _checkRootNodeSelection(node: FlatTreeNode) {
    const nodeSelected = this.selection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every((child) => this.selection.isSelected(child));

    if (nodeSelected && !descAllSelected) {
      this.selection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.selection.select(node);
    }
  }
  private _getParentNode(node: FlatTreeNode) {
    if (node.parentId) {
      return this._flatNodeMap.get(node.parentId)!;
    }

    return null;
  }
}
