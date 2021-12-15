import { InjectionToken, ReflectiveInjector } from '@angular/core';
import { TreeServiceEnum } from 'src/app/enum/tree-service.enum';
import { TreeServiceInterface } from '../interface/tree-service.interface';
import { DivisionTreeService } from '../services/division-tree.service';
import { ServiceFactory } from '../services/service.factory';
import { StationTreeService } from '../services/station-tree.service';

export const TreeServiceToken = new InjectionToken<TreeServiceInterface>('');

export const TreeProviders = [
  {
    provide: TreeServiceToken,
    useClass: DivisionTreeService,
    multi: true,
  },
  {
    provide: TreeServiceToken,
    useClass: StationTreeService,
    multi: true,
  },
];
