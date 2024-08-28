import { EventNumberStatistic } from 'src/app/network/model/garbage-station/event-number-statistic.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GarbageStationUrl } from 'src/app/network/url/garbage/garbage-station.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../../base-request-howell.service';
import { GetGarbageStationEventNumbersParams } from '../garbage-station-request.params';

export class GarbageStationEventNumberHistoryRequestService {
  constructor(basic: HowellBaseRequestService) {
    this.basicType = basic.type(EventNumberStatistic);
  }
  private basicType: HowellBaseTypeRequestService<EventNumberStatistic>;
  list(
    stationId: string,
    params: GetGarbageStationEventNumbersParams
  ): Promise<PagedList<EventNumberStatistic>> {
    let url = GarbageStationUrl.eventnumber(stationId).history.list();
    return this.basicType.paged(url, params);
  }
}
