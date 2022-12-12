import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { GarbageVehicleModelConverter } from 'src/app/converter/models/garbage-vehicle.model.converter';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { GarbageVehicleModel } from 'src/app/network/view-model/garbage-vehicle.view-model';

@Injectable()
export class CollectionMapRouteVideoBusiness
  implements IBusiness<GarbageVehicle, GarbageVehicleModel>
{
  constructor(private converter: GarbageVehicleModelConverter) {}

  async load(vehicle: GarbageVehicle): Promise<GarbageVehicleModel> {
    return this.converter.Convert(vehicle);
  }
  getData(...args: any): Promise<GarbageVehicle> {
    throw new Error('Method not implemented.');
  }
}
