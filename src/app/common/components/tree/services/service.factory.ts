import { Inject, Injectable } from '@angular/core';
import { TreeServiceEnum } from 'src/app/enum/tree-service.enum';
import { ServiceInterface } from '../interface/service.interface';
import { ServiceToken } from '../tokens/service.token';

@Injectable()
export class ServiceFactory {
  constructor(@Inject(ServiceToken) private _services: ServiceInterface[]) {}

  createService(name: TreeServiceEnum): ServiceInterface {
    return this._services.filter((item) => item.getName() === name)[0];
  }
}
