import { HowellBaseRequestService } from '../../base-request-howell.service';
import { GarbageStationVolumeHistoryRequestService } from './garbage-station-volume-history-request.service';

export class GarbageStationVolumeRequestService {
  constructor(private basic: HowellBaseRequestService) {}

  private _history?: GarbageStationVolumeHistoryRequestService;
  public get history(): GarbageStationVolumeHistoryRequestService {
    if (!this._history) {
      this._history = new GarbageStationVolumeHistoryRequestService(this.basic);
    }
    return this._history;
  }
}
