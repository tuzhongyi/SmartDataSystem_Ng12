import { HowellBaseRequestService } from '../../base-request-howell.service';
import { GarbageStationEventNumberHistoryRequestService } from './garbage-station-event-number-history-request.service';

export class GarbageStationEventNumberRequestService {
  constructor(private basic: HowellBaseRequestService) {}
  private _history?: GarbageStationEventNumberHistoryRequestService;
  public get history(): GarbageStationEventNumberHistoryRequestService {
    if (!this._history) {
      this._history = new GarbageStationEventNumberHistoryRequestService(
        this.basic
      );
    }
    return this._history;
  }
}
