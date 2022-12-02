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
  async download() {
    let data = (await this.service.excel()) as Blob;
    let url = window.URL.createObjectURL(data);
    let a = document.createElement('a');

    document.body.appendChild(a);
    a.href = url;
    a.click();
    a.download = '收运点信息';
    document.body.removeChild(a);
  }
  upload(buffer: ArrayBuffer) {
    return this.service.excel(buffer);
  }
  get(id: string): Promise<CollectionPoint> {
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
