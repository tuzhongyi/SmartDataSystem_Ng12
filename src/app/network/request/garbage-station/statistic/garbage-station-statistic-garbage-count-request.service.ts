import { HowellBaseRequestService } from '../../base-request-howell.service';
import { GarbageStationStatistictGarbageCountHistoryRequestService } from './garbage-station-statistic-garbage-count-history-request.service';

export class GarbageStationStatistictGarbageCountRequestService {
  constructor(private basic: HowellBaseRequestService) {}
  private _history?: GarbageStationStatistictGarbageCountHistoryRequestService;
  public get history(): GarbageStationStatistictGarbageCountHistoryRequestService {
    if (!this._history) {
      this._history =
        new GarbageStationStatistictGarbageCountHistoryRequestService(
          this.basic
        );
    }
    return this._history;
  }
}
