import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { GarbageVehicle } from 'src/app/network/model/garbage-station/garbage-vehicle.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetGarbageVehiclesParams } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.params';
import { GarbageVehicleRequestService } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.service';
import { AIOPGarbageVehicleTableArgs } from './aiop-garbage-vehicle-table.model';

@Injectable()
export class AIOPGarbageVehicleTableBusiness
  implements IBusiness<PagedList<GarbageVehicle>>
{
  constructor(private service: GarbageVehicleRequestService) {}
  load(
    index: number,
    size: number,
    args: AIOPGarbageVehicleTableArgs
  ): Promise<PagedList<GarbageVehicle>> {
    return this.getData(index, size, args);
  }
  getData(
    index: number,
    size: number,
    args: AIOPGarbageVehicleTableArgs
  ): Promise<PagedList<GarbageVehicle>> {
    let params = new GetGarbageVehiclesParams();
    params.PageIndex = index;
    params.PageSize = size;
    params.Name = args.name;
    params.DivisionId = args.divisionId;

    return this.service.list(params);
  }
}
