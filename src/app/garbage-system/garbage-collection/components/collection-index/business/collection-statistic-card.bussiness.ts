/*
 * @Author: pmx
 * @Date: 2022-12-15 14:59:30
 * @Last Modified by: pmx
 * @Last Modified time: 2022-12-20 17:31:12
 */
import { Injectable } from '@angular/core';
import { CommonStatisticCardConverter } from 'src/app/common/components/common-statistic-card/common-statistic-card.converter';
import { CommonStatisticCardModel } from 'src/app/common/components/common-statistic-card/common-statistic-card.model';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { GetCollectionMembersParams } from 'src/app/network/request/garbage_vehicles/collection-member/member-request.params';
import { CollectionMemberRequsetService } from 'src/app/network/request/garbage_vehicles/collection-member/member-request.service';
import { GetCollectionPointsParams } from 'src/app/network/request/garbage_vehicles/collection-points/collection-points.params';
import { CollectionPointsRequestService } from 'src/app/network/request/garbage_vehicles/collection-points/collection-points.service';
import { CollectionDivisionRequestService } from 'src/app/network/request/garbage_vehicles/divisions/collection-division-request.service';
import { GetGarbageVehiclesParams } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.params';
import { GarbageVehicleRequestService } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.service';

@Injectable()
export class CollectionStatisticCardBusiness {
  constructor(
    private _globalStorage: GlobalStorageService,
    private _garbageVehicleRequest: GarbageVehicleRequestService,
    private _collectionDivisionRequest: CollectionDivisionRequestService,
    private _collectionMemberRequset: CollectionMemberRequsetService,
    private _collectionPointsRequest: CollectionPointsRequestService,
    private _converter: CommonStatisticCardConverter
  ) {}

  async init() {
    // let data = await Promise.all([
    //   this._listGarbageVehicle(),
    //   this._listGarbageWeight(),
    //   this._listGarbageMember(),
    //   this._listGarbagePoints(),
    // ]);

    // console.log(data);
    // let res = this._converter.iterateToModel(data);
    // console.log(res);

    let statisticData = await this._listCollectionDivisionStatisticNumber();
    // console.log(statisticData);

    let res = this._converter.Convert(
      statisticData
    ) as CommonStatisticCardModel[];

    // this._converter.Convert(statisticData);
    // statisticData;

    return res;
  }

  // 获取垃圾清运车数量
  private async _listGarbageVehicle() {
    let division = await this._globalStorage.division.promise.selected;
    let params = new GetGarbageVehiclesParams();
    params.DivisionId = division.Id;
    return this._garbageVehicleRequest.list(params);
  }

  // 获取垃圾清运数量
  private async _listGarbageWeight() {
    let division = await this._globalStorage.division.promise.selected;
    return this._collectionDivisionRequest.garbage.weight.get(division.Id);
  }

  // 获取垃圾清运人员数量
  private async _listGarbageMember() {
    let division = await this._globalStorage.division.promise.selected;
    let params = new GetCollectionMembersParams();
    params.DivisionId = division.Id;
    return this._collectionMemberRequset.list(params);
  }

  private async _listGarbagePoints() {
    let _default = await this._globalStorage.division.promise.default;
    let division = await this._globalStorage.division.promise.selected;
    let params = new GetCollectionPointsParams();
    if (_default.Id !== division.Id) {
      params.DivisionIds = [division.Id];
    }
    return this._collectionPointsRequest.list(params);
  }

  private async _listCollectionDivisionStatisticNumber() {
    let division = await this._globalStorage.division.promise.selected;
    return this._collectionDivisionRequest.statistic.number(division.Id);
  }
}
