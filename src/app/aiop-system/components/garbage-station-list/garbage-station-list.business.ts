import { Injectable } from '@angular/core';
import { Flags } from 'src/app/common/tools/flags';
import { GarbageStationModelConverter } from 'src/app/converter/view-models/garbage-station.model.converter';
import { SearchConditionKey } from 'src/app/enum/search-condition.enum';
import { StationState } from 'src/app/enum/station-state.enum';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { GarbageStationListConverter } from './garbage-station-list.converter';
import {
  GarbageStationListModel,
  GarbageStationListSearchInfo,
} from './garbage-station-list.model';

@Injectable()
export class GarbageStationListBusiness {
  constructor(
    private _garbageStationRequest: GarbageStationRequestService,
    private _converter: GarbageStationListConverter
  ) {}

  async init(searchInfo: GarbageStationListSearchInfo) {
    let { Page, Data } = await this._listGarbageStation(searchInfo);
    console.log(Data);

    let flag = new Flags(3);
    console.log(flag.contains(StationState.Normal));
    console.log(flag.contains(StationState.Full));
    console.log(flag.contains(StationState.Error));

    let data = await this._converter.iterateToModel(Data);

    let res: PagedList<GarbageStationListModel> = {
      Page: Page,
      Data: data,
    };
    return res;
  }
  private _listGarbageStation(searchInfo: GarbageStationListSearchInfo) {
    let params = new GetGarbageStationsParams();
    params.PageIndex = searchInfo.PageIndex;
    params.PageSize = searchInfo.PageSize;

    if (searchInfo.DivisionId) params.DivisionId = searchInfo.DivisionId;

    switch (searchInfo.SearchConditionKey) {
      case SearchConditionKey.StationName:
        params.Name = searchInfo.Condition;
        break;
      case SearchConditionKey.CommunityName:
        params.CommunityName = searchInfo.Condition;
        break;
    }

    return this._garbageStationRequest.list(params);
  }
}
