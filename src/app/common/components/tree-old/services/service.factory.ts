import { Inject, Injectable } from '@angular/core';
import { IServiceFactory } from 'src/app/common/interfaces/service-factory.interface';
import { TreeServiceEnum } from 'src/app/enum/tree-service.enum';
import { TreeServiceInterface } from '../interface/tree-service.interface';
import { TreeServiceToken } from '../tokens/service.token';

@Injectable()
export class ServiceFactory implements IServiceFactory {
  constructor(
    @Inject(TreeServiceToken) private _services: TreeServiceInterface[]
  ) {}

  createService(name: TreeServiceEnum): TreeServiceInterface {
    return this._services.find((item) => item.getName() === name)!;
  }
}
