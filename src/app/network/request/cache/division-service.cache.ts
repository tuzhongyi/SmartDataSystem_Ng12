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

  async get(id: string): Promise<Division> {
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

  async list(args?: GetDivisionsParams): Promise<PagedList<Division>> {
    return new Promise((reject) => {
      this.wait((datas: Division[]) => {
        let paged: PagedList<Division>;
        if (args) {
          if (args.ParentId) {
            datas = datas.filter((x) => x.ParentId === args.ParentId);
          }
          if (args.AncestorId) {
            datas = this.getAllChildren(args.AncestorId, datas);
          }
          if (args.DivisionType) {
            datas = datas.filter((x) => x.DivisionType === args.DivisionType);
          }
          if (args.Name) {
            datas = datas.filter((x) => x.Name.includes(args.Name!));
          }
          if (args.Ids) {
            datas = datas.filter((x) => args.Ids?.includes(x.Id));
          } else {
          }
          paged = this.getPaged(datas, args);
        } else {
          paged = this.getPaged(datas);
        }
        reject(paged);
      });
    });
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
