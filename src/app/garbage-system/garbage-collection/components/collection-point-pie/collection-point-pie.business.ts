import { Injectable } from '@angular/core';
import { IHWPieCharBusiness } from 'src/app/common/components/hw-pie-chart/hw-pie-chart.model';
import { HWPieChartConverter } from 'src/app/converter/hw-pie-chart.converter';
import { GetCollectionPointNumberParams } from 'src/app/network/request/garbage_vehicles/collection-points/collection-points.params';
import { CollectionPointsRequestService } from 'src/app/network/request/garbage_vehicles/collection-points/collection-points.service';
import { ICollectionPointPieSearchInfo } from './collection-point-pie.model';

@Injectable()
export class CollectionPointPieBusiness implements IHWPieCharBusiness {
  searchInfo: ICollectionPointPieSearchInfo = {};

  constructor(
    private _collectionPointsRequest: CollectionPointsRequestService,
    private _converter: HWPieChartConverter
  ) {}
  async init() {
    let Data = await this._listClassificationNumber();
    let res = this._converter.Convert(Data);
    return res;
  }

  private _listClassificationNumber() {
    let params = new GetCollectionPointNumberParams();
    if (this.searchInfo.DivisionIds)
      params.DivisionIds = this.searchInfo.DivisionIds;
    if (this.searchInfo.Classifications)
      params.Classifications = this.searchInfo.Classifications;
    return this._collectionPointsRequest.statistic.number(params);
  }
}
