import { EventEmitter, Injectable } from '@angular/core';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { CollectionTrashCan } from 'src/app/network/model/trash-can.model';
import { CollectionPointsRequestService } from 'src/app/network/request/garbage_vehicles/collection-points/collection-points.service';
import { IGarbageCollectionPointTrashCanManagerBusiness } from './garbage-collection-point-trashcan-manager.model';

@Injectable()
export class GarbageCollectionPointTrashCanManagerBusiness
  implements IGarbageCollectionPointTrashCanManagerBusiness
{
  constructor(private service: CollectionPointsRequestService) {}
  async download(...args: any[]) {
    let data = (await this.service.trashCan.excel()) as Blob;
    let url = window.URL.createObjectURL(data);
    let a = document.createElement('a');

    document.body.appendChild(a);
    a.href = url;
    a.click();
    a.download = '垃圾桶信息';
    document.body.removeChild(a);
  }

  upload(data: any) {
    return this.service.trashCan.excel(data);
  }
  get(id: string): Promise<CollectionTrashCan> {
    return this.service.trashCan.get(id);
  }
  create(model: CollectionTrashCan): Promise<CollectionTrashCan> {
    return this.service.trashCan.create(model);
  }
  update(model: CollectionTrashCan): Promise<CollectionTrashCan> {
    return this.service.trashCan.update(model);
  }
  delete(ids: string[]): Promise<CollectionTrashCan[]> {
    let array = new Array<Promise<CollectionTrashCan>>();
    ids.forEach((x) => {
      let promise = this.service.trashCan.delete(x);
      array.push(promise);
    });
    return Promise.all(array);
  }
}