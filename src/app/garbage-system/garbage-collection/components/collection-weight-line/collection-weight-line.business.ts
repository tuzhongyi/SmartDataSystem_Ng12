import { Injectable } from '@angular/core';
import { TrashCanType } from 'src/app/enum/trashcan-type.enum';
import { GetDivisionGarbageWeightsParams } from 'src/app/network/request/garbage_vehicles/divisions/collection-division-request.params';
import { CollectionDivisionRequestService } from 'src/app/network/request/garbage_vehicles/divisions/collection-division-request.service';
import { CollectionWeightLineConverter } from './collection-weight-line.converter';
import { ICollectionWeightLineSearchInfo } from './collection-weight-line.model';

@Injectable()
export class CollectionWeightLineBusiness {
  constructor(
    private _collectionDivisionRequest: CollectionDivisionRequestService,
    private _converter: CollectionWeightLineConverter
  ) {}
  async init(searchInfo: ICollectionWeightLineSearchInfo) {
    let Data = await this._listGarbageWeight(searchInfo);
    let res = this._converter.Convert(Data, searchInfo.Type);

    return res;
  }

  private _listGarbageWeight(searchInfo: ICollectionWeightLineSearchInfo) {
    let params = new GetDivisionGarbageWeightsParams();
    params.BeginTime = searchInfo.BeginTime;
    params.EndTime = searchInfo.EndTime;
    params.DivisionIds = searchInfo.DivisionIds;
    if (searchInfo.TimeUnit) params.TimeUnit = searchInfo.TimeUnit;

    return this._collectionDivisionRequest.garbage.weight.list(params);
  }
}
