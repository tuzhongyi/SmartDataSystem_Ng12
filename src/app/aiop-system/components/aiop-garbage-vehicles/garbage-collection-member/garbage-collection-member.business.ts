import { Injectable } from '@angular/core';
import { CollectionMember } from 'src/app/network/model/garbage-station/member.model';
import { CollectionMemberRequsetService } from 'src/app/network/request/garbage_vehicles/collection-member/member-request.service';
import { IGarbageCollectionMemberBusiness } from './garbage-collection-member.model';

@Injectable()
export class GarbageCollectionMemberBusiness
  implements IGarbageCollectionMemberBusiness
{
  constructor(private service: CollectionMemberRequsetService) {}
  async download() {
    this.service.excel.get('人员信息');
  }

  upload(buffer: ArrayBuffer) {
    return this.service.excel.post(buffer);
  }
  get(id: string): Promise<CollectionMember> {
    return this.service.get(id);
  }
  create(model: CollectionMember): Promise<CollectionMember> {
    return this.service.create(model);
  }
  update(model: CollectionMember): Promise<CollectionMember> {
    return this.service.update(model);
  }
  delete(ids: string[]): Promise<CollectionMember[]> {
    let array = new Array<Promise<CollectionMember>>();
    ids.forEach((x) => {
      let promise = this.service.delete(x);
      array.push(promise);
    });
    return Promise.all(array);
  }
}
