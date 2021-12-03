import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { TreeSelectEnum } from 'src/app/enum/tree-select.enum';
import { TreeServiceEnum } from 'src/app/enum/tree-service.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { FlatTreeNode } from 'src/app/view-model/flat-tree-node.model';
import { NestedTreeNode } from 'src/app/view-model/nested-tree-node.model';
import { ServiceInterface } from './interface/service.interface';
import { DivisionTreeService } from './services/division-tree.service';
import { ServiceFactory } from './services/service.factory';
import { StationTreeService } from './services/station-tree.service';
import { ServiceToken } from './tokens/service.token';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.less'],
  providers: [
    ServiceFactory,
    {
      provide: ServiceToken,
      useClass: DivisionTreeService,
      multi: true,
    },
    {
      provide: ServiceToken,
      useClass: StationTreeService,
      multi: true,
    },
    {
      provide: DivisionTreeService,
      useClass: DivisionTreeService,
    },
  ],
})
export class TreeComponent implements OnInit {
  /***************private  *********************/
  private _service!: ServiceInterface;

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
      node.type
    );
    this._flatNodeMap.set(node.id, newNode);
    return newNode;
  };
  private _getLevel = (node: FlatTreeNode) => node.level;
  private _isExpandable = (node: FlatTreeNode) => node.expandable;
  private _getChildren = (node: NestedTreeNode) => node.childrenChange;
  private _hasChild = (index: number, node: FlatTreeNode) => node.expandable;
  private _treeFlattener: MatTreeFlattener<NestedTreeNode, FlatTreeNode>;

  /****** public ********/
  treeControl: FlatTreeControl<FlatTreeNode>;
  dataSource: MatTreeFlatDataSource<NestedTreeNode, FlatTreeNode>;
  trackBy = (index: number, node: FlatTreeNode) => node;

  @Input('treeServiceProvider')
  serviceProvider = TreeServiceEnum.Division;

  @Input('treeSelectModel')
  selectModel = TreeSelectEnum.Single;

  @Output() selectTree: EventEmitter<any> = new EventEmitter<any>();

  // 维持点击状态
  selection!: SelectionModel<FlatTreeNode>;

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
  }
  ngOnInit() {
    if (this.selectModel == TreeSelectEnum.Single) {
      this.selection = new SelectionModel<FlatTreeNode>();
    } else {
      this.selection = new SelectionModel<FlatTreeNode>(true);
    }
    this.selection.changed.subscribe((change) => {
      this.selectTree.emit(change.added);
    });
    this._service = this._serviceFactory.createService(this.serviceProvider);
    this._service.dataChange.subscribe((data) => {
      this.dataSource.data = data;
    });
    this._service.initialize();
  }
  toggleNode(node: FlatTreeNode) {
    this.selection.toggle(node);
  }
  loadChildren(node: FlatTreeNode) {
    if (this.treeControl.isExpanded(node)) {
      this._service.loadChildren(node);
    }
  }
  addNode(node: NestedTreeNode) {
    this._service.addNode(node);
  }
  deleteNode(id: string) {
    this._service.deleteNode(id);
    const node = this._flatNodeMap.get(id);
    if (node) {
      this.selection.deselect(node);
      this._flatNodeMap.delete(id);
    }
  }
  editNode(node: NestedTreeNode) {
    this._service.editNode(node);
  }
  async searchNode(condition: string) {
    let res = await this._service.searchNode(condition);
    if (res.length) {
      if (condition !== '') {
        this.treeControl.expandAll();
      } else {
        this.treeControl.collapseAll();
      }
    }
    return res;
  }
}
