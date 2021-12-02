import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TreeConverter } from 'src/app/converter/tree.converter';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { TreeServiceEnum } from 'src/app/enum/tree-service.enum';
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
import { NestedTreeNode } from 'src/app/view-model/nested-tree-node.model';
import { ServiceInterface } from '../interface/service.interface';

@Injectable()
export class DivisionTreeService implements ServiceInterface {
  private _nestedNodeMap = new Map<string, NestedTreeNode>();

  // dataChange保存的是根节点信息,子节点在 childrenChange 属性中
  dataChange = new BehaviorSubject<NestedTreeNode[]>([]);

  constructor(
    private _divisionRequest: DivisionRequestService,
    private _converter: TreeConverter
  ) {}

  getName() {
    return TreeServiceEnum.Division;
  }

  // 拉取最顶层区划
  async initialize() {
    let data = await this._loadData();
    let res = this._toNestedTree(data);
    this.dataChange.next(res);
  }

  async loadChildren(id: string, name: string) {
    // console.log('load children', this._nestedNodeMap);
    const node = this._nestedNodeMap.get(id);
    // console.log('父节点', node);
    if (node) {
      console.log(name + ' load children');

      const type = EnumHelper.GetDivisionChildType(node.divisionType);
      let data = await this._loadData(type, node.id);
      if (data.length) {
        let res = this._toNestedTree(data);
        // 拉取服务器节点数据，重置节点的子树
        node.childrenChange.next(res);
      } else {
        node.hasChildren = false;
      }
      this.dataChange.next(this.dataChange.value);
    }
  }
  addNode(node: NestedTreeNode) {
    if (node.parentId) {
      let parentNode = this._nestedNodeMap.get(node.parentId);
      if (parentNode) {
        node.divisionType = EnumHelper.GetDivisionChildType(
          parentNode.divisionType
        );
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
  editNode(node: NestedTreeNode) {
    let currentNode = this._nestedNodeMap.get(node.id);
    if (currentNode) {
      currentNode.name = node.name;
      currentNode.description = node.description;
    }
    this.dataChange.next(this.dataChange.value);
  }

  async searchNode(condition: string) {
    let data: Division[] | DivisionNode[];
    let nodes: NestedTreeNode[] = [];

    if (condition == '') {
      data = await this._loadData();
    } else {
      data = await this._searchData(condition);
    }
    if (data.length) {
      this._nestedNodeMap.clear();
      if (this._isDivision(data)) {
        nodes.push(...this._toNestedTree(data));
      } else {
        nodes.push(...this._iterateTree(data));
      }
      this.dataChange.next(nodes);
    }
    return nodes;
  }

  private async _loadData(type: DivisionType = DivisionType.City, id?: string) {
    let params = new GetDivisionsParams();
    params.DivisionType = type;
    if (id) params.ParentId = id;
    let res = await this._divisionRequest.list(params);
    return res.Data;
  }

  private _toNestedTree<T>(data: T[]): NestedTreeNode[] {
    let res: NestedTreeNode[] = new Array<NestedTreeNode>();

    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      if (item instanceof Division) {
        const node = this._converter.fromDivision(item);
        this._nestedNodeMap.set(node.id, node);
        res.push(node);
      } else {
      }
    }
    return res;
  }
  private _iterateTree(data: DivisionNode[], parentId: string | null = null) {
    let res: NestedTreeNode[] = [];
    for (let i = 0; i < data.length; i++) {
      let divisionNode = data[i];
      const node = this._converter.fromDivisionNode(divisionNode);
      node.parentId = parentId;
      this._nestedNodeMap.set(node.id, node);
      res.push(node);
      if (divisionNode.Nodes && divisionNode.Nodes.length > 0) {
        let children = this._iterateTree(divisionNode.Nodes, node.id);
        node.childrenChange.value.push(...children);
        node.hasChildren = true;
      }
    }

    return res;
  }
  private async _searchData(condition: string) {
    let params = new GetDivisionTreeParams();
    params.Name = condition;
    let res: DivisionTree = await this._divisionRequest.tree(params);
    return res.Nodes;
  }
  private _isDivision(data: Division[] | DivisionNode[]): data is Division[] {
    if (data[0] instanceof Division) {
      return true;
    }
    return false;
  }
}
