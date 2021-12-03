import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TreeConverter } from 'src/app/converter/tree.converter';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { TreeServiceEnum } from 'src/app/enum/tree-service.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
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
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { FlatTreeNode } from 'src/app/view-model/flat-tree-node.model';
import { NestedTreeNode } from 'src/app/view-model/nested-tree-node.model';
import { ServiceInterface } from '../interface/service.interface';

@Injectable()
export class DivisionTreeService implements ServiceInterface {
  private _nestedNodeMap = new Map<string, NestedTreeNode>();

  // dataChange保存的是根节点信息,子节点在 childrenChange 属性中
  dataChange = new BehaviorSubject<NestedTreeNode[]>([]);

  constructor(
    private _divisionRequest: DivisionRequestService,
    private _stationRequest: GarbageStationRequestService,
    private _converter: TreeConverter
  ) {}

  getName() {
    return TreeServiceEnum.Division;
  }

  // 拉取最顶层区划
  async initialize() {
    let data = await this._loadData(UserResourceType.City);
    let res = this._toNestedTree(data);
    this.dataChange.next(res);

    return res;
  }

  async loadChildren(flatNode: FlatTreeNode) {
    const node = this._nestedNodeMap.get(flatNode.id);
    if (node && !node.childrenLoaded) {
      const type = EnumHelper.GetResourceChildType(node.type);
      let data = await this._loadData(type, node.id);
      if (data.length) {
        let res = this._toNestedTree(data);
        // 拉取服务器节点数据，重置节点的子树
        node.childrenChange.next(res);
      } else {
        node.hasChildren = false;
      }
      node.childrenLoaded = true;
      this.dataChange.next(this.dataChange.value);

    }
    return null;
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
      data = await this._loadData(UserResourceType.City);
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

  private async _loadData(type: UserResourceType, id?: string) {
    if (type == UserResourceType.None) {
      return [];
    } else if (type == UserResourceType.Station) {
    } else {
      let params = new GetDivisionsParams();
      const divisionType = EnumHelper.ConvertUserResourceToDivision(type);
      params.DivisionType = divisionType;
      if (id) params.ParentId = id;
      let res = await this._divisionRequest.list(params);
      return res.Data;
    }
    return [];
  }

  private _toNestedTree<T>(data: T[]): NestedTreeNode[] {
    let res: NestedTreeNode[] = new Array<NestedTreeNode>();

    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      if (item instanceof Division) {
        const node = this._nestedNodeMap.has(item.Id)
          ? this._nestedNodeMap.get(item.Id)!
          : this._converter.fromDivision(item);
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
      const node = this._nestedNodeMap.has(divisionNode.Id)
        ? this._nestedNodeMap.get(divisionNode.Id)!
        : this._converter.fromDivisionNode(divisionNode);
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

  public async loadStation(id: string) {
    let params = new GetGarbageStationsParams();
    params.DivisionId = id;

    let res = await this._stationRequest.list(params);
    console.log(res);
  }
}
