import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TreeConverter } from 'src/app/converter/tree.converter';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { TreeServiceEnum } from 'src/app/enum/tree-service.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { FlatTreeNode } from 'src/app/view-model/flat-tree-node.model';
import { NestedTreeNode } from 'src/app/view-model/nested-tree-node.model';
import { TreeServiceInterface } from '../interface/tree-service.interface';
import { DivisionTreeService } from './division-tree.service';

@Injectable()
export class TreeService {
  private _nestedNodeMap = new Map<string, NestedTreeNode>();
  private _model = TreeServiceEnum.Station;

  public set model(val: TreeServiceEnum) {
    this._model = val;
  }
  get model() {
    return this._model;
  }

  constructor(
    private _divisionTreeService: DivisionTreeService,
    private _divisionRequest: DivisionRequestService,
    private _stationRequest: GarbageStationRequestService,
    private _converter: TreeConverter
  ) {
    console.log('tree service');
  }

  async initialize(
    type: UserResourceType = UserResourceType.City,
    depth: number = 0,
    ...res: any[]
  ) {
    if (depth < 0) return [];
    let data = await this._loadData(type, ...res);
    let nodes = this._converter.iterateToNested(data);
    if (
      type == UserResourceType.Committees &&
      this.model == TreeServiceEnum.Station
    ) {
      nodes.forEach((node) => (node.hasChildren = true));
    }

    this._register(nodes);

    try {
      let children = await this.initialize(
        EnumHelper.GetResourceChildType(type),
        depth - 1
      );

      children.forEach((child) => {
        let parentId = child.parentId;
        if (parentId) {
          let parentNode = this._nestedNodeMap.get(parentId);
          if (parentNode) {
            parentNode.childrenLoaded = true;
            parentNode.childrenChange.value.push(child);
          }
        }
      });
    } catch (e) {}

    console.log(this._nestedNodeMap);

    return nodes;
  }

  private _register(nodes: NestedTreeNode[]) {
    for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i];
      if (!this._nestedNodeMap.has(node.id)) {
        this._nestedNodeMap.set(node.id, node);
      }
    }
  }

  async loadChildren(node: NestedTreeNode) {
    let children: NestedTreeNode[] = [];

    let data = await this._loadData(
      EnumHelper.GetResourceChildType(node.type),
      node.id
    );
    children = this._converter.iterateToNested(data);
    if (
      node.type == UserResourceType.County &&
      this.model == TreeServiceEnum.Station
    ) {
      children.forEach((node) => (node.hasChildren = true));
    }

    console.log(children);
    return children;
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

  private async _loadData(type: UserResourceType, ...res: any[]) {
    switch (type) {
      case UserResourceType.City:
      case UserResourceType.County:
      case UserResourceType.Committees:
        return this._loadDivision(type, ...res);
        break;
      case UserResourceType.Station:
        return this._loadStation(...res);
      default:
        throw new TypeError('类型错误');
    }
  }
  private async _loadDivision(type: UserResourceType, parentId?: string) {
    let divisionType = EnumHelper.ConvertUserResourceToDivision(type);
    let params = new GetDivisionsParams();
    params.DivisionType = divisionType;
    if (parentId) params.ParentId = parentId;
    let res = await this._divisionRequest.cache.list(params);
    return res.Data;
  }
  private async _loadStation(DivisionId?: string) {
    let params = new GetGarbageStationsParams();
    if (DivisionId) params.DivisionId = DivisionId;
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
