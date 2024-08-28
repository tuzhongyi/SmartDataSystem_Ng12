import { HowellBaseRequestService } from '../../base-request-howell.service';
import { GarbageStationStatistictGarbageCountRequestService } from './garbage-station-statistic-garbage-count-request.service';
import { GarbageStationStatisticNumberRequestService } from './garbage-station-statistic-number-request.service';

export class GarbageStationStatisticRequestService {
  constructor(private basic: HowellBaseRequestService) {}

  private _number?: GarbageStationStatisticNumberRequestService;
  public get number(): GarbageStationStatisticNumberRequestService {
    if (!this._number) {
      this._number = new GarbageStationStatisticNumberRequestService(
        this.basic
      );
    }
    return this._number;
  }

  private _garbageCount?: GarbageStationStatistictGarbageCountRequestService;
  public get garbageCount(): GarbageStationStatistictGarbageCountRequestService {
    if (!this._garbageCount) {
      this._garbageCount =
        new GarbageStationStatistictGarbageCountRequestService(this.basic);
    }
    return this._garbageCount;
  }
}
