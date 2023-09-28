import { Injectable } from '@angular/core';
import { Language } from 'src/app/common/tools/language';
import { Medium } from 'src/app/common/tools/medium';
import {
  AbstractCommonModelPromiseConverter,
  modelSource,
} from 'src/app/converter/common-model.converter';
import { StationState } from 'src/app/enum/station-state.enum';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GarbageStationListModel } from './garbage-station-list.model';

@Injectable()
export class GarbageStationListConverter extends AbstractCommonModelPromiseConverter<GarbageStationListModel> {
  private _divisionMap: Map<string, Division> = new Map();

  constructor(private _divisionRequest: DivisionRequestService) {
    super();
  }
  Convert(source: modelSource, ...res: any[]) {
    if (source instanceof GarbageStation) {
      return this._fromGarbageStation(source);
    }
    throw new Error('Error');
  }

  private async _fromGarbageStation(item: GarbageStation) {
    let model = new GarbageStationListModel();

    model.Id = item.Id;
    model.ImageUrls = item.Cameras
      ? item.Cameras.map((camera) => Medium.jpg(camera.ImageUrl))
      : [];
    model.StationName = item.Name;

    model.CommunityId = item.CommunityId;
    model.CommunityName = item.CommunityName ?? '-';

    model.CommunityId = item.DivisionId;
    let committee = item.DivisionId
      ? await this._getDivision(item.DivisionId)
      : null;

    model.CommitteeName = committee ? committee.Name : '-';

    model.CountyId = committee?.ParentId;
    model.CountyName = model.CountyId
      ? await (
          await this._getDivision(model.CountyId)
        ).Name
      : '-';
    let state = item.StationState;

    console.log('sdfsd', item.Name, state);

    if ((state & StationState.Normal) == StationState.Normal) {
      model.StateCls = 'green-text';
      model.State = Language.StationState(StationState.Normal);
    }
    if ((state & StationState.Full) == StationState.Full) {
      model.StateCls = 'orange-text';
      model.State = Language.StationState(StationState.Full);
    }
    if ((state & StationState.Error) == StationState.Error) {
      model.StateCls = 'powder-red-text';
      model.State = Language.StationState(StationState.Error);
    }

    model.RawData = item;

    return model;
  }
  private async _getDivision(id: string) {
    let division: Division;

    if (this._divisionMap.has(id)) {
      division = this._divisionMap.get(id)!;
    } else {
      // 需要当前区划的上级区划信息
      division = await this._divisionRequest.get(id);
      this._divisionMap.set(division.Id, division);
    }

    return division;
  }
}
