import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { VehicleCameraModelConverter } from 'src/app/converter/models/vehicle-camera.model.converter';
import { PagedList } from 'src/app/network/model/page_list.model';
import { VehicleCamera } from 'src/app/network/model/vehicle-camera.model';
import { GetGarbageVehicleCamerasParams } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.params';
import { GarbageVehicleRequestService } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.service';
import { PagedParams } from 'src/app/network/request/IParams.interface';
import { VehicleCameraModel } from 'src/app/network/view-model/vehicle-camera.view-model';

@Injectable()
export class AiopGarbageVehicleCameraTableTableBusiness
  implements IBusiness<PagedList<VehicleCamera>, PagedList<VehicleCameraModel>>
{
  constructor(
    private service: GarbageVehicleRequestService,
    private converter: VehicleCameraModelConverter
  ) {}
  async load(
    index: number,
    size: number,
    divisionId?: string,
    name?: string
  ): Promise<PagedList<VehicleCameraModel>> {
    let page = new PagedParams();
    page.PageIndex = index;
    page.PageSize = size;

    let data = await this.getData(page, divisionId, name);

    let paged = new PagedList<VehicleCameraModel>();

    paged.Page = data.Page;
    paged.Data = data.Data.map((x) => {
      return this.converter.Convert(x);
    });

    return paged;
  }
  getData(
    paged: PagedParams,
    divisionId?: string,
    name?: string
  ): Promise<PagedList<VehicleCamera>> {
    let params = new GetGarbageVehicleCamerasParams();
    params.PageIndex = paged.PageIndex;
    params.PageSize = paged.PageSize;
    if (divisionId) {
      params.DivisionIds = [divisionId];
    }
    params.Name = name;
    return this.service.camera.list(params);
  }
}
