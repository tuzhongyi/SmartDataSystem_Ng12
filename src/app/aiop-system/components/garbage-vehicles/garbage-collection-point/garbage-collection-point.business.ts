import { EventEmitter, Injectable } from '@angular/core';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { CollectionPoint } from 'src/app/network/model/collection-point.model';
import { CollectionPointsRequestService } from 'src/app/network/request/garbage_vehicles/collection-points/collection-points.service';
import { IGarbageCollectionPointBusiness } from './garbage-collection-point.model';

@Injectable()
export class GarbageCollectionPointBusiness
  implements IGarbageCollectionPointBusiness
{
  constructor(private service: CollectionPointsRequestService) {}
  load(id: string): Promise<CollectionPoint> {
    return this.getData(id);
  }
  getData(id: string): Promise<CollectionPoint> {
    return this.service.get(id);
  }

  create(model: CollectionPoint): Promise<CollectionPoint> {
    return this.service.create(model);
  }
  update(model: CollectionPoint): Promise<CollectionPoint> {
    return this.service.update(model);
  }
  delete(ids: string[]): Promise<CollectionPoint[]> {
    let array = new Array<Promise<CollectionPoint>>();
    ids.forEach((x) => {
      let promise = this.service.delete(x);
      array.push(promise);
    });
    return Promise.all(array);
  }
}
