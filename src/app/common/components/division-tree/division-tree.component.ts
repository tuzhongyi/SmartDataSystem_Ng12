import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import {
  MatTreeFlattener,
  MatTreeFlatDataSource,
} from '@angular/material/tree';
import { DivisionManageBusiness } from 'src/app/aiop-system/components/monitor-platform/division-manage/division-manage.business';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { Division } from 'src/app/network/model/division.model';
import { DivisionManageModel } from 'src/app/view-model/division-manange.model';
import { FlatTreeNode } from 'src/app/view-model/flat-tree-node.model';
import { NestedTreeNode } from 'src/app/view-model/nested-tree-node.model';
import { DivisionTreeBusiness } from './division-tree.business';

@Component({
  selector: 'app-division-tree',
  templateUrl: './division-tree.component.html',
  styleUrls: ['./division-tree.component.less'],
  providers: [DivisionTreeBusiness],
})
export class DivisionTreeComponent {
  /****** private ********/

  // 保存所有 FlatTreeNode
  private _flatNodeMap = new Map<string, FlatTreeNode>();

  private _transformer = (node: NestedTreeNode, level: number) => {
    const existingNode = this._flatNodeMap.get(node.id);

    if (existingNode) {
      existingNode.expandable = node.hasChildren;
      return existingNode;
    }
    const newNode = new FlatTreeNode(
      node.id,
      node.name,
      level,
      node.hasChildren,
      node.parentId
    );
    this._flatNodeMap.set(node.id, newNode);
    return newNode;
  };
  private _getLevel = (node: FlatTreeNode) => node.level;
  private _isExpandable = (node: FlatTreeNode) => node.expandable;
  private _getChildren = (node: NestedTreeNode) => node.childrentChange;
  private _hasChild = (index: number, node: FlatTreeNode) => node.expandable;

  private _treeFlattener: MatTreeFlattener<NestedTreeNode, FlatTreeNode>;

  /****** public ********/
  treeControl: FlatTreeControl<FlatTreeNode>;
  dataSource: MatTreeFlatDataSource<NestedTreeNode, FlatTreeNode>;
  trackBy = (index: number, node: FlatTreeNode) => node;

  currentNode: FlatTreeNode | null = null;

  constructor(private _business: DivisionTreeBusiness) {
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

    this._business.dataChange.subscribe((data) => {
      this.dataSource.data = data;
    });
    this._business.dataShow.subscribe((data) => {
      data.forEach((id) => {
        let node = this._flatNodeMap.get(id);
        if (node) {
          this.treeControl.expand(node);
        }
      });
    });
  }
  ngOnInit() {
    this._business.initialize();
  }

  clickNode(node: FlatTreeNode) {
    if (this.currentNode == node) {
      this.currentNode = null;
    } else {
      this.currentNode = node;
    }
  }

  async loadChildren(node: FlatTreeNode) {
    // 展开的时候拉数据
    if (this.treeControl.isExpanded(node)) {
      await this._business.loadChildren(node.id, node.name);
      console.log('flatNodeMap', this._flatNodeMap);
    }
  }
  addNode(model: DivisionManageModel) {
    this._business.addNode(this.currentNode, model);
    console.log('flatNodeMap', this._flatNodeMap);
  }
  deleteNode() {
    this._business.deleteNode(this.currentNode);
    if (this.currentNode) {
      this._flatNodeMap.delete(this.currentNode.id);
    }
    console.log('flatNodeMap', this._flatNodeMap);
  }
  editNode(model: DivisionManageModel) {
    this._business.editNode(this.currentNode, model);
    console.log('flatNodeMap', this._flatNodeMap);
  }
  async searchNode(condition: string) {
    // this.treeControl.collapseAll(); this._flatNodeMap.clear();

    console.log(condition);
    if (condition == '') {
      this._flatNodeMap.clear();
      this._business.searchNode(condition);
    }
    // this.currentNode = null;
    // let res = await this._business.searchNode(condition);
    // console.log(this._flatNodeMap);
    // res.forEach((id) => {
    //   let node = this._flatNodeMap.get(id);
    //   if (node) {
    //     this.treeControl.expand(node);
    //   }
    // });
  }
}

// 路一
