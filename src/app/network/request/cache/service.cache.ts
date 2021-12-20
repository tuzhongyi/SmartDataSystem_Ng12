import { IBusiness, IData } from 'src/app/business/Ibusiness';
import { Page, PagedList } from '../../model/page_list.model';
import { IParams, PagedParams } from '../IParams.interface';
import { AppCache } from './app-cache';

export class ServiceCache<T extends IData> {
  cache = new AppCache(1000 * 60 * 30);
  loaded = false;

  constructor(private key: string, private service: IBusiness<T>) {
    this.save([]);
    this.all();
  }

  protected wait(reject: () => void, timeout = 100) {
    setTimeout(() => {
      if (this.loaded) {
        reject();
      } else {
        this.wait(reject, timeout);
      }
    }, timeout);
  }

  load() {
    try {
      return this.cache.get(this.key) as T[];
    } catch (error) {
      return new Array<T>();
    }
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
      this.loaded = true;
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

  protected getPaged(datas: T[], params?: PagedParams): PagedList<T> {
    let index = 1;
    let size = 999;
    if (params) {
      if (params.PageIndex) {
        index = params.PageIndex;
      }
      if (params.PageSize) {
        size = params.PageSize;
      }
    }
    let count = datas.length;

    let start = (index - 1) * size;
    let paged = datas.splice(start, size);

    let page = {
      PageIndex: index,
      PageSize: size,
      PageCount: Math.ceil(count / size),
      RecordCount: paged.length,
      TotalRecordCount: count,
    };
    return {
      Page: page,
      Data: paged,
    };
  }
}
