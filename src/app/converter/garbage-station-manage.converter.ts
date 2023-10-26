import { Injectable } from '@angular/core';
import {
  GarbageStation,
  GarbageStationType,
} from '../network/model/garbage-station/garbage-station.model';
import { GarbageStationRequestService } from '../network/request/garbage-station/garbage-station-request.service';
import { GarbageStationManageModel } from '../view-model/garbage-station-manage.model';
import {
  AbstractCommonModelConverter,
  CommonModelSource,
} from './common-model.converter';

@Injectable({
  providedIn: 'root',
})
export class GarbageStationManageConverter extends AbstractCommonModelConverter<GarbageStationManageModel> {
  private _stationTypes: Map<number, GarbageStationType> = new Map();

  constructor(private _garbageStationRequest: GarbageStationRequestService) {
    super();

    this.init();
  }

  private async init() {
    let res = await this._listTypes();

    res.forEach((v) => {
      this._stationTypes.set(v.Type, v);
    });
  }
  Convert(source: CommonModelSource, ...res: any[]) {
    if (source instanceof GarbageStation) {
      return this._fromGarbageStation(source);
    }
    throw new Error('Error');
  }

  private _fromGarbageStation(item: GarbageStation) {
    const model = new GarbageStationManageModel();
    model.Id = item.Id;
    model.Name = item.Name;
    model.StationType = this._stationTypes.get(item.StationType)?.Name ?? '';

    return model;
  }

  private _listTypes() {
    return this._garbageStationRequest.type.list();
  }
}
