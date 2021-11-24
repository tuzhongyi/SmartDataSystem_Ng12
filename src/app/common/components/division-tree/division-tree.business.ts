import { Injectable } from '@angular/core';
import { mode } from 'crypto-js';
import { BehaviorSubject } from 'rxjs';
import { DivisionTreeConverter } from 'src/app/converter/division-tree.converter';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { EnumHelper } from 'src/app/enum/enum-helper';
import {
  DivisionNode,
  DivisionTree,
} from 'src/app/network/model/division-tree.model';
import { Division } from 'src/app/network/model/division.model';
import {
  GetDivisionsParams,
  GetDivisionTreeParams,
} from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { DivisionManageModel } from 'src/app/view-model/division-manange.model';
import { FlatTreeNode } from 'src/app/view-model/flat-tree-node.model';
import { NestedTreeNode } from 'src/app/view-model/nested-tree-node.model';

@Injectable()
export class DivisionTreeBusiness
  implements DivisionTreeConverter<NestedTreeNode>
{
  private _dataToShow: string[] = [];
  private _divisions: Division[] = [];
  private _nestedNodeMap = new Map<string, NestedTreeNode>();

  dataChange = new BehaviorSubject<NestedTreeNode[]>([]);
  dataShow = new BehaviorSubject<string[]>([]);

  constructor(private _divisionRequest: DivisionRequestService) {}

  // 拉取最顶层区划
  async initialize() {
    let data = await this.loadData();
    let res = this.toNestedTree(data);
    this.dataChange.next(res);
  }
  async loadChildren(id: string, name: string) {
    const node = this._nestedNodeMap.get(id);
    // console.log('父节点', node);
    if (node && !node.childrenLoaded) {
      console.log(name + ' load children');

      const type = EnumHelper.GetDivisionChildType(node.divisionType);
      let data = await this.loadData(type, node.id);

      let res = this.toNestedTree(data);
      node.childrentChange.value.push(...res);
      node.childrenLoaded = true;
      this.dataChange.next(this.dataChange.value);
    }
  }
  addNode(node: FlatTreeNode | null = null, model: DivisionManageModel) {
    let newNode = this._generateFromDivisionManageModel(model);
    if (node) {
      // 当前节点是新节点的父节点
      let parentNode = this._nestedNodeMap.get(node.id);
      if (parentNode) {
        newNode.divisionType = EnumHelper.GetDivisionChildType(
          parentNode.divisionType
        );
        newNode.parentId = parentNode.id;

        parentNode.childrentChange.value.push(newNode);
        parentNode.hasChildren = true;
        // parentNode.childrenLoaded = true;
      }
    } else {
      this.dataChange.value.push(newNode);
    }
    this.dataChange.next(this.dataChange.value);
  }
  deleteNode(node: FlatTreeNode | null = null) {
    if (node) {
      // 当前要删除的节点
      let currentNode = this._nestedNodeMap.get(node.id);
      if (currentNode) {
        // 该节点有没有父节点
        if (currentNode.parentId) {
          let parentNode = this._nestedNodeMap.get(currentNode.parentId)!;
          let index = parentNode.childrentChange.value.indexOf(currentNode);
          if (index != -1) {
            parentNode.childrentChange.value.splice(index, 1);
          }
        } else {
          let index = this.dataChange.value.indexOf(currentNode);
          if (index != -1) {
            this.dataChange.value.splice(index, 1);
          }
        }
        this._nestedNodeMap.delete(currentNode.id);
      }
    }
    console.log('nestedNodeMap ', this._nestedNodeMap);
    this.dataChange.next(this.dataChange.value);
  }

  editNode(node: FlatTreeNode | null = null, model: DivisionManageModel) {
    if (node) {
      node.name = model.name;
      // 当前修改的节点
      let currentNode = this._nestedNodeMap.get(node.id);
      if (currentNode) {
        currentNode.name = model.name;
        currentNode.description = model.description;
      }
    }
    console.log('nestedNodeMap ', this._nestedNodeMap);
    this.dataChange.next(this.dataChange.value);
  }
  async searchNode(condition: string) {
    let data: DivisionNode[] = await this.searchData(condition);
    console.log(data);

    await this.iterateTree(data);

    return this._dataToShow;
  }

  async iterateTree(data: DivisionNode[]) {
    for (let i = 0; i < data.length; i++) {
      let divisionNode = data[i];
      console.log('push');
      await this.loadChildren(divisionNode.Id, divisionNode.Name);

      this._dataToShow.push(divisionNode.Id);
      this.dataShow.value.push(divisionNode.Id);
      this.dataShow.next(this.dataShow.value);
      if (divisionNode.Nodes) {
        this.iterateTree(divisionNode.Nodes);
      }
    }
  }
  async loadData(type: DivisionType = DivisionType.City, id?: string) {
    let params = new GetDivisionsParams();
    params.DivisionType = type;
    if (id) params.ParentId = id;
    let res = await this._divisionRequest.list(params);
    this._divisions.push(...res.Data);
    return res.Data;
  }
  async searchData(condition: string) {
    let params = new GetDivisionTreeParams();
    params.Name = condition;
    let res: DivisionTree = await this._divisionRequest.tree(params);
    return res.Nodes;
  }

  toNestedTree<T>(data: T[]): NestedTreeNode[] {
    let res: NestedTreeNode[] = new Array<NestedTreeNode>();

    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      if (item instanceof Division) {
        const node = this._generateFromDivision(item);
        res.push(node);
      }
    }
    return res;
  }
  private _generateFromDivision(division: Division) {
    if (this._nestedNodeMap.has(division.Id)) {
      return this._nestedNodeMap.get(division.Id)!;
    }
    const node = new NestedTreeNode(
      division.Id,
      division.Name,
      division.Description,
      division.DivisionType,
      !division.IsLeaf,
      division.ParentId
    );

    this._nestedNodeMap.set(node.id, node);

    return node;
  }
  private _generateFromDivisionNode(
    item: DivisionNode,
    parentId: string | null = null
  ) {
    if (this._nestedNodeMap.has(item.Id)) {
      return this._nestedNodeMap.get(item.Id)!;
    }

    const node = new NestedTreeNode(
      item.Id,
      item.Name,
      item.Description,
      item.DivisionType,
      item.Nodes.length > 0,
      parentId
    );

    this._nestedNodeMap.set(node.id, node);

    return node;
  }
  private _generateFromDivisionManageModel(model: DivisionManageModel) {
    if (this._nestedNodeMap.has(model.id)) {
      return this._nestedNodeMap.get(model.id)!;
    }
    const node = new NestedTreeNode(model.id, model.name, model.description);
    this._nestedNodeMap.set(node.id, node);

    return node;
  }
}
