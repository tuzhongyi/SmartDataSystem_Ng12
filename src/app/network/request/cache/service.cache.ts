import { IBusiness, IData } from 'src/app/business/Ibusiness';
import { PagedList } from '../../model/page_list.model';
import { IParams } from '../IParams.interface';
import { AppCache } from './app-cache';

export class ServiceCache<T extends IData> {
  cache = new AppCache(1000 * 60 * 30);

  constructor(private key: string, private service: IBusiness<T>) {}
  load() {
    return this.cache.get(this.key) as T[];
  }
  save(data: T[]) {
    this.cache.set(this.key, data);
  }
  clear() {
    this.cache.del(this.key);
  }

  update(data: T): Promise<T> {
    return this.service.update(data).then((result) => {
      let datas = this.load();
      let index = datas.findIndex((x) => x.Id === result.Id);
      if (index >= 0) {
        datas[index] = result;
        this.save(datas);
      }
      return result;
    });
  }
  create(data: T): Promise<T> {
    return this.service.create(data).then((result) => {
      let datas = this.load();
      datas.push(result);
      this.save(datas);
      return result;
    });
  }
  delete(id: string): Promise<T> {
    return this.service.delete(id).then((result) => {
      let datas = this.load();
      let index = datas.findIndex((x) => x.Id == id);
      if (index >= 0) {
        datas.slice(index, 1);
        this.save(datas);
      }
      return result;
    });
  }
  list(args?: IParams): Promise<PagedList<T>> {
    return this.service.list(args).then((result) => {
      let datas = this.load();
      result.Data.forEach((item) => {
        let index = datas.findIndex((x) => x.Id === item.Id);
        if (index >= 0) {
          datas[index] = item;
        } else {
          datas.push(item);
        }
      });
      return result;
    });
  }

  async all(): Promise<T[]> {
    let datas = this.load();
    if (datas && datas.length > 0) {
      return datas;
    }
    return this.service.list().then((x) => {
      this.cache.set(this.key, x.Data);
      return x.Data;
    });
  }

  async get(id: string): Promise<T> {
    let data = this.load();
    let result = data.find((x) => x.Id === id);
    if (result) {
      return result;
    }
    return this.service.get(id).then((x) => {
      let datas = this.load();
      datas.push(x);
      this.save(datas);
      return x;
    });
  }
}

export function Cache(key: string) {
  return function <T extends IData>(target: Function) {
    target.prototype.cache = new ServiceCache(
      key,
      target as unknown as IBusiness<T>
    );
  };
}
