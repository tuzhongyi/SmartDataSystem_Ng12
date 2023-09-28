import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { Flags } from '../common/tools/flags';
import { StationState } from '../enum/station-state.enum';

export class GarbageStationModel extends GarbageStation {
  Division?: Promise<DivisionModel>;
  private _StationStateFlags?: Flags<StationState>;
  public get StationStateFlags(): Flags<StationState> {
    if (!this._StationStateFlags) {
      this._StationStateFlags = new Flags<StationState>(this.StationState);
    }
    return this._StationStateFlags;
  }
}

export class DivisionModel extends Division {
  Parent?: Promise<DivisionModel>;
}
