import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station/garbage-station-number-statistic-v2.model';
import { GarbageStationUrl } from 'src/app/network/url/garbage/garbage-station.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../../base-request-howell.service';
import { GetGarbageStationStatisticNumbersParamsV2 } from '../garbage-station-request.params';

export class GarbageStationStatisticNumberHistoryService {
  constructor(basic: HowellBaseRequestService) {
    this.basicType = basic.type(GarbageStationNumberStatisticV2);
  }
  private basicType: HowellBaseTypeRequestService<GarbageStationNumberStatisticV2>;
  list(
    params: GetGarbageStationStatisticNumbersParamsV2
  ): Promise<GarbageStationNumberStatisticV2[]> {
    let url = GarbageStationUrl.statistic().number.history.list();
    return this.basicType.postArray(url, params);
  }
}
