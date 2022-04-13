import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';

import { EnumHelper } from 'src/app/enum/enum-helper';
import { TreeSelectEnum } from 'src/app/enum/tree-select.enum';
import { TreeServiceEnum } from 'src/app/enum/tree-service.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { DivisionNode } from 'src/app/network/model/division-tree.model';
import { Division } from 'src/app/network/model/division.model';
import { FlatTreeNode } from 'src/app/view-model/flat-tree-node.model';
import { NestedTreeNode } from 'src/app/view-model/nested-tree-node.model';
import { TreeServiceInterface } from './interface/tree-service.interface';

import { DivisionTreeService } from './services/division-tree.service';
import { StationTreeService } from './services/station-tree.service';
import { TreeService } from './services/tree.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.less'],
  providers: [
    TreeService,
  ],
})
export class TreeComponent implements OnInit {
  TreeSelectEnum = TreeSelectEnum;

  private _nodeIconType = new Map([
    [UserResourceType.City, 'howell-icon-earth'],
    [UserResourceType.County, 'howell-icon-map5'],
    [UserResourceType.Committees, 'howell-icon-map5'],
    [UserResourceType.Station, 'howell-icon-garbage'],
  ]);

  private _flatNodeMap = new Map<string, FlatTreeNode>();
  private _transformer = (node: NestedTreeNode, level: number) => {
    const existingNode = this._flatNodeMap.get(node.id);

    if (existingNode) {
      existingNode.name = node.name;
      existingNode.expandable = node.hasChildren;
      return existingNode;
    }
    const newNode = new FlatTreeNode(
      node.id,
      node.name,
      level,
      node.hasChildren,
      node.parentId,
      this._nodeIconType.get(node.type),
      node.type,
      node.rawData
    );
    this._flatNodeMap.set(node.id, newNode);
    return newNode;
  };
  private _getLevel = (node: FlatTreeNode) => node.level;
  private _isExpandable = (node: FlatTreeNode) => node.expandable;
  private _getChildren = (node: NestedTreeNode) => node.childrenChange;
  private _hasChild = (index: number, node: FlatTreeNode) => node.expandable;
  private _treeFlattener: MatTreeFlattener<NestedTreeNode, FlatTreeNode>;
  private dataChange = new BehaviorSubject<NestedTreeNode[]>([]);
  private _nestedNodeMap = new Map<string, NestedTreeNode>();
  private _currentNode: FlatTreeNode | null = null;

  /****** public ********/
  treeControl: FlatTreeControl<FlatTreeNode>;
  dataSource: MatTreeFlatDataSource<NestedTreeNode, FlatTreeNode>;
  // 一定要返回对象
  trackBy = (index: number, node: FlatTreeNode) => node;

  selection!: SelectionModel<FlatTreeNode>;// 保存选中节点

  // 高亮显示选中节点
  highLight = (node: FlatTreeNode) => {
    if (this.selectModel == TreeSelectEnum.Single) {
      return this.selection.isSelected(node);
    } else if (this.selectModel == TreeSelectEnum.Multiple) {
      // 仅当前点击的高亮，其他节点状态通过checkbox体现
      return this._currentNode && this._currentNode.id == node.id;

      // return this.selection.isSelected(node);// 所有选中的都高亮
    }
    return false;
  };

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

  // 强制最大深度节点为叶节点
  @Input()
  depthIsEnd = false;

  @Input('treeServiceModel')
  serviceModel = TreeServiceEnum.Division; // 区划树或厢房树

  @Input('treeSelectModel')
  selectModel = TreeSelectEnum.Single;// 单选或多选

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

  private _defaultIds: string[] = []
  @Input()
  set defaultIds(ids: string[]) {
    if (this.selectModel == TreeSelectEnum.Single) {
      if (ids.length > 0)
        this._defaultIds = [ids[0]]
    } else if (this.selectModel == TreeSelectEnum.Multiple) {
      this._defaultIds = ids;
    }

  }
  get defaultIds() {
    return this._defaultIds;
  }

  @Output() selectTreeNode: EventEmitter<FlatTreeNode[]> = new EventEmitter<FlatTreeNode[]>();


