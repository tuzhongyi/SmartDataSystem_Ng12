import {
  Inject,
  Injectable,
  InjectionToken,
  ReflectiveInjector,
} from '@angular/core';
import { TreeServiceToken } from '../tokens/service.token';
import { IService } from './service.interface';

export interface IServiceFactory {
  createService(name: string): IService;
}

// @Injectable()
// export class ServiceFactory implements IServiceFactory {
//   services: IService[]
//   constructor(
//     token:InjectionToken<IService>
//   ) {
//     this.services = ReflectiveInjector.resolveAndCreate([IService, ]);
//   }

//   createService(name: string): IService {
//     return this.services.filter((item) => item.getName() === name)[0];
//   }
// }
