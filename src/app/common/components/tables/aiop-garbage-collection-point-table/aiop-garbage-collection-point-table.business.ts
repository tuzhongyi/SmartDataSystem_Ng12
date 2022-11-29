import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { GetCollectionPointsParams } from 'src/app/network/request/garbage_vehicles/collection-points/collection-points.params';
import { CollectionPointsRequestService } from 'src/app/network/request/garbage_vehicles/collection-points/collection-points.service';
import { PagedParams } from 'src/app/network/request/IParams.interface';

import { CollectionPoint } from 'src/app/network/model/collection-point.model';
import { PagedList } from 'src/app/network/model/page_list.model';

@Injectable()
export class AIOPGarbageCollectionPointTableBusiness
  implements IBusiness<PagedList<CollectionPoint>>
{
  constructor(private service: CollectionPointsRequestService) {}

  async load(
    paged: PagedParams,
    divisionId?: string,
    name?: string
  ): Promise<PagedList<CollectionPoint>> {
    return this.getData(paged, divisionId);
  }
  getData(
    paged: PagedParams,
    divisionId?: string,
    name?: string
  ): Promise<PagedList<CollectionPoint>> {
    let params = new GetCollectionPointsParams();
    params.PageIndex = paged.PageIndex;
    params.PageSize = paged.PageSize;
    if (divisionId) {
      params.DivisionIds = [divisionId];
    }
    if (name) {
      params.Name = name;
    }
    return this.service.list(params);
  }
}
