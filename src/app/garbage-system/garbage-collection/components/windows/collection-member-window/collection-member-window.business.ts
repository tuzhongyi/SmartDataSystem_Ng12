import { Injectable } from '@angular/core';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetCollectionMembersParams } from 'src/app/network/request/garbage_vehicles/collection-member/member-request.params';
import { CollectionMemberRequsetService } from 'src/app/network/request/garbage_vehicles/collection-member/member-request.service';
import { CollectionMemberWindowConverter } from './collection-member-window.converter';
import {
  CollectionMemberWindowModel,
  ICollectionMemberWindowSearchInfo,
} from './collection-member-window.model';

@Injectable()
export class CollectionMemberWindowBusiness {
  constructor(
    private _collectionMemberRequset: CollectionMemberRequsetService,
    private _converter: CollectionMemberWindowConverter
  ) {}
  async init(searchInfo: ICollectionMemberWindowSearchInfo) {
    let { Page, Data } = await this._list(searchInfo);

    // console.log(Data);
    // Data = [...Data, ...Data, ...Data];
    let data = await this._converter.iterateToModel(Data);
    let res: PagedList<CollectionMemberWindowModel> = {
      Page: Page,
      Data: data,
    };

    return res;
  }
  private _list(searchInfo: ICollectionMemberWindowSearchInfo) {
    let params = new GetCollectionMembersParams();
    params.PageIndex = searchInfo.PageIndex;
    params.PageSize = searchInfo.PageSize;
    params.DivisionId = searchInfo.DivisionId;
    params.Name = searchInfo.Condition;

    return this._collectionMemberRequset.list(params);
  }
}
