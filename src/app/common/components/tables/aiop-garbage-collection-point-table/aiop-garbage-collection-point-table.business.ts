import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { GetCollectionPointsParams } from 'src/app/network/request/garbage_vehicles/collection-points/collection-points.params';
import { CollectionPointsRequestService } from 'src/app/network/request/garbage_vehicles/collection-points/collection-points.service';
import { PagedParams } from 'src/app/network/request/IParams.interface';

import { CollectionPoint } from 'src/app/network/model/garbage-station/collection-point.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';
import { CollectionDivisionRequestService } from 'src/app/network/request/garbage_vehicles/divisions/collection-division-request.service';
import { AIOPGarbageCollectionPointTableArgs } from './aiop-garbage-collection-point-table.model';

@Injectable()
export class AIOPGarbageCollectionPointTableBusiness
  implements IBusiness<PagedList<CollectionPoint>>
{
  constructor(
    private service: CollectionPointsRequestService,
    private division: CollectionDivisionRequestService
  ) {}

  async load(
    paged: PagedParams,
    args: AIOPGarbageCollectionPointTableArgs
  ): Promise<PagedList<CollectionPoint>> {
    return this.getData(paged, args);
  }
  async getData(
    paged: PagedParams,
    args: AIOPGarbageCollectionPointTableArgs
  ): Promise<PagedList<CollectionPoint>> {
    let params = new GetCollectionPointsParams();
    params.PageIndex = paged.PageIndex;
    params.PageSize = paged.PageSize;
    if (args.divisionId) {
      let divisions = await this.divisions(args.divisionId);
      if (divisions.length > 0) {
        params.DivisionIds = divisions.map((x) => x.Id);
      } else {
        params.DivisionIds = [args.divisionId];
      }
    }
    if (args.name) {
      params.Name = args.name;
    }
    return this.service.list(params);
  }

  async divisions(divisionId: string) {
    let params = new GetDivisionsParams();
    params.AncestorId = divisionId;
    let paged = await this.division.cache.list(params);
    return paged.Data;
  }
}
