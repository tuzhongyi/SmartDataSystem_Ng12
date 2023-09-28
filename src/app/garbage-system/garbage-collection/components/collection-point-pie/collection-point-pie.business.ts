import { Injectable } from '@angular/core';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { GetCollectionPointNumberParams } from 'src/app/network/request/garbage_vehicles/collection-points/collection-points.params';
import { CollectionPointsRequestService } from 'src/app/network/request/garbage_vehicles/collection-points/collection-points.service';
import { CollectionPointPieConverter } from './collection-point-pie.converte';
import { ICollectionPointPieSearchInfo } from './collection-point-pie.model';

@Injectable()
export class CollectionPointPieBusiness {
  constructor(
    private _globalStorageService: GlobalStorageService,

    private _collectionPointsRequest: CollectionPointsRequestService,
    private _converter: CollectionPointPieConverter
  ) {}
  async init(searchInfo: ICollectionPointPieSearchInfo) {
    let Data = await this._listClassificationNumber(searchInfo);
    let res = this._converter.Convert(Data);
    return res;
  }

  private async _listClassificationNumber(
    searchInfo: ICollectionPointPieSearchInfo
  ) {
    let params = new GetCollectionPointNumberParams();
    if (searchInfo.DivisionIds) {
      if (
        (await this._globalStorageService.defaultDivisionId) !==
        this._globalStorageService.divisionId
      ) {
        params.DivisionIds = searchInfo.DivisionIds;
      }
    }
    if (searchInfo.Classifications)
      params.Classifications = searchInfo.Classifications;
    return this._collectionPointsRequest.statistic.number(params);
  }
}
