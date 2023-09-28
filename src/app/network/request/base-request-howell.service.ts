import { Router } from '@angular/router';
import { ClassConstructor, instanceToPlain } from 'class-transformer';
import { RoutePath } from 'src/app/app-routing.path';
import { HowellResponse } from '../model/howell-response.model';
import { PagedList } from '../model/page_list.model';
import { HowellAuthHttpService } from './howell-auth-http.service';
import { IParams } from './IParams.interface';
import { ServiceHelper } from './service-helper';

export class HowellBaseRequestService {
  constructor(public http: HowellAuthHttpService, private router: Router) {}
  async get<T>(url: string, type: ClassConstructor<T>): Promise<T> {
    let response = await this.http.getHowellResponse(url).toPromise();
    switch (response.FaultCode) {
      case 403:
      case 405:
        this.router.navigateByUrl(RoutePath.login);
        break;

      default:
        break;
    }
    return ServiceHelper.HowellResponseProcess(response, type);
  }
  async put<T>(url: string, type: ClassConstructor<T>, model: T | IParams) {
    let data = instanceToPlain(model) as T;
    let response = await this.http.howellPut(url, data).toPromise();
    switch (response.FaultCode) {
      case 403:
      case 405:
        this.router.navigateByUrl(RoutePath.login);
        break;

      default:
        break;
    }
    return ServiceHelper.HowellResponseProcess(response, type);
  }
  async post<T>(
    url: string,
    type: ClassConstructor<T>,
    params?: IParams
  ): Promise<T>;
  async post<T>(url: string, type: ClassConstructor<T>, model?: T): Promise<T>;

  async post<T>(url: string, type: ClassConstructor<T>, args?: T | IParams) {
    let data = instanceToPlain(args) as T | IParams;
    let response = await this.http.howellPost(url, data).toPromise();
    switch (response.FaultCode) {
      case 403:
      case 405:
        this.router.navigateByUrl(RoutePath.login);
        break;

      default:
        break;
    }
    return ServiceHelper.HowellResponseProcess(response, type);
  }

  async poststring<T>(url: string, type: ClassConstructor<T>, args: string) {
    let response = await this.http.postString(url, args).toPromise();
    switch (response.FaultCode) {
      case 403:
      case 405:
        this.router.navigateByUrl(RoutePath.login);
        break;

      default:
        break;
    }
    return ServiceHelper.HowellResponseProcess(response, type);
  }

  async delete<T>(url: string, type: ClassConstructor<T>) {
    let response = await this.http.howellDelete(url).toPromise();
    switch (response.FaultCode) {
      case 403:
      case 405:
        this.router.navigateByUrl(RoutePath.login);
        break;

      default:
        break;
    }
    return ServiceHelper.HowellResponseProcess(response, type);
  }
  async postArray<T>(url: string, type: ClassConstructor<T>, params?: IParams) {
    let data: IParams | undefined;
    if (params) {
      data = instanceToPlain(params) as IParams;
    }
    let response = await this.http
      .howellPost<IParams, HowellResponse<Array<T>>>(url, data)
      .toPromise();
    switch (response.FaultCode) {
      case 403:
      case 405:
        this.router.navigateByUrl(RoutePath.login);
        break;

      default:
        break;
    }
    return ServiceHelper.HowellResponseProcess(response, type);
  }
  async postReturnString(url: string, params?: IParams) {
    let data: IParams | undefined;
    if (params) {
      data = instanceToPlain(params) as IParams;
    }
    let response = await this.http
      .howellPost<IParams, HowellResponse<string>>(url, data)
      .toPromise();
    switch (response.FaultCode) {
      case 403:
      case 405:
        this.router.navigateByUrl(RoutePath.login);
        break;

      default:
        break;
    }
    return ServiceHelper.HowellResponseProcess(response, true);
  }

  postBinaryData<R>(url: string, data: BinaryData): Promise<R> {
    return this.http.postBinaryData<R>(url, data).toPromise();
  }

  async getArray<T>(url: string, type: ClassConstructor<T>) {
    let response = await this.http
      .getHowellResponse<IParams, HowellResponse<Array<T>>>(url)
      .toPromise();
    switch (response.FaultCode) {
      case 403:
      case 405:
        this.router.navigateByUrl(RoutePath.login);
        break;

      default:
        break;
    }
    return ServiceHelper.HowellResponseProcess(response, type);
  }
  async paged<T>(url: string, type: ClassConstructor<T>, params: IParams) {
    let data = instanceToPlain(params) as IParams;
    let response = await this.http
      .howellPost<IParams, HowellResponse<PagedList<T>>>(url, data)
      .toPromise();
    switch (response.FaultCode) {
      case 403:
      case 405:
        this.router.navigateByUrl(RoutePath.login);
        break;

      default:
        break;
    }
    return ServiceHelper.HowellResponseProcess(response, type);
  }

  async getExcel(url: string) {
    let response = (await this.http.getStream(url).toPromise()) as Blob;
    let buffer = await response.arrayBuffer();
    return new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
  }

  type<T>(type: ClassConstructor<T>): HowellBaseTypeRequestService<T> {
    return new HowellBaseTypeRequestService<T>(this, type);
  }
}

export class HowellBaseTypeRequestService<T> {
  constructor(
    private service: HowellBaseRequestService,
    private type: ClassConstructor<T>
  ) {}

  async get(url: string): Promise<T> {
    return this.service.get<T>(url, this.type);
  }
  async put(url: string, model: T) {
    return this.service.put<T>(url, this.type, model);
  }
  async post(url: string, model?: T): Promise<T>;
  async post(url: string, params?: IParams): Promise<T>;
  async post(url: string, args?: T | IParams) {
    if (args) {
      let plain = instanceToPlain(args);
      return this.service.post<T>(url, this.type, plain);
    }
    return this.service.post<T>(url, this.type, args);
  }
  async delete(url: string) {
    return this.service.delete<T>(url, this.type);
  }
  async postArray(url: string, params?: IParams) {
    let plain = instanceToPlain(params);
    return this.service.postArray<T>(url, this.type, plain);
  }
  async getArray(url: string) {
    return this.service.getArray<T>(url, this.type);
  }
  async paged(url: string, params: IParams) {
    let plain = instanceToPlain(params);
    return this.service.paged<T>(url, this.type, plain);
  }
}
