/*
 * @Author: pmx
 * @Date: 2022-12-15 14:59:30
 * @Last Modified by: pmx
 * @Last Modified time: 2022-12-15 16:02:13
 */
import { Injectable } from '@angular/core';
import { param } from 'jquery';
import { CommonStatisticCardConverter } from 'src/app/common/components/common-statistic-card/common-statistic-card.converter';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Time } from 'src/app/common/tools/time';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetCollectionMembersParams } from 'src/app/network/request/garbage_vehicles/collection-member/member-request.params';
import { CollectionMemberRequsetService } from 'src/app/network/request/garbage_vehicles/collection-member/member-request.service';
import { GetCollectionPointsParams } from 'src/app/network/request/garbage_vehicles/collection-points/collection-points.params';
import { CollectionPointsRequestService } from 'src/app/network/request/garbage_vehicles/collection-points/collection-points.service';
import { CollectionDivisionRequestService } from 'src/app/network/request/garbage_vehicles/divisions/division-request.service';
import { GetGarbageVehiclesParams } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.params';
import { GarbageVehicleRequestService } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.service';

@Injectable()
export class CollectionStatisticCardBusiness {
  constructor(
    private _globalStorageService: GlobalStorageService,
    private _garbageVehicleRequest: GarbageVehicleRequestService,
    private _collectionDivisionRequest: CollectionDivisionRequestService,
    private _collectionMemberRequset: CollectionMemberRequsetService,
    private _collectionPointsRequest: CollectionPointsRequestService,
    private _converter: CommonStatisticCardConverter
  ) {}

  async init() {
    let data = await Promise.all([
      this._listGarbageVehicle(),
      this._listGarbageWeight(),
      this._listGarbageMember(),
      this._listGarbagePoints(),
    ]);

    let res = this._converter.iterateToModel(data);
    console.log(res);
  }

  // 获取垃圾清运车数量
  private async _listGarbageVehicle() {
    let params = new GetGarbageVehiclesParams();
    params.DivisionId = this._globalStorageService.divisionId;
    return this._garbageVehicleRequest.list(params);
  }

  // 获取垃圾清运数量
  private _listGarbageWeight() {
    return this._collectionDivisionRequest.garbage.weight.get(
      this._globalStorageService.divisionId
    );
  }

  // 获取垃圾清运人员数量
  private _listGarbageMember() {
    let params = new GetCollectionMembersParams();
    params.DivisionId = this._globalStorageService.divisionId;
    return this._collectionMemberRequset.list(params);
  }

  private _listGarbagePoints() {
    let params = new GetCollectionPointsParams();
    params.DivisionIds = [this._globalStorageService.divisionId];
    return this._collectionPointsRequest.list(params);
  }
}
