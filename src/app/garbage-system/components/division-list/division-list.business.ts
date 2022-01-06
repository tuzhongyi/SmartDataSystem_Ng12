import { IBusiness } from 'src/app/business/Ibusiness';
import { Division } from 'src/app/network/model/division.model';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';

export class DivisionListBusiness {
  constructor(private _business: IBusiness<Division>) {}

  async get(id: string) {
    let data = await this._business.get(id);
    return data;
  }
  /**获得直接子元素 */
  async listChildDivisions(id: string) {
    let params = new GetDivisionsParams();
    params.ParentId = id;
    let res = await this._business.cache.list(params);

    return res.Data.sort((a, b) => {
      return a.Name.localeCompare(b.Name);
    });
  }
}
