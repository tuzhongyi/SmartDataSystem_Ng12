import { TrashCan } from 'src/app/network/model/garbage-station/trash-can.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GarbageStationUrl } from 'src/app/network/url/garbage/garbage-station.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../../base-request-howell.service';
import { GetGarbageStationTrashCansParams } from '../garbage-station-request.params';

export class GarbageStationTrashCanRequestService {
  constructor(private basic: HowellBaseRequestService) {
    this.basicType = basic.type(TrashCan);
  }

  private basicType: HowellBaseTypeRequestService<TrashCan>;

  all(stationId: string): Promise<TrashCan[]> {
    let url = GarbageStationUrl.trashcan(stationId).basic();
    return this.basicType.getArray(url);
  }
  create(data: TrashCan): Promise<TrashCan> {
    let url = GarbageStationUrl.trashcan(data.GarbageStationId).basic();
    return this.basicType.post(url, data);
  }
  get(stationId: string, trashCanId: string): Promise<TrashCan> {
    let url = GarbageStationUrl.trashcan(stationId).item(trashCanId);
    return this.basicType.get(url);
  }
  update(data: TrashCan): Promise<TrashCan> {
    let url = GarbageStationUrl.trashcan(data.GarbageStationId).item(data.Id);
    return this.basicType.put(url, data);
  }
  delete(stationId: string, trashCanId: string): Promise<TrashCan> {
    let url = GarbageStationUrl.trashcan(stationId).item(trashCanId);
    return this.basicType.delete(url);
  }
  list(params: GetGarbageStationTrashCansParams): Promise<PagedList<TrashCan>> {
    let url = GarbageStationUrl.trashcan().list();
    return this.basicType.paged(url, params);
  }
}
