import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { CollectionTrashCan } from 'src/app/network/model/garbage-station/trash-can.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetTrashCansParams } from 'src/app/network/request/garbage_vehicles/collection-points/collection-points.params';
import { CollectionPointsRequestService } from 'src/app/network/request/garbage_vehicles/collection-points/collection-points.service';
import { PagedParams } from 'src/app/network/request/IParams.interface';

@Injectable()
export class AiopGarbageCollectionPointTrashCanTableBusiness
  implements IBusiness<PagedList<CollectionTrashCan>>
{
  constructor(private service: CollectionPointsRequestService) {}

  async load(
    paged: PagedParams,
    divisionId?: string,
    name?: string
  ): Promise<PagedList<CollectionTrashCan>> {
    return this.getData(paged, divisionId);
  }
  getData(
    paged: PagedParams,
    divisionId?: string,
    name?: string
  ): Promise<PagedList<CollectionTrashCan>> {
    let params = new GetTrashCansParams();
    params.PageIndex = paged.PageIndex;
    params.PageSize = paged.PageSize;
    if (divisionId) {
      params.DivisionIds = [divisionId];
    }
    if (name) {
      params.Name = name;
    }
    return this.service.trashCan.list(params);
  }
}
