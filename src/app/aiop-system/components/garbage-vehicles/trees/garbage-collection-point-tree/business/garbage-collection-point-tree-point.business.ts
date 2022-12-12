import { Injectable } from '@angular/core';
import { GetCollectionPointsParams } from 'src/app/network/request/garbage_vehicles/collection-points/collection-points.params';
import { CollectionPointsRequestService } from 'src/app/network/request/garbage_vehicles/collection-points/collection-points.service';

@Injectable()
export class GarbageCollectionPointTreeSourceBusiness {
  constructor(private service: CollectionPointsRequestService) {}

  async getByDivisionId(divisionId: string) {
    let params = new GetCollectionPointsParams();
    params.DivisionIds = [divisionId];
    let paged = await this.service.list(params);
    return paged.Data;
  }
  async getByName(name?: string) {
    let params = new GetCollectionPointsParams();
    params.Name = name;
    let paged = await this.service.list(params);
    return paged.Data;
  }

  async all() {
    let paged = await this.service.list();
    return paged.Data;
  }
}
