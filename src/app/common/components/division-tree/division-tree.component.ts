import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  MatTreeFlattener,
  MatTreeFlatDataSource,
} from '@angular/material/tree';
import { ToastrService } from 'ngx-toastr';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { DivisionManageModel } from 'src/app/view-model/division-manange.model';
import { SearchedTreeModel } from 'src/app/view-model/division-tree.model';
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
      this._nodeIconType.get(
        EnumHelper.ConvertDivisionToUserResource(node.divisionType)
      )
    );
    this._flatNodeMap.set(node.id, newNode);
    return newNode;
  };
  private _getLevel = (node: FlatTreeNode) => node.level;
  private _isExpandable = (node: FlatTreeNode) => node.expandable;
  private _getChildren = (node: NestedTreeNode) => node.childrenChange;
  private _hasChild = (index: number, node: FlatTreeNode) => node.expandable;
  private _treeFlattener: MatTreeFlattener<NestedTreeNode, FlatTreeNode>;
  private _condition: string | Symbol = Symbol.for('DIVISION-TREE');
  // 要屏蔽的搜索字符串
  private _searchGuards: string[] = ['街道', '居委会'];

  /**
   *  屏蔽: 街,街道,道,居,居委,居委会,委,委会,会
   */
  private _excludeGuards: string[] = [];

  private _nodeIconType = new Map([
    [UserResourceType.City, 'howell-icon-earth'],
    [UserResourceType.County, 'howell-icon-map5'],
    [UserResourceType.Committees, 'howell-icon-map5'],
    [UserResourceType.Station, 'howell-icon-garbage'],
  ]);

  private _selectedNodeId: string = '';

  /****** public ********/
  treeControl: FlatTreeControl<FlatTreeNode>;
  dataSource: MatTreeFlatDataSource<NestedTreeNode, FlatTreeNode>;
  trackBy = (index: number, node: FlatTreeNode) => node;

  currentNode: FlatTreeNode | null = null;

  @Output() singleSelectEvent: EventEmitter<string> =
    new EventEmitter<string>();

  constructor(
    private _business: DivisionTreeBusiness,
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

    this.dataSource = new MatTreeFlatDataSource<NestedTreeNode, FlatTreeNode>(
      this.treeControl,
      this._treeFlattener
    );

    this._business.dataChange.subscribe((data) => {
      this.dataSource.data = data;
    });

    this._searchGuards.reduce((previous, current) => {
      previous.push(...this._generateExclude(current));
      return previous;
    }, this._excludeGuards);
    // console.log('_excludeGuards', this._excludeGuards);
  }
  ngOnInit() {
    this._business.initialize();
  }

  clickNode(node: FlatTreeNode) {
    if (this.currentNode == node) {
      this.currentNode = null;
      this._selectedNodeId = '';
    } else {
      this.currentNode = node;
      this._selectedNodeId = node.id;
      console.log(this._business.nodeInfo(this.currentNode?.id));
    }
    this.singleSelectEvent.emit(this._selectedNodeId);
  }

  async loadChildren(node: FlatTreeNode) {
    // 展开的时候拉数据
    if (this.treeControl.isExpanded(node)) {
      await this._business.loadChildren(node.id, node.name);
      // console.log('load children flatNodeMap', this._flatNodeMap);
    }
  }
  async addNode(model: DivisionManageModel) {
    this._business.addNode(this.currentNode, model);
  }
  async deleteNode() {
    if (this.currentNode) {
      this._business.deleteNode(this.currentNode.id);
      this._flatNodeMap.delete(this.currentNode.id);
      this.currentNode = null;
      this._selectedNodeId = '';
      this.singleSelectEvent.emit(this._selectedNodeId);
      console.log('delete flatNodeMap', this._flatNodeMap);
    }
  }
  async editNode(model: DivisionManageModel) {
    if (this.currentNode) {
      this.currentNode.name = model.name;
      this._business.editNode(this.currentNode.id, model);
      console.log('edit flatNodeMap', this._flatNodeMap);
    }
  }
  async searchNode(condition: string) {
    if (condition == '' && this._condition == Symbol.for('DIVISION-TREE')) {
      console.log('输入内容再搜索');
      // return new SearchedTreeModel('warning', '输入内容再搜索');
      return;
    }
    if (this._condition == condition) {
      console.log('重复搜索相同字段');
      return;
    }
    if (this._excludeGuards.includes(condition)) {
      // this._toastrService.info('关键字不能是: ' + condition);
      return new SearchedTreeModel('warning', '关键字不能是: ' + condition);
    }

    this._condition = condition;
    let res = await this._business.searchNode(condition);
    // this._toastrService[res.type](res.msg);

    if (res.data.length > 0) {
      // 替换数据前清空
      this._flatNodeMap.clear();
      this._business.changeData(res.data);
      // 如果是重置树，则维持关闭状态,否则打开全部
      if (res.expand) {
        this.treeControl.expandAll();
      }
    } else {
      console.log('搜索为空，则保持原状');
    }

    // console.log('search--flatNodeMap', this._flatNodeMap);

    return res;
  }
  private _generateExclude(condition: string) {
    let res: string[] = [];
    for (let i = 0; i < condition.length; i++) {
      let len = condition.length - i;
      let temp = '';
      for (let j = 0; j < len; j++) {
        temp += condition[i + j];
        res.push(temp);
      }
    }

    return res;
  }
}
