import { Injectable } from '@angular/core';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetGarbageCollectionEventRecordsParams } from 'src/app/network/request/garbage_vehicles/collection-event/collection-event.params';
import { CollectionEventRequestService } from 'src/app/network/request/garbage_vehicles/collection-event/collection-event.service';
import { CollectionListWindowConverter } from './collection-list-window.converter';
import {
  CollectionListWindowModel,
  ICollectionListWindowSearchInfo,
} from './collection-list-window.model';

@Injectable()
export class CollectionListWindowBusiness {
  constructor(
    private _collectionEventRequest: CollectionEventRequestService,
    private _converter: CollectionListWindowConverter
  ) {}
  async init(searchInfo: ICollectionListWindowSearchInfo) {
    let { Data, Page } = await this._list(searchInfo);

    let data = this._converter.iterateToModel(Data);

    let res: PagedList<CollectionListWindowModel> = {
      Page: Page,
      Data: data,
    };

    return res;
  }

  private _list(searchInfo: ICollectionListWindowSearchInfo) {
    let params = new GetGarbageCollectionEventRecordsParams();
    params.PageIndex = searchInfo.PageIndex;
    params.PageSize = searchInfo.PageSize;
    params.BeginTime = searchInfo.EndTime;
    params.EndTime = searchInfo.BeginTime;
    params.CollectionPointIds = searchInfo.CollectionPointIds;
    params.CollectionPointName = searchInfo.Condition;

    return this._collectionEventRequest.record.garbageCollection.list(params);
  }
}
