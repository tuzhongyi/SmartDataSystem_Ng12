import { GarbageVolume } from 'src/app/network/model/garbage-station/garbage-volume.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GarbageStationUrl } from 'src/app/network/url/garbage/garbage-station.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../../base-request-howell.service';
import { GetGarbageStationVolumesParams } from '../garbage-station-request.params';

export class GarbageStationVolumeHistoryRequestService {
  constructor(private basic: HowellBaseRequestService) {
    this.basicType = basic.type(GarbageVolume);
  }
  private basicType: HowellBaseTypeRequestService<GarbageVolume>;
  list(
    stationId: string,
    params: GetGarbageStationVolumesParams
  ): Promise<PagedList<GarbageVolume>> {
    let url = GarbageStationUrl.volume(stationId).history.list();
    return this.basicType.paged(url, params);
  }
}
