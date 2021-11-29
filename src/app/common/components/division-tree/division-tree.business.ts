import { Injectable } from '@angular/core';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { mode } from 'crypto-js';
import { ToastrService } from 'ngx-toastr';
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
import { SearchedTreeModel } from 'src/app/view-model/division-tree.model';
import { FlatTreeNode } from 'src/app/view-model/flat-tree-node.model';
import { NestedTreeNode } from 'src/app/view-model/nested-tree-node.model';

@Injectable()
export class DivisionTreeBusiness
  implements DivisionTreeConverter<NestedTreeNode>
{
  private _nestedNodeMap = new Map<string, NestedTreeNode>();

  dataChange = new BehaviorSubject<NestedTreeNode[]>([]);

  constructor(private _divisionRequest: DivisionRequestService) {}

  // 拉取最顶层区划
  async initialize() {
    let data = await this.loadData();
    let res = this.toNestedTree(data);
    this.dataChange.next(res);
  }
  async loadChildren(id: string, name: string) {
    // console.log('load children', this._nestedNodeMap);
    const node = this._nestedNodeMap.get(id);
    // console.log('父节点', node);
    if (node) {
      console.log(name + ' load children');

      const type = EnumHelper.GetDivisionChildType(node.divisionType);
      let data = await this.loadData(type, node.id);

      let res = this.toNestedTree(data);

      // 拉取服务器节点数据，重置节点的子树
      node.childrenChange.next(res);
      this.dataChange.next(this.dataChange.value);
      // console.log('ppp', this._nestedNodeMap);
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
        parentNode.hasChildren = true;
        parentNode.childrenChange.value.push(newNode);
      }
    } else {
      this.dataChange.value.push(newNode);
    }
    this.dataChange.next(this.dataChange.value);
  }
  deleteNode(id: string) {
    if (id) {
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
      console.log('delte nestedNodeMap ', this._nestedNodeMap);
    }
  }

  async editNode(id: string, model: DivisionManageModel) {
    let currentNode = this._nestedNodeMap.get(id);
    if (currentNode) {
      currentNode.name = model.name;
      currentNode.description = model.description;
    }
    console.log('edit nestedNodeMap ', this._nestedNodeMap);
    this.dataChange.next(this.dataChange.value);
    return false;
  }
  async searchNode(condition: string) {
    if (condition == '') {
      let data = await this.loadData();
      let res = new SearchedTreeModel('success', '操作成功', data);
      return res;
    } else {
      let data: DivisionNode[] = await this.searchData(condition);
      if (data.length == 0) {
        let res = new SearchedTreeModel('info', '无匹配结果', data);
        return res;
      } else {
        let res = new SearchedTreeModel('success', '操作成功', data);
        res.expand = true;
        return res;
      }
    }
  }
  async changeData(data: Division[] | DivisionNode[]) {
    // console.log('change data');
    if (data.length > 0) {
      this._nestedNodeMap.clear();
      if (this._isDivision(data)) {
        // console.log(data);
        let nodes = this.toNestedTree(data);
        this.dataChange.next(nodes);
      } else {
        let nodes = this.iterateTree(data);
        this.dataChange.next(nodes);
      }
      // console.log('search  nestedNodeMap ', this._nestedNodeMap);
    }
  }

  iterateTree(data: DivisionNode[], parentId: string | null = null) {
    // console.log(data);
    let res: NestedTreeNode[] = [];
    for (let i = 0; i < data.length; i++) {
      let divisionNode = data[i];
      const node = this._generateFromDivisionNode(divisionNode);
      node.parentId = parentId;
      res.push(node);
      if (divisionNode.Nodes && divisionNode.Nodes.length > 0) {
        let children = this.iterateTree(divisionNode.Nodes, node.id);
        node.childrenChange.value.push(...children);
        node.hasChildren = true;
      }
    }

    return res;
  }
  async loadData(type: DivisionType = DivisionType.City, id?: string) {
    let params = new GetDivisionsParams();
    params.DivisionType = type;
    if (id) params.ParentId = id;
    let res = await this._divisionRequest.list(params);
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
      } else {
      }
    }
    return res;
  }

  nodeInfo(id: string) {
    if (id) return this._nestedNodeMap.get(id);
    return false;
  }
  private _generateFromDivision(division: Division) {
    if (this._nestedNodeMap.has(division.Id)) {
      let node = this._nestedNodeMap.get(division.Id)!;

      node.name = division.Name;
      node.description = division.Description ?? '';

      return node;
    }
    const node = new NestedTreeNode(
      division.Id,
      division.Name,
      division.Description,
      division.DivisionType,
      !division.IsLeaf,
      division.ParentId
    );
    node.rawData = division;
    this._nestedNodeMap.set(node.id, node);

    return node;
  }
  private _generateFromDivisionNode(
    item: DivisionNode,
    parentId: string | null = null
  ) {
    if (this._nestedNodeMap.has(item.Id)) {
      let node = this._nestedNodeMap.get(item.Id)!;

      node.name = item.Name;
      node.description = item.Description ?? '';
      return node;
    }
    const node = new NestedTreeNode(
      item.Id,
      item.Name,
      item.Description,
      item.DivisionType,
      item.Nodes.length > 0,
      parentId
    );
    node.rawData = item;
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
  // type predicates
  private _isDivision(data: Division[] | DivisionNode[]): data is Division[] {
    if (data[0] instanceof Division) {
      return true;
    }
    return false;
  }
}
