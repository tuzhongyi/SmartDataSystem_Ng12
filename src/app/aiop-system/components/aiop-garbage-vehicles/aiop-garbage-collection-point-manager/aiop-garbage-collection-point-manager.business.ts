import { Injectable } from '@angular/core';
import { CollectionPoint } from 'src/app/network/model/garbage-station/collection-point.model';
import { CollectionPointsRequestService } from 'src/app/network/request/garbage_vehicles/collection-points/collection-points.service';
import { IGarbageCollectionPointBusiness } from './aiop-garbage-collection-point-manager.model';

@Injectable()
export class AIOPGarbageCollectionPointManagerBusiness
  implements IGarbageCollectionPointBusiness
{
  constructor(private service: CollectionPointsRequestService) {}
  async download() {
    this.service.excel.get('收运点信息');
  }
  upload(buffer: ArrayBuffer) {
    return this.service.excel.post(buffer);
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
