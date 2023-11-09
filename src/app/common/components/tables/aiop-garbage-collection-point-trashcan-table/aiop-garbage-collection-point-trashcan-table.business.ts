import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { CollectionTrashCan } from 'src/app/network/model/garbage-station/trash-can.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetTrashCansParams } from 'src/app/network/request/garbage_vehicles/collection-points/collection-points.params';
import { CollectionPointsRequestService } from 'src/app/network/request/garbage_vehicles/collection-points/collection-points.service';
import { PagedParams } from 'src/app/network/request/IParams.interface';
import { AiopGarbageCollectionPointTrashCanTableArgs } from './aiop-garbage-collection-point-trashcan-table.model';

@Injectable()
export class AiopGarbageCollectionPointTrashCanTableBusiness
  implements IBusiness<PagedList<CollectionTrashCan>>
{
  constructor(private service: CollectionPointsRequestService) {}

  async load(
    paged: PagedParams,
    args: AiopGarbageCollectionPointTrashCanTableArgs
  ): Promise<PagedList<CollectionTrashCan>> {
    return this.getData(paged, args);
  }
  getData(
    paged: PagedParams,
    args: AiopGarbageCollectionPointTrashCanTableArgs
  ): Promise<PagedList<CollectionTrashCan>> {
    let params = new GetTrashCansParams();
    params.PageIndex = paged.PageIndex;
    params.PageSize = paged.PageSize;
    if (args.divisionId) {
      params.DivisionIds = [args.divisionId];
    }
    if (args.name) {
      params.Name = args.name;
    }
    return this.service.trashCan.list(params);
  }
}
