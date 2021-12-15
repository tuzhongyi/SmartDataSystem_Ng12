import { InjectionToken, ReflectiveInjector } from '@angular/core';
import { IService } from '../interfaces/service.interface';

export const ServiceToken: InjectionToken<IService> =
  new InjectionToken<IService>('');


  export const TreeServiceToken = ReflectiveInjector.resolveAndCreate([]);
