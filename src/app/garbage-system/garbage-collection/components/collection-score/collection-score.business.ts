import { Injectable } from '@angular/core';
import { GetGarbageCollectionEventRecordsParams } from 'src/app/network/request/garbage_vehicles/collection-event/collection-event.params';
import { CollectionEventRequestService } from 'src/app/network/request/garbage_vehicles/collection-event/collection-event.service';
import { CollectionScoreConverter } from './collection-score.converter';
import { CollectionScoreSearchInfo } from './collection-score.model';

@Injectable()
export class CollectionScoreBusiness {
  constructor(
    private eventRequest: CollectionEventRequestService,
    private _converter: CollectionScoreConverter
  ) {}

  async init(searchInfo: CollectionScoreSearchInfo) {
    let { Data } = await this._list(searchInfo);

    let res = this._converter.Convert(Data, searchInfo.Type);
    return res;
  }
  private _list(searchInfo: CollectionScoreSearchInfo) {
    let params = new GetGarbageCollectionEventRecordsParams();
    params.BeginTime = searchInfo.BeginTime;
    params.EndTime = searchInfo.EndTime;
    return this.eventRequest.record.garbageCollection.list(params);
  }
}
