import { Injectable } from '@angular/core';
import { ICommonPieCharBusiness } from 'src/app/common/components/common-pie-chart/common-pie-chart.model';
import { CommonPieChartConverter } from 'src/app/common/components/common-pie-chart/common-pie-chart.converter';
import { GetCollectionPointNumberParams } from 'src/app/network/request/garbage_vehicles/collection-points/collection-points.params';
import { CollectionPointsRequestService } from 'src/app/network/request/garbage_vehicles/collection-points/collection-points.service';
import { CollectionPointClassification } from 'src/app/enum/collection-point-classification.enum';
import { ICollectionPointPieSearchInfo } from './collection-point-pie.model';
import { CollectionPointPieConverter } from './collection-point-pie.converte';

@Injectable()
export class CollectionPointPieBusiness {
  constructor(
    private _collectionPointsRequest: CollectionPointsRequestService,
    private _converter: CollectionPointPieConverter
  ) {}
  async init(searchInfo: ICollectionPointPieSearchInfo) {
    let Data = await this._listClassificationNumber(searchInfo);
    let res = this._converter.Convert(Data);
    return res;
  }

  private _listClassificationNumber(searchInfo: ICollectionPointPieSearchInfo) {
    let params = new GetCollectionPointNumberParams();
    if (searchInfo.DivisionIds) params.DivisionIds = searchInfo.DivisionIds;
    if (searchInfo.Classifications)
      params.Classifications = searchInfo.Classifications;
    return this._collectionPointsRequest.statistic.number(params);
  }
}
