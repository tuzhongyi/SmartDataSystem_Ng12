import { plainToInstance } from 'class-transformer';
import { IService } from 'src/app/business/Ibusiness';
import { GarbageStation } from '../../model/garbage-station.model';
import { PagedList } from '../../model/page_list.model';
import { GetGarbageStationsParams } from '../garbage-station/garbage-station-request.params';
import { ServiceCache } from './service.cache';

export class GarbageStationServiceCache extends ServiceCache<GarbageStation> {
  constructor(key: string, service: IService<GarbageStation>) {
    super(key, service, GarbageStation);
  }
  async get(id: string): Promise<GarbageStation> {
    return new Promise((reject) => {
      this.wait((data) => {
        let result = data.find((x) => x.Id === id);
        if (result) {
          reject(result);
          return;
        }
        this.service.get(id).then((x) => {
          let datas = this.load();
          if (!datas) datas = [];
          let index = datas.findIndex((x) => x.Id == id);
          if (index < 0) {
            datas.push(x);
            this.save(datas);
          }
          reject(x);
        });
      });
    });
  }

  async list(
    args?: GetGarbageStationsParams
  ): Promise<PagedList<GarbageStation>> {
    if (args) {
      if (args.DivisionId || args.AncestorId || args.DryFull || args.WetFull) {
        return super.list(args);
      }
    }
    return new Promise((reject) => {
      this.wait(() => {
        let paged: PagedList<GarbageStation>;
        let datas = this.load() as GarbageStation[];
        datas = plainToInstance(GarbageStation, datas);
        if (args) {
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
        reject(paged);
      });
    });
  }
}
