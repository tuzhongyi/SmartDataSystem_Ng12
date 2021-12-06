import { Injectable } from '@angular/core';
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
import { NestedTreeNode } from 'src/app/view-model/nested-tree-node.model';
import { ServiceInterface } from '../interface/service.interface';

@Injectable()
export class DivisionTreeService implements ServiceInterface {

  constructor(
    private _divisionRequest: DivisionRequestService,
    private _stationRequest: GarbageStationRequestService,
  ) { }

  getName() {
    return TreeServiceEnum.Division;
  }

  async initialize() {
    let data = await this._loadData(UserResourceType.City);
    return data;
  }

  async loadChildren(node: NestedTreeNode) {
    if (node && !node.childrenLoaded) {
      const type = EnumHelper.GetResourceChildType(node.type);
      let data = await this._loadData(type, node.id);
      return data;
    }
    return [];
  }

  async searchNode(condition: string) {
    let data: Division[] | DivisionNode[];
    if (condition == '') {
      data = await this._loadData(UserResourceType.City);
    } else {
      data = await this._searchData(condition);
    }

    return data;
  }

  private async _loadData(type: UserResourceType, parentId?: string) {
    if (type == UserResourceType.None) {
      return [];
    } else if (type == UserResourceType.Station) {
    } else {
      let params = new GetDivisionsParams();
      const divisionType = EnumHelper.ConvertUserResourceToDivision(type);
      params.DivisionType = divisionType;
      if (parentId) params.ParentId = parentId;
      let res = await this._divisionRequest.list(params);

      return res.Data;
    }
    return [];
  }

  private async _searchData(condition: string) {
    let params = new GetDivisionTreeParams();
    params.Name = condition;
    let res: DivisionTree = await this._divisionRequest.tree(params);
    return res.Nodes;
  }


  public async loadStation(id: string) {
    let params = new GetGarbageStationsParams();
    params.DivisionId = id;

    let res = await this._stationRequest.list(params);
    console.log(res);
  }

}
