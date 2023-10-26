import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { LocaleCompare } from 'src/app/common/tools/locale-compare';
import { GarbageVehicle } from 'src/app/network/model/garbage-station/garbage-vehicle.model';
import { GetGarbageVehiclesParams } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.params';
import { GarbageVehicleRequestService } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.service';
import { CollectionMapRouteDeviceListConverter } from './collection-map-route-query.converter';
import { CollectionMapRouteDevice } from './collection-map-route-query.model';

@Injectable()
export class CollectionMapRouteDeviceListBusiness
  implements IBusiness<GarbageVehicle[], CollectionMapRouteDevice[]>
{
  constructor(private service: GarbageVehicleRequestService) {}

  Converter = new CollectionMapRouteDeviceListConverter();

  async load(
    name?: string
  ): Promise<CollectionMapRouteDevice<GarbageVehicle>[]> {
    let data = await this.getData(name);
    let model = this.Converter.Convert(data);
    model = model.sort((a, b) => {
      return LocaleCompare.compare(b.name, a.name);
    });
    return model;
  }
  async getData(name?: string): Promise<GarbageVehicle[]> {
    let params = new GetGarbageVehiclesParams();
    params.Name = name;
    let paged = await this.service.list(params);
    return paged.Data;
  }
}
