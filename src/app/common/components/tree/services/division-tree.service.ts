import { Injectable } from '@angular/core';
import { param } from 'jquery';
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
import { NestedTreeNode } from 'src/app/view-model/nested-tree-node.model';
import { TreeServiceInterface } from '../interface/tree-service.interface';

@Injectable()
export class DivisionTreeService {
  constructor(
    private _divisionRequest: DivisionRequestService,
    private _converter: TreeConverter
  ) { }

  getName() {
    return TreeServiceEnum.Division;
  }

  async initialize(type: DivisionType = DivisionType.City) {
    let data = await this._loadData(type);
    let nodes = this._converter.iterateToNested(data);
    nodes.forEach((item) => {
      const divisionType = EnumHelper.ConvertUserResourceToDivision(item.type);

      divisionType == DivisionType.Committees ? (item.hasChildren = true) : '';
    });

    return nodes;
  }

  async recurseByLevel(nodes: NestedTreeNode[], level: number) {
    console.log('_recurseByLevel');
    if (level == 0) return;
    for (let j = 0; j < nodes.length; j++) {
      let node = nodes[j];
      if (node.hasChildren) {
        let children = await this.loadChildren(node);
        node.childrenChange.next(children);
        node.childrenLoaded = true;
        await this.recurseByLevel(children, level - 1);
      }
    }
  }
  async loadChildren(node: NestedTreeNode) {
    if (node && !node.childrenLoaded) {
      const divisionType = EnumHelper.ConvertUserResourceToDivision(node.type);
      const childType = EnumHelper.GetDivisionChildType(divisionType);
      let data = await this._loadData(childType, node.id);

      const nodes = this._converter.iterateToNested(data);
      return nodes;
    }

    return [];
  }

  async searchNode(condition: string) {
    let data: Division[] | DivisionNode[];
    let nodes: NestedTreeNode[] = [];

    if (condition == '') {
      nodes = await this.initialize();
    } else {
      data = await this._searchData(condition);
      nodes = this._converter.recurseToNested(data);
    }

    return nodes;
  }

  private async _loadData(
    type?: DivisionType,
    parentId?: string,
    ids?: string[]
  ) {
    let params = new GetDivisionsParams();
    if (ids) params.Ids = ids;
    // params.Ids = ['310316000000'];
    if (type) params.DivisionType = type;
    if (parentId) params.ParentId = parentId;
    let res = await this._divisionRequest.cache.list(params);

    return res.Data;
  }

  private async _searchData(condition: string) {
    let params = new GetDivisionTreeParams();
    params.Name = condition;
    let res: DivisionTree = await this._divisionRequest.tree(params);
    return res.Nodes;
  }

  // 给 StationTree用的
  async getDivision(id: string) {
    return await this._divisionRequest.cache.get(id);
  }
  async getAncestorDivision(division: Division) {
    let res: Division[] = [];

    while (division.ParentId) {
      let d = await this.getDivision(division.ParentId);
      res.push(d);
      division = d;
    }

    return res;
  }

  // 拉取所有数据，测试用
  async loadAllData(type?: DivisionType, parentId?: string) {
    let params = new GetDivisionsParams();
    if (type) params.DivisionType = type;
    if (parentId) params.ParentId = parentId;
    let res = await this._divisionRequest.cache.list(params);

    return res.Data;
  }
}
