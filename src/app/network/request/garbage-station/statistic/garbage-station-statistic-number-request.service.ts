import { GarbageStationNumberStatisticComparison } from 'src/app/network/model/garbage-station/garbage-station-number-statistic-comparison.model';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station/garbage-station-number-statistic.model';
import { SumEventNumber } from 'src/app/network/model/garbage-station/sum-event-number.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GarbageStationUrl } from 'src/app/network/url/garbage/garbage-station.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../../base-request-howell.service';
import { Cache } from '../../cache/cache';

import { AbstractService } from 'src/app/business/Ibusiness';
import {
  GetGarbageStationStatisticComparisonParams,
  GetGarbageStationStatisticNumbersParams,
  GetGarbageStationSumEventNumberParams,
} from '../garbage-station-request.params';
import { GarbageStationStatisticNumberHistoryService } from './garbage-station-statistic-number-history-request.service';

@Cache(
  GarbageStationUrl.statistic().number.basic(),
  GarbageStationNumberStatistic
)
export class GarbageStationStatisticNumberRequestService extends AbstractService<GarbageStationNumberStatistic> {
  constructor(private basic: HowellBaseRequestService) {
    super();
    this.basicType = basic.type(GarbageStationNumberStatistic);
  }
  private basicType: HowellBaseTypeRequestService<GarbageStationNumberStatistic>;
  get(stationId: string): Promise<GarbageStationNumberStatistic> {
    let url = GarbageStationUrl.statistic(stationId).number.basic();
    return this.basicType.get(url);
  }
  list(
    params: GetGarbageStationStatisticNumbersParams
  ): Promise<PagedList<GarbageStationNumberStatistic>> {
    let url = GarbageStationUrl.statistic().number.list();
    return this.basicType.paged(url, params);
  }
  sum(
    params: GetGarbageStationSumEventNumberParams
  ): Promise<SumEventNumber[]> {
    let url = GarbageStationUrl.statistic().number.sum();
    return this.basic.postArray(url, SumEventNumber, params);
  }
  comparison(
    params: GetGarbageStationStatisticComparisonParams
  ): Promise<GarbageStationNumberStatisticComparison[]> {
    let url = GarbageStationUrl.statistic().number.comparison();
    return this.basic.postArray(
      url,
      GarbageStationNumberStatisticComparison,
      params
    );
  }

  private _history?: GarbageStationStatisticNumberHistoryService;
  public get history(): GarbageStationStatisticNumberHistoryService {
    if (!this._history) {
      this._history = new GarbageStationStatisticNumberHistoryService(
        this.basic
      );
    }
    return this._history;
  }
}
