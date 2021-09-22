import { ClassConstructor, classToPlain } from 'class-transformer';
import { HowellResponse } from '../../model/howell-response.model';
import { PagedList } from '../../model/page-list.model';
import { HowellAuthHttpService } from './howell-auth-http.service';
import { IParams } from './IParams.interface';
import { ServiceHelper } from './service-helper';

export class RequestBase<T> {
  constructor(
    private _service: HowellAuthHttpService,
    private type: ClassConstructor<T>
  ) {}

  async get(url: string) {
    let response = await this._service.get(url).toPromise();
    return ServiceHelper.ResponseProcess(response, this.type);
  }
  async put(url: string, model: T) {
    let data = classToPlain(model) as T;
    let response = await this._service.put(url, data).toPromise();
    return ServiceHelper.ResponseProcess(response, this.type);
  }
  async post(url: string, model: T) {
    let data = classToPlain(model) as T;
    let response = await this._service.post(url, data).toPromise();
    return ServiceHelper.ResponseProcess(response, this.type);
  }
  async delete(url: string) {
    let response = await this._service.delete(url).toPromise();
    return ServiceHelper.ResponseProcess(response, this.type);
  }
  async postList(url: string, params: IParams) {
    let data = classToPlain(params) as IParams;
    let response = await this._service
      .post<IParams, HowellResponse<PagedList<T>>>(url, data)
      .toPromise();
    return ServiceHelper.ResponseProcess(response, this.type);
  }
}
