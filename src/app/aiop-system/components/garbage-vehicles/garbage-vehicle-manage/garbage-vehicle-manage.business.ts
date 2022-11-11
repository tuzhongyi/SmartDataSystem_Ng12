import { Injectable } from '@angular/core';
import {
  IBusiness,
  IDelete,
} from 'src/app/common/interfaces/bussiness.interface';
import { LocaleCompare } from 'src/app/common/tools/locale-compare';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageVehicleRequestService } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.service';
import { GarbageStationManageModel } from 'src/app/view-model/garbage-station-manage.model';
import { GarbageVehicleManageConverter } from './garbage-vehicle-manage.converter';
import { GarbageVehicleModel } from './garbage-vehicle-manage.model';

@Injectable()
export class GarbageVehicleManageBusiness
  implements
    IBusiness<PagedList<GarbageVehicle>, PagedList<GarbageVehicleModel>>,
    IDelete<GarbageVehicle>
{
  constructor(private vehicle: GarbageVehicleRequestService) {}
  delete(id: string): Promise<GarbageVehicle> {
    return this.vehicle.delete(id);
  }
  Converter = new GarbageVehicleManageConverter();
  async load(
    divisionId: string = '',
    condition: string = '',
    pageIndex: number = 1,
    pageSize: number = 9
  ) {
    let data = await this.getData(divisionId, condition, pageIndex, pageSize);

    // console.log(tmp)
    let model = this.Converter.Convert(data);

    model.Data = model.Data.sort((a, b) => {
      return LocaleCompare.compare(a.Name ?? '', b.Name ?? '');
    });

    return model;
  }
  async getData(
    divisionId: string = '',
    condition: string = '',
    pageIndex: number = 1,
    pageSize: number = 9
  ) {
    let params = new GetGarbageStationsParams();
    params.PageIndex = pageIndex;
    params.PageSize = pageSize;
    params.Name = condition;
    params.DivisionId = divisionId;
    return this.vehicle.list(params);
  }
}
