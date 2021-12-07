import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { TreeConverter } from 'src/app/converter/tree.converter';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { TreeSelectEnum } from 'src/app/enum/tree-select.enum';
import { TreeServiceEnum } from 'src/app/enum/tree-service.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { DivisionNode } from 'src/app/network/model/division-tree.model';
import { Division } from 'src/app/network/model/division.model';
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
  private dataChange = new BehaviorSubject<NestedTreeNode[]>([]);
  private _nestedNodeMap = new Map<string, NestedTreeNode>();


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

  constructor(private _serviceFactory: ServiceFactory,) {
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

    this.dataChange.subscribe(data => this.dataSource.data = data)

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


    this.initialize()
  }

  async initialize() {
    const nodes = await this._service.initialize();
    let res = this._register(nodes) ?? []
    this.dataChange.next(res)


  }

  async loadChildren(node: FlatTreeNode) {
    if (this.treeControl.isExpanded(node)) {
      const nestedNode = this._nestedNodeMap.get(node.id);
      if (nestedNode && !nestedNode.childrenLoaded) {
        let nodes = await this._service.loadChildren(nestedNode);
        nestedNode.childrenLoaded = true;
        let res = this._register(nodes)
        nestedNode.childrenChange.next(res)
        this.dataChange.next(this.dataChange.value)
      }

    }
  }
  toggleNode(node: FlatTreeNode) {
    this.selection.toggle(node);
  }

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
      let res = this._register(nodes);
      this.dataChange.next(res);

      if (condition !== '') {
        this.treeControl.expandAll();
      } else {
        this.treeControl.collapseAll();
      }
    }
    return nodes;
  }

  private _register(nodes: NestedTreeNode[]) {
    return nodes.map(node => {
      if (this._nestedNodeMap.has(node.id)) {
        return this._nestedNodeMap.get(node.id)!
      } else {
        this._nestedNodeMap.set(node.id, node)
        return node;
      }
    })
  }

}
