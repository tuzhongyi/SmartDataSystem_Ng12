import { IBusiness } from 'src/app/business/Ibusiness';
import { Division } from '../../model/division.model';
import { PagedList } from '../../model/page_list.model';
import { GetDivisionsParams } from '../division/division-request.params';
import { IParams, PagedParams } from '../IParams.interface';
import { ServiceCache } from './service.cache';

export class DivisionServiceCache extends ServiceCache<Division> {
  constructor(key: string, service: IBusiness<Division>) {
    super(key, service);
  }
  async list(args?: GetDivisionsParams): Promise<PagedList<Division>> {
    let result = new Array<Division>();
    let datas = this.load();
    if (args) {
      if (args.ParentId) {
        let data = datas.filter((x) => x.ParentId === args.ParentId);
        result = [...result, ...data];
      } else if (args.AncestorId) {
        let data = this.getAllChildren(args.AncestorId, datas);
        result = [...result, ...data];
      } else if (args.DivisionType) {
        let data = datas.filter((x) => x.DivisionType === args.DivisionType);
        result = [...result, ...data];
      } else if (args.Name) {
        let data = datas.filter((x) => x.Name.includes(args.Name!));
        result = [...result, ...data];
      } else if (args.Ids) {
        let data = datas.filter((x) => args.Ids?.includes(x.Id));
        result = [...result, ...data];
      } else {
      }
      return this.getPaged(result, args);
    } else {
      return this.getPaged(datas);
    }
  }

  getAncestor(ancestorId: string, datas: Division[]) {
    return datas.find((x) => x.Id === ancestorId);
  }

  getAllChildren(ancestorId: string, datas: Division[]) {
    let children = this.getChildren(ancestorId, datas);
    if (children) {
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        let data = this.getAllChildren(child.Id, datas);
        children = [...children, ...data];
      }
    }
    return children;
  }

  getChildren(parentId: string, datas: Division[]) {
    return datas.filter((x) => x.ParentId === parentId);
  }

  getParent(parentId: string, datas: Division[]) {
    return datas.find((x) => x.Id === parentId);
  }
}

export function DivisionCache(key: string) {
  return function (this: any, target: Function) {
    if (!target.prototype.cache) {
      // new ServiceCache(key, this);
      console.log('Cache', this);
      Object.defineProperty(target.prototype, 'cache', {
        get() {
          if (!this._cache) {
            this._cache = new DivisionServiceCache(key, this);
          }
          return this._cache;
        },
        set() {},
      });
      // target.prototype.cache = function () {
      //   console.log('cache', this);
      //   return;
      // };
    }
  };
}
