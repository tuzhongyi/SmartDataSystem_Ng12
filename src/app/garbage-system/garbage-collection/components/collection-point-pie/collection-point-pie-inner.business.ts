import { Injectable } from '@angular/core';
import { ICommonPieCharBusiness } from 'src/app/common/components/common-pie-chart/common-pie-chart.model';
import { CommonPieChartConverter } from 'src/app/common/components/common-pie-chart/common-pie-chart.converter';
import { GetCollectionPointNumberParams } from 'src/app/network/request/garbage_vehicles/collection-points/collection-points.params';
import { CollectionPointsRequestService } from 'src/app/network/request/garbage_vehicles/collection-points/collection-points.service';
import { CollectionPointClassification } from 'src/app/enum/collection-point-classification.enum';
import { ICollectionPointPieSearchInfo } from './collection-point-pie.model';
import { CollectionPointPieConverter } from './collection-point-pie.converte';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';

// 直接传给子组件调用
@Injectable()
export class CollectionPointPieInnerBusiness {
  searchInfo: ICollectionPointPieSearchInfo = {
    DivisionIds: [this._globalStorage.divisionId],
  };

  constructor(
    private _globalStorage: GlobalStorageService,
    private _collectionPointsRequest: CollectionPointsRequestService,
    private _converter: CommonPieChartConverter
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
