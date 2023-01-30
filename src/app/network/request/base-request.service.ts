import { ClassConstructor, instanceToPlain } from 'class-transformer';
import { HowellResponse } from '../model/howell-response.model';
import { PagedList } from '../model/page_list.model';
import { HowellAuthHttpService } from './howell-auth-http.service';
import { IParams } from './IParams.interface';
import { ServiceHelper } from './service-helper';

export class BaseRequestService {
  constructor(public http: HowellAuthHttpService) {}
  async get<T>(url: string, type: ClassConstructor<T>): Promise<T> {
    let response = await this.http.getHowellResponse(url).toPromise();
    return ServiceHelper.ResponseProcess(response, type);
  }
  async put<T>(url: string, type: ClassConstructor<T>, model: T | IParams) {
    let data = instanceToPlain(model) as T;
    let response = await this.http.put(url, data).toPromise();
    return ServiceHelper.ResponseProcess(response, type);
  }
  async post<T>(
    url: string,
    type: ClassConstructor<T>,
    params?: IParams
  ): Promise<T>;
  async post<T>(url: string, type: ClassConstructor<T>, model?: T): Promise<T>;

  async post<T>(url: string, type: ClassConstructor<T>, args?: T | IParams) {
    let data = instanceToPlain(args) as T | IParams;
    let response = await this.http.post(url, data).toPromise();
    return ServiceHelper.ResponseProcess(response, type);
  }

  async poststring<T>(url: string, type: ClassConstructor<T>, args: string) {
    let response = await this.http.postString(url, args).toPromise();
    return ServiceHelper.ResponseProcess(response, type);
  }

  async delete<T>(url: string, type: ClassConstructor<T>) {
    let response = await this.http.delete(url).toPromise();
    return ServiceHelper.ResponseProcess(response, type);
  }
  async postArray<T>(url: string, type: ClassConstructor<T>, params?: IParams) {
    let data: IParams | undefined;
    if (params) {
      data = instanceToPlain(params) as IParams;
    }
    let response = await this.http
      .post<IParams, HowellResponse<Array<T>>>(url, data)
      .toPromise();
    return ServiceHelper.ResponseProcess(response, type);
  }
  async postReturnString(url: string, params?: IParams) {
    let data: IParams | undefined;
    if (params) {
      data = instanceToPlain(params) as IParams;
    }
    let response = await this.http
      .post<IParams, HowellResponse<string>>(url, data)
      .toPromise();
    return ServiceHelper.ResponseProcess(response, true);
  }

  postBinaryData<R>(url: string, data: BinaryData): Promise<R> {
    return this.http.postBinaryData<R>(url, data).toPromise();
  }

  async getArray<T>(url: string, type: ClassConstructor<T>) {
    let response = await this.http
      .getHowellResponse<IParams, HowellResponse<Array<T>>>(url)
      .toPromise();
    return ServiceHelper.ResponseProcess(response, type);
  }
  async paged<T>(url: string, type: ClassConstructor<T>, params: IParams) {
    let data = instanceToPlain(params) as IParams;
    let response = await this.http
      .post<IParams, HowellResponse<PagedList<T>>>(url, data)
      .toPromise();
    return ServiceHelper.ResponseProcess(response, type);
  }

  async getExcel(url: string) {
    let response = (await this.http.getStream(url).toPromise()) as Blob;
    let buffer = await response.arrayBuffer();
    return new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
  }

  type<T>(type: ClassConstructor<T>): BaseTypeRequestService<T> {
    return new BaseTypeRequestService<T>(this, type);
  }
}

export class BaseTypeRequestService<T> {
  constructor(
    private _service: BaseRequestService,
    private type: ClassConstructor<T>
  ) {}

  async get(url: string): Promise<T> {
    return this._service.get<T>(url, this.type);
  }
  async put(url: string, model: T) {
    return this._service.put(url, this.type, model);
  }
  async post(url: string, model?: T): Promise<T>;
  async post(url: string, params?: IParams): Promise<T>;
  async post(url: string, args?: T | IParams) {
    return this._service.post(url, this.type, args);
  }
  async delete(url: string) {
    return this._service.delete(url, this.type);
  }
  async postArray(url: string, params?: IParams) {
    return this._service.postArray(url, this.type, params);
  }
  async getArray(url: string) {
    return this._service.getArray(url, this.type);
  }
  async paged(url: string, params: IParams) {
    return this._service.paged(url, this.type, params);
  }
}
