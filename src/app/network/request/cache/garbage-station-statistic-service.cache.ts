import { IBusiness } from 'src/app/business/Ibusiness';
import { GarbageStationNumberStatistic } from '../../model/garbage-station-number-statistic.model';
import { PagedList } from '../../model/page_list.model';
import { GetGarbageStationStatisticNumbersParams } from '../garbage-station/garbage-station-request.params';
import { ServiceCache } from './service.cache';

export class GarbageStationStatisticServiceCache extends ServiceCache<GarbageStationNumberStatistic> {
  constructor(key: string, service: IBusiness<GarbageStationNumberStatistic>) {
    super(key, service, 1 * 20 * 1000, false);
  }

  loadItem(id: string) {
    return this.cache.get(this.key + id) as GarbageStationNumberStatistic;
  }
  saveItem(id: string, data: GarbageStationNumberStatistic) {
    this.cache.set(this.key + id, data);
  }

  async get(id: string): Promise<GarbageStationNumberStatistic> {
    try {
      let data = this.loadItem(id);
      if (data) {
        return data;
      }
    } catch (error) {}
    return super.get(id);
  }

  async list(
    args?: GetGarbageStationStatisticNumbersParams
  ): Promise<PagedList<GarbageStationNumberStatistic>> {
    try {
      if (args) {
        if (args.Ids) {
          let result: GarbageStationNumberStatistic[] = [];
          for (let i = 0; i < args.Ids.length; i++) {
            const id = args.Ids[i];
            let data = this.loadItem(id);
            if (!data) {
              throw new Error();
            }
            result.push(data);
          }
          if (args.GarbageDrop !== undefined) {
            if (args.GarbageDrop) {
              result = result.filter(
                (x) => x.CurrentGarbageTime && x.CurrentGarbageTime > 0
              );
            } else {
              result = result.filter(
                (x) => !x.CurrentGarbageTime || x.CurrentGarbageTime <= 0
              );
            }
          }
          return super.getPaged(result, args);
        }
      }
    } catch (error) {}

    return this.service.list!(args).then((result) => {
      result.Data.forEach((item) => {
        this.saveItem(item.Id, item);
      });
      return result;
    });
  }
}
