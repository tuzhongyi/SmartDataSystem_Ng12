import { IService } from 'src/app/business/Ibusiness';
import { DivisionNumberStatistic } from '../../model/division-number-statistic.model';
import { PagedList } from '../../model/page_list.model';
import { GetDivisionStatisticNumbersParams } from '../division/division-request.params';
import { ServiceCache } from './service.cache';

export class DivisionStatisticServiceCache extends ServiceCache<DivisionNumberStatistic> {
  constructor(key: string, service: IService<DivisionNumberStatistic>) {
    super(key, service, DivisionNumberStatistic, 1 * 20 * 1000, false);
  }

  loadItem(id: string) {
    return this.cache.get(this.key + id) as DivisionNumberStatistic;
  }
  saveItem(id: string, data: DivisionNumberStatistic) {
    this.cache.set(this.key + id, data, this.timeout);
  }

  async get(id: string): Promise<DivisionNumberStatistic> {
    try {
      let data = this.loadItem(id);
      if (data) {
        return data;
      }
    } catch (error) {
      console.warn(error);
    }
    return super.get(id);
  }

  async list(
    args?: GetDivisionStatisticNumbersParams
  ): Promise<PagedList<DivisionNumberStatistic>> {
    try {
      if (args) {
        if (args.Ids) {
          let result: DivisionNumberStatistic[] = [];
          for (let i = 0; i < args.Ids.length; i++) {
            const id = args.Ids[i];
            let data = this.loadItem(id);
            if (!data) {
              throw new Error();
            }
            result.push(data);
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
