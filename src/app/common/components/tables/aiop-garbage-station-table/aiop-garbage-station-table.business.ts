import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { AIOPGarbageStationTableArgs } from './aiop-garbage-station-table.model';
import { AIOPGarbageStationTableService } from './aiop-garbage-station-table.service';

@Injectable()
export class AIOPGarbageStationTableBusiness
  implements IBusiness<PagedList<GarbageStation>>
{
  constructor(private service: AIOPGarbageStationTableService) {}
  load(
    index: number,
    size: number,
    args: AIOPGarbageStationTableArgs
  ): Promise<PagedList<GarbageStation>> {
    let data = this.getData(index, size, args);
    return data;
  }
  getData(
    index: number,
    size: number,
    args: AIOPGarbageStationTableArgs
  ): Promise<PagedList<GarbageStation>> {
    let params = new GetGarbageStationsParams();
    params.PageIndex = index;
    params.PageSize = size;
    params.AncestorId = args.divisionId;
    params.Name = args.name;
    return this.service.station.list(params);
  }
}
