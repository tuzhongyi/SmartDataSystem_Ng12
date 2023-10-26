import { Injectable } from '@angular/core';
import { DivisionTreeConverter } from 'src/app/common/components/division-tree/division-tree.converter';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { EnumHelper } from 'src/app/enum/enum-helper';

import { DivisionTree } from 'src/app/network/model/garbage-station/division-tree.model';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { GarbageVehicle } from 'src/app/network/model/garbage-station/garbage-vehicle.model';
import {
  GetDivisionsParams,
  GetDivisionTreeParams,
} from 'src/app/network/request/division/division-request.params';
import { CollectionDivisionRequestService } from 'src/app/network/request/garbage_vehicles/divisions/collection-division-request.service';
import { GetGarbageVehiclesParams } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.params';
import { GarbageVehicleRequestService } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.service';

import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { CommonNestNode } from 'src/app/view-model/common-nest-node.model';

@Injectable()
export class CollectionDivisionTreeBusiness {
  public showExtend = false;
  public depthIsEnd = false;

  public nestedNodeMap = new Map<string, CommonNestNode<Division>>();

  constructor(
    private _divisionRequest: CollectionDivisionRequestService,
    private _vehicleRequest: GarbageVehicleRequestService,
    private _converter: DivisionTreeConverter
  ) {}

  // 相当于默认请求 condition==''的区划
  load(type: DivisionType = DivisionType.City, depth: number = 0) {
    this.nestedNodeMap.clear();
    return this._getDataRecursively(type, depth);
  }

  async loadChildren(flat: CommonFlatNode<Division>) {
    let node = this.nestedNodeMap.get(flat.Id);
    if (!node) return;
    if (node.ChildrenLoaded) return;

    let children: CommonNestNode[] = [];
    try {
      let type = node.RawData.DivisionType;

      let data = await this.getData(
        EnumHelper.GetDivisionChildType(type),
        node.Id
      );
      children = this._converter.iterateToNestNode(data);
      children.forEach((child) => (child.ParentNode = node!));
      this._register(children);
      node.childrenChange.next(children);
      node.ChildrenLoaded = true;
      // 如果当前是请求街道下层的居委会信息，而且需要展示厢房，则居委会节点要能loadChildren
      if (type == DivisionType.County && this.showExtend) {
        children.forEach((child) => (child.HasChildren = true));
      }
    } catch (e) {}
    // console.log('子节点', node)
    return node;
  }

  async searchNode(
    condition: string,
    type: DivisionType = DivisionType.City,
    depth: number = 0
  ) {
    this.nestedNodeMap.clear();
    let nodes: CommonNestNode[] = [];
    if (condition == '') {
      nodes = await this.load(type, depth);
    } else {
      let data = await this._searchDivisionData(condition);
      let divisionNodes = this._converter.recurseToNestNode(data);
      nodes = divisionNodes;
      if (this.showExtend) {
        let vehicles = await this._searchVehicleData(condition);
        // 所有祖先区划
        let allDivisions: Division[] = [];
        let allVehicles: GarbageVehicle[] = [];
        let vehicleNodes: CommonNestNode[] = [];

        for (let i = 0; i < vehicles.length; i++) {
          let vehicle = vehicles[i];
          if (vehicle.DivisionId) {
            allVehicles.push(vehicle);
            let division = await this._getDivision(vehicle.DivisionId);
            allDivisions.push(division);
            let ancestors = await this._getAncestorDivision(division);
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
        // 合并 Division 和 Vehicle
        let result = [...divisions, ...allVehicles];

        vehicleNodes = this._converter.buildNestTree(result);

        // console.log(vehicleNodes);

        // 将 vehicleNodes 和  divisionNodes 合并

        let merged = this._converter.mergeNestedTree(
          divisionNodes,
          vehicleNodes
        );
        // console.log(merged);

        nodes = merged;
      }
    }
    this._updateNestedMap(nodes);
    return nodes;
  }

  private async _getDataRecursively(
    type: DivisionType = DivisionType.City,
    depth: number = 0
  ) {
    if (depth < 0) return [];
    let data = await this.getData(type);

    let nodes = this._converter.iterateToNestNode(data);
    this._register(nodes);

    if (type == DivisionType.Committees && this.showExtend) {
      nodes.forEach((node) => (node.HasChildren = true));
    }
    if (depth == 0 && this.depthIsEnd) {
      nodes.forEach((node) => {
        node.HasChildren = false;
      });
    }
    try {
      let children = await this._getDataRecursively(
        EnumHelper.GetDivisionChildType(type),
        depth - 1
      );

      children.forEach((child) => {
        let parentId = child.ParentId;
        if (parentId) {
          let parentNode = this.nestedNodeMap.get(parentId);
          if (parentNode) {
            // console.log(parentNode.name)
            child.ParentNode = parentNode;
            parentNode.ChildrenLoaded = true;
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

  async getData(type: DivisionType, divisionId?: string) {
    switch (type) {
      case DivisionType.City:
      case DivisionType.County:
      case DivisionType.Committees:
        return this._loadDivision(type, divisionId);
      default:
        return this._loadVehicle(divisionId);
    }
  }

  private async _loadDivision(type: DivisionType, parentId?: string) {
    let params = new GetDivisionsParams();
    params.DivisionType = type;
    if (parentId) params.ParentId = parentId;
    let res = await this._divisionRequest.list(params);
    return res.Data;
  }

  private async _loadVehicle(divisionId?: string) {
    let params = new GetGarbageVehiclesParams();
    if (divisionId) params.DivisionId = divisionId;
    let res = await this._vehicleRequest.list(params);
    return res.Data;
  }

  private async _getDivision(id: string) {
    return await this._divisionRequest.get(id);
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
  private async _searchVehicleData(condition: string) {
    let params = new GetGarbageVehiclesParams();
    params.Name = condition;
    let res = await this._vehicleRequest.list(params);

    return res.Data;
  }

  private _register(nodes: CommonNestNode[]) {
    for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i];
      // 一定要直接覆盖，保证 node 为最新
      this.nestedNodeMap.set(node.Id, node);
    }
  }
  private _updateNestedMap(nodes: CommonNestNode[]) {
    for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i];
      this.nestedNodeMap.set(node.Id, node);
      if (node.childrenChange.value.length > 0) {
        this._updateNestedMap(node.childrenChange.value);
      }
    }
  }
}
