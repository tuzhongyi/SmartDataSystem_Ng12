import { Injectable } from '@angular/core';
import { TreeConverter } from 'src/app/converter/tree.converter';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { TreeServiceEnum } from 'src/app/enum/tree-service.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { NestTreeNode } from 'src/app/view-model/nest-tree-node.model';
import { TreeServiceInterface } from '../interface/tree-service.interface';

@Injectable()
export class TreeService implements TreeServiceInterface {

  private _model = TreeServiceEnum.Division;

  public nestedNodeMap = new Map<string, NestTreeNode>();
  public depthIsEnd = false;

  public set model(val: TreeServiceEnum) {
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
    let nodes = this._converter.iterateToNested(data);

    // console.log('资源类型: ', type);
    // console.log('深度: ', depth);
    // console.log('节点: ', nodes)

    // 厢房树需要给居委会添加子节点
    if (
      type == UserResourceType.Committees &&
      this.model == TreeServiceEnum.Station
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
      children = this._converter.iterateToNested(data);
      children.forEach(child => child.parentNode = node);

      this._register(children);
      if (
        node.type == UserResourceType.County &&
        this.model == TreeServiceEnum.Station
      ) {
        children.forEach((node) => (node.hasChildren = true));
      }

      console.log('children: ', children)
    } catch (e) {

    }
    return children;
  }

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
    let res = await this._divisionRequest.cache.list(params);
    return res.Data;
  }

  private async _loadStation(divisionId?: string) {
    let params = new GetGarbageStationsParams();
    if (divisionId) params.DivisionId = divisionId;
    let res = await this._stationRequest.cache.list(params);
    console.log('station: ', res)
    return res.Data;
  }


  private _register(nodes: NestTreeNode[]) {
    for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i];
      if (!this.nestedNodeMap.has(node.id)) {
        this.nestedNodeMap.set(node.id, node);
      }
    }
  }


}
