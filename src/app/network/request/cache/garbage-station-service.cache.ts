import { GarbageStation } from '../../model/garbage-station.model';
import { PagedList } from '../../model/page_list.model';
import { GetGarbageStationsParams } from '../garbage-station/garbage-station-request.params';
import { ServiceCache } from './service.cache';

export class GarbageStationServiceCache extends ServiceCache<GarbageStation> {
  async list(
    args?: GetGarbageStationsParams
  ): Promise<PagedList<GarbageStation>> {
    let paged: PagedList<GarbageStation>;
    let datas = await this.all();
    if (args) {
      if (args.DivisionId || args.AncestorId || args.DryFull || args.WetFull) {
        return super.list(args);
      }
      if (args.Ids) {
        datas = datas.filter((x) => args.Ids?.includes(x.Id));
      }
      if (args.Name) {
        datas = datas.filter((x) => x.Name.includes(args.Name!));
      }
      if (args.StationType) {
        datas = datas.filter((x) => x.StationType === args.StationType);
      }

      paged = this.getPaged(datas);
    } else {
      paged = this.getPaged(datas);
    }
    return paged;
  }
}
