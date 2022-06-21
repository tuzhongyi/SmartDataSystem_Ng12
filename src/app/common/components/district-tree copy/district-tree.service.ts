import { Injectable } from '@angular/core';
import { TreeConverter } from 'src/app/converter/tree.converter';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { TreeBusinessEnum } from 'src/app/enum/tree-business.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { DivisionTree } from 'src/app/network/model/division-tree.model';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { GetDivisionsParams, GetDivisionTreeParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { NestTreeNode } from 'src/app/view-model/nest-tree-node.model';

@Injectable()
export class DistrictTreeBusiness {

  private _model = TreeBusinessEnum.Division;

  public nestedNodeMap = new Map<string, NestTreeNode>();
  public depthIsEnd = false;

  public set model(val: TreeBusinessEnum) {
    this._model = val;
  }
  get model() {
    return this._model;
  }

  constructor(
    private _divisionRequest: DivisionRequestService,
    private _stationRequest: GarbageStationRequestService,
    private _converter: TreeConverter
  ) {
  }
  // 设置区划等级和子区划深度
  async initialize(
    type: UserResourceType = UserResourceType.City,
    depth: number = 0,
  ) {

    this.nestedNodeMap.clear();
    return this._getDataRecursively(type, depth)
  }

  private async _getDataRecursively(type: UserResourceType = UserResourceType.City,
    depth: number = 0,) {
    // if (this.model == TreeServiceEnum.Division && (type !== UserResourceType.City && type !== UserResourceType.County && type !== UserResourceType.Committees)) {
    //   return [];
    // }

    if (depth < 0) return [];
    let data = await this._loadData(type);
    let nodes = this._converter.iterateToNestTreeNode(data);

    // console.log('资源类型: ', type);
    // console.log('深度: ', depth);
    // console.log('节点: ', nodes)

    // 厢房树需要给居委会添加子节点
    if (
      type == UserResourceType.Committees &&
      this.model == TreeBusinessEnum.Station
    ) {
      nodes.forEach((node) => {
        node.hasChildren = true;

      });
    }

    this._register(nodes);
    // console.log(this.nestedNodeMap)

    // 手动关闭最下层节点
    if (depth == 0 && this.depthIsEnd) {
      nodes.forEach((node) => {
        node.hasChildren = false;

      });
    }
    try {
      let children = await this._getDataRecursively(
        EnumHelper.GetResourceChildType(type),
        depth - 1
      );

      children.forEach((child) => {
        let parentId = child.parentId;
        if (parentId) {
          let parentNode = this.nestedNodeMap.get(parentId);
          if (parentNode) {
            // console.log(parentNode.name)
            child.parentNode = parentNode;
            parentNode.childrenLoaded = true;
            parentNode.childrenChange.value.push(child);
          }
        }
      });
    } catch (e) {
      // 当 GetResourceChildType 没有下一级时报错，自动退出
      // console.log(e)
    }
    return nodes;
  }

  async loadChildren(node: NestTreeNode) {

    let children: NestTreeNode[] = [];

    try {
      let data = await this._loadData(
        EnumHelper.GetResourceChildType(node.type),
        node.id
      );
      children = this._converter.iterateToNestTreeNode(data);
      children.forEach(child => child.parentNode = node);

      this._register(children);
      if (
        node.type == UserResourceType.County &&
        this.model == TreeBusinessEnum.Station
      ) {
        children.forEach((node) => (node.hasChildren = true));
      }

      // console.log('children: ', children)
    } catch (e) {

    }
    return children;
  }
  async searchNode(condition: string) {
    this.nestedNodeMap.clear()
    let nodes: NestTreeNode[] = []
    if (condition == '') {
      nodes = await this.initialize();
    } else {
      let data = await this._searchDivisionData(condition);
      let divisionNodes = this._converter.recurseToNestTreeNode(data);
      if (this.model == TreeBusinessEnum.Division) {
        nodes = divisionNodes;
      }
      else if (this.model == TreeBusinessEnum.Station) {
        let stations = await this._searchStationData(condition);
        // 所有祖先区划
        let allDivisions: Division[] = [];
        let allStations: GarbageStation[] = [];
        let stationNodes: NestTreeNode[] = [];


        // stations = stations.filter(station => station.DivisionId);

        for (let i = 0; i < stations.length; i++) {
          let station = stations[i];
          if (station.DivisionId) {
            allStations.push(station);
            let division = await this._getDivision(
              station.DivisionId
            );
            allDivisions.push(division);
            let ancestors = await this._getAncestorDivision(
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

        // console.log('厢房所在区划', divisions);

        // 合并 Division 和 Station
        let result = [...divisions, ...allStations];

        // 根据Division和Station创建 Station 树
        stationNodes = this._converter.buildNestNodeTree(result);

        // console.log(stationNodes);

        // 将 stationNodes 和  divisionNodes 合并

        let merged = this._converter.mergeNestedTree(divisionNodes, stationNodes);
        // console.log(merged);

        nodes = merged;

      }
    }
    this._updateNestedMap(nodes)
    console.log(this.nestedNodeMap.values())
    // console.log('search result: ', nodes)
    return nodes;

  }


  /************************* Private *************************/

  private async _loadData(type: UserResourceType, divisionId?: string) {
    switch (type) {
      case UserResourceType.City:
      case UserResourceType.County:
      case UserResourceType.Committees:
        return this._loadDivision(type, divisionId);
        break;
      case UserResourceType.Station:
        return this._loadStation(divisionId);
      default:
        throw new TypeError('类型错误');
    }
  }

  private async _loadDivision(type: UserResourceType, parentId?: string) {
    let divisionType = EnumHelper.ConvertUserResourceToDivision(type);
    let params = new GetDivisionsParams();
    params.DivisionType = divisionType;
    if (parentId) params.ParentId = parentId;
    let res = await this._divisionRequest.list(params);
    return res.Data;
  }

  private async _loadStation(divisionId?: string) {
    let params = new GetGarbageStationsParams();
    if (divisionId) params.DivisionId = divisionId;
    let res = await this._stationRequest.list(params);
    // console.log('station: ', res)
    return res.Data;
  }

  private async _getDivision(id: string) {
    return await this._divisionRequest.cache.get(id);
  }
  private async _getAncestorDivision(division: Division) {
    let res: Division[] = [];

    while (division.ParentId) {
      let d = await this._getDivision(division.ParentId);
      res.push(d);
      division = d;
    }

    return res;
  }

  private async _searchDivisionData(condition: string) {
    let params = new GetDivisionTreeParams();
    params.Name = condition;
    let res: DivisionTree = await this._divisionRequest.tree(params);
    return res.Nodes;
  }
  private async _searchStationData(condition: string) {
    let params = new GetGarbageStationsParams();
    params.Name = condition;
    let res = await this._stationRequest.list(params);

    return res.Data;
  }



  private _register(nodes: NestTreeNode[]) {
    for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i];
      // 一定要直接覆盖，保证 node 为最新
      this.nestedNodeMap.set(node.id, node);
    }
  }
  private _updateNestedMap(nodes: NestTreeNode[]) {
    for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i];
      this.nestedNodeMap.set(node.id, node);
      if (node.childrenChange.value.length > 0) {
        this._updateNestedMap(node.childrenChange.value)
      }
    }

  }


}