  constructor(private _treeService: TreeService) {
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

    this.dataSource = new MatTreeFlatDataSource<NestedTreeNode, FlatTreeNode>(
      this.treeControl,
      this._treeFlattener
    );

    this.dataChange.subscribe((data) => {
      this.dataSource.data = data;

    });

    this._nestedNodeMap = this._treeService.nestedNodeMap;
  }
  ngOnInit() {

    console.log('树类型: ', this.serviceModel)

    if (this.selectModel == TreeSelectEnum.Single) {
      this.selection = new SelectionModel<FlatTreeNode>();
    } else {
      this.selection = new SelectionModel<FlatTreeNode>(true);
    }
    this.selection.changed.subscribe((change) => {
      console.log('selected nodes: ', this.selection.selected)
      this.selectTreeNode.emit(change.source.selected);
    });

    this._treeService.model = this.serviceModel;
    this._treeService.depthIsEnd = this.depthIsEnd

    // 如果showDepth没有设置或者比depth大，则用depth的值
    if (this.showDepth == -1 || this.showDepth > this.depth)
      this.showDepth = this.depth;


    this._initialize();
  }

  private async _initialize() {
    this._flatNodeMap.clear();
    // this.treeControl.collapseAll();

    const nodes = await this._treeService.initialize(
      this.resourceType,
      this.depth
    );
    // console.log('树节点: ', nodes)
    this.dataChange.next(nodes);
    this._setDefaultNodes()

    this._expandNodeRecursively(nodes)

  }
  private _expandNodeRecursively(nodes: NestedTreeNode[]) {
    if (this.showDepth <= 0) return

    for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i];
      let flatNode = this._flatNodeMap.get(node.id);
      if (flatNode && flatNode.level < this.showDepth) {
        this.treeControl.expand(flatNode)
        this._expandNodeRecursively(node.childrenChange.value)
      } else {
        // console.log('break', node)
        break;
      }
    }

  }

  changeTreeConfig(type: UserResourceType, depth?: number) {
    if (type == UserResourceType.None) return;

    this.resourceType = type;
    if (depth) {
      this.depth = depth
    }
    this._initialize()
  }
  async loadChildren(node: FlatTreeNode) {
    if (this.treeControl.isExpanded(node)) {
      const nestedNode = this._nestedNodeMap.get(node.id);
      if (nestedNode && !nestedNode.childrenLoaded) {
        let nodes = await this._treeService.loadChildren(nestedNode);
        // // console.log('chidren', nodes);
        nestedNode.childrenLoaded = true;
        nestedNode.childrenChange.next(nodes);
        this.dataChange.next(this.dataChange.value);
        this._checkAllDescendants(node);
        this._setDefaultNodes()
      }
    } else {
      this.treeControl.collapseDescendants(node);
    }
  }
  singleSelectNode(node: FlatTreeNode) {
    this.selection.toggle(node);
  }
  multipleSelectNode(node: FlatTreeNode) {

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

  addNode(node: NestedTreeNode) {
    if (node.parentId) {
      let parentNode = this._nestedNodeMap.get(node.parentId);
      if (parentNode) {
        node.type = EnumHelper.GetResourceChildType(parentNode.type);
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
      }
    }
  }
  editNode(node: NestedTreeNode) {
    let currentNode = this._nestedNodeMap.get(node.id);
    if (currentNode) {
      currentNode.name = node.name;
      currentNode.description = node.description;
    }
    this.dataChange.next(this.dataChange.value);
  }
  async searchNode(condition: string) {
    // this.selection.clear();
    // let nodes: NestedTreeNode[] = await this._treeService.searchNode(condition);

    // if (nodes.length) {
    //   this._nestedNodeMap.clear();
    //   this._register(nodes);
    //   this.dataChange.next(nodes);

    //   if (condition !== '') {
    //     this.treeControl.expandAll();
    //   } else {
    //     this.treeControl.collapseAll();
    //   }
    // }
    // return nodes;
  }


  private _setDefaultNodes() {
    let len = this.defaultIds.length;
    if (len == 0) return;
    let res: string[] = [];
    for (let i = 0; i < len; i++) {
      let id = this.defaultIds[i];

      let node = this._flatNodeMap.get(id);
      if (node) {
        console.log(node)
        this.selection.select(node)
      } else {
        res.push(id)
      }
    }
    this.defaultIds = res;

    console.log(this.defaultIds)

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
