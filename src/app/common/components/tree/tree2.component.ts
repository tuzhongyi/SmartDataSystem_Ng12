import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { DivisionType } from 'src/app/enum/division-type.enum';

import { EnumHelper } from 'src/app/enum/enum-helper';
import { SelectEnum } from 'src/app/enum/select.enum';
import { TreeServiceEnum } from 'src/app/enum/tree-service.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { DivisionNode } from 'src/app/network/model/division-tree.model';
import { Division } from 'src/app/network/model/division.model';
import { FlatTreeNode } from 'src/app/view-model/flat-tree-node.model';
import { NestedTreeNode } from 'src/app/view-model/nested-tree-node.model';
import { TreeServiceInterface } from './interface/tree-service.interface';

import { DivisionTreeService } from './services/division-tree.service';
import { ServiceFactory } from './services/service.factory';
import { StationTreeService } from './services/station-tree.service';
import { TreeProviders } from './tokens/service.token';

@Component({
  selector: 'app-tree2',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.less'],
  providers: [
    ServiceFactory,
    ...TreeProviders,
    {
      provide: DivisionTreeService,
      useClass: DivisionTreeService,
    },
  ],
})
export class TreeComponent2 implements OnInit {
  TreeSelectEnum = SelectEnum;

  /***************private  *********************/
  private _service!: TreeServiceInterface;

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
      node.data
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
  trackBy = (index: number, node: FlatTreeNode) => node;

  @Input('treeServiceProvider')
  serviceProvider = TreeServiceEnum.Division;

  @Input('treeSelectModel')
  selectModel = SelectEnum.Single;

  @Input()
  divisionType?: DivisionType;

  @Output() selectTree: EventEmitter<any> = new EventEmitter<any>();

  selection!: SelectionModel<FlatTreeNode>;

  @Input()
  depth: number = 2;

  highLight = (node: FlatTreeNode) => {
    if (this.selectModel == SelectEnum.Single) {
      return this.selection.isSelected(node);
    } else if (this.selectModel == SelectEnum.Multiple) {
      return this._currentNode && this._currentNode.id == node.id;
    }
    return false;
  };

  constructor(private _serviceFactory: ServiceFactory) {
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
  }
  ngOnInit() {
    if (this.selectModel == SelectEnum.Single) {
      this.selection = new SelectionModel<FlatTreeNode>();
    } else {
      this.selection = new SelectionModel<FlatTreeNode>(true);
    }
    this.selection.changed.subscribe((change) => {
      this.selectTree.emit(change.source.selected);
    });

    this._service = this._serviceFactory.createService(this.serviceProvider);

    this.initialize();
  }

  async initialize() {
    const nodes = await this._service.initialize(this.divisionType);
    this.dataChange.next(nodes);

    await this._service.recurseByLevel(nodes, this.depth < 0 ? 0 : this.depth);
    this.dataChange.next(nodes);

    this._register(nodes);

    for (let flatNode of this._flatNodeMap.values()) {
      if (flatNode.level < this.depth) {
        this.treeControl.expand(flatNode);
      }
    }
  }

  async loadChildren(node: FlatTreeNode) {
    if (this.treeControl.isExpanded(node)) {
      const nestedNode = this._nestedNodeMap.get(node.id);
      if (nestedNode && !nestedNode.childrenLoaded) {
        let nodes = await this._service.loadChildren(nestedNode);
        console.log('chidren', nodes);
        nestedNode.childrenLoaded = true;
        this._register(nodes);
        nestedNode.childrenChange.next(nodes);
        this.dataChange.next(this.dataChange.value);
        this._checkAllDescendants(node);
      }
    } else {
      // this.treeControl.collapseDescendants(node);
    }
  }
  singleSelectNode(node: FlatTreeNode) {
    console.log(node.level);
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
   *  当前节点的所有后代节点部分被选中，但不能全被选中，则显示 indetermindate状态
   * @param node
   * @returns
   */
  descendantsPartiallySelected(node: FlatTreeNode) {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some((child) =>
      this.selection.isSelected(child)
    );
    return result && !this.descendantAllSelected(node);
  }
  /**
   *
   * @param node
   * @returns
   * @description 当前节点所有后代节点都被选中
   */
  descendantAllSelected(node: FlatTreeNode) {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every((child) => this.selection.isSelected(child));
    return descAllSelected;
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
    this.selection.clear();
    let nodes: NestedTreeNode[] = await this._service.searchNode(condition);

    if (nodes.length) {
      this._nestedNodeMap.clear();
      this._register(nodes);
      this.dataChange.next(nodes);

      if (condition !== '') {
        this.treeControl.expandAll();
      } else {
        this.treeControl.collapseAll();
      }
    }
    return nodes;
  }

  private _register(nodes: NestedTreeNode[]) {
    for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i];
      if (!this._nestedNodeMap.has(node.id)) {
        this._nestedNodeMap.set(node.id, node);

        let children = node.childrenChange.value;
        this._register(children);
      }
    }
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
