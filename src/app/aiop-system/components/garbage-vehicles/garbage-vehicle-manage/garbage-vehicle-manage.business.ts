import { Injectable } from '@angular/core';
import { LocaleCompare } from 'src/app/common/tools/locale-compare';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';

import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageVehicleRequestService } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.service';

import { GarbageVehicleManageConverter } from './garbage-vehicle-manage.converter';
import { IGarbageVehicleManageBusiness } from './garbage-vehicle-manage.model';

@Injectable()
export class GarbageVehicleManageBusiness
  implements IGarbageVehicleManageBusiness
{
  constructor(private service: GarbageVehicleRequestService) {}
  create(model: GarbageVehicle, divisionId: string): Promise<GarbageVehicle> {
    model.DivisionId = divisionId;
    return this.service.create(model);
  }
  update(model: GarbageVehicle): Promise<GarbageVehicle> {
    return this.service.update(model);
  }
  delete(id: string): Promise<GarbageVehicle> {
    return this.service.delete(id);
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
      return LocaleCompare.compare(a.Name, b.Name, true);
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
    return this.service.list(params);
  }
}
