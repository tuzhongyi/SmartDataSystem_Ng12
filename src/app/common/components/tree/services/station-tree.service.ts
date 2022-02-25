import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TreeConverter } from 'src/app/converter/tree.converter';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { TreeServiceEnum } from 'src/app/enum/tree-service.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { FlatTreeNode } from 'src/app/view-model/flat-tree-node.model';
import { NestedTreeNode } from 'src/app/view-model/nested-tree-node.model';
import { TreeServiceInterface } from '../interface/tree-service.interface';
import { DivisionTreeService } from './division-tree.service';

@Injectable()
export class StationTreeService implements TreeServiceInterface {
  constructor(
    private _divisionTreeService: DivisionTreeService,
    private _stationRequest: GarbageStationRequestService,
    private _converter: TreeConverter
  ) {}
  getName() {
    return TreeServiceEnum.Station;
  }
  async initialize(type: DivisionType = DivisionType.City, level = 0) {
    let res = await this._divisionTreeService.initialize(type, level);
    return res;
  }
  async loadChildren(node: NestedTreeNode) {
    if (node.type == UserResourceType.Committees) {
      // 拉取居委会厢房信息

      let data = await this._loadData(node.id);
      let nodes = this._converter.iterateToNested(data);

      return nodes;
    } else {
      let nodes = await this._divisionTreeService.loadChildren(node);
      nodes.forEach((item) => {
        const divisionType = EnumHelper.ConvertUserResourceToDivision(
          item.type
        );

        divisionType == DivisionType.Committees
          ? (item.hasChildren = true)
          : '';
      });
      return nodes;
    }
  }
  async searchNode(condition: string) {
    let res: NestedTreeNode[] = [];

    let divisionNodes = await this._divisionTreeService.searchNode(condition);
    console.log('区划结果', divisionNodes);

    let stationNodes: NestedTreeNode[] = [];

    if (condition != '') {
      let data = await this._searchData(condition);
      console.log('厢房搜索结果', data);

      // 所有祖先区划
      let allDivisions: Division[] = [];
      let allStations: GarbageStation[] = [];

      for (let i = 0; i < data.length; i++) {
        let station = data[i];
        if (station.DivisionId) {
          allStations.push(station);
          let division = await this._divisionTreeService.getDivision(
            station.DivisionId
          );
          allDivisions.push(division);
          let ancestors = await this._divisionTreeService.getAncestorDivision(
            division
          );
          allDivisions.push(...ancestors);
        }
      }
      // Division 去重
      let divisions: Division[] = [];
      allDivisions.reduce(function (prev, cur) {
        if (!prev.find((item) => item.Id == cur.Id)) {
          prev.push(cur);
        }
        return prev;
      }, divisions);

      console.log('厢房所在区划', divisions);

      // 合并 Division 和 Station
      let result = [...divisions, ...allStations];

      stationNodes = this._converter.buildNestedTree(result);

      console.log(stationNodes);

      // 将 stationNodes 和  divisionNodes 合并

      let merged = this._converter.mergeNestedTree(divisionNodes, stationNodes);
      console.log(merged);

      res = merged;
    } else {
      res = divisionNodes;
    }

    return res;
  }

  private async _loadData(id: string) {
    let params = new GetGarbageStationsParams();
    params.DivisionId = id;
    let res = await this._stationRequest.cache.list(params);
    return res.Data;
  }
  private async _searchData(condition: string) {
    let params = new GetGarbageStationsParams();
    params.Name = condition;
    let res = await this._stationRequest.cache.list(params);

    return res.Data;
  }
  // 测试拉取所有数据后生成树结构
  private async _loadAll() {
    let data = await this._divisionTreeService.loadAllData();
    const res = this._converter.buildNestedTree(data);
    console.log('所有节点', res);
    return res;
  }
}
