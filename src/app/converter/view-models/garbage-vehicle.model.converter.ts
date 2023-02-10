import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { CollectionDivisionRequestService } from 'src/app/network/request/garbage_vehicles/divisions/collection-division-request.service';
import { GarbageVehicleModel } from 'src/app/network/view-model/garbage-vehicle.view-model';

@Injectable({
  providedIn: 'root',
})
export class GarbageVehicleModelConverter
  implements IConverter<GarbageVehicle, GarbageVehicleModel>
{
  constructor(private service: CollectionDivisionRequestService) {}
  Convert(source: GarbageVehicle, ...res: any[]): GarbageVehicleModel {
    let plain = instanceToPlain(source);
    let model = plainToInstance(GarbageVehicleModel, plain);
    if (source.DivisionId) {
      model.Division = this.service.get(source.DivisionId);
    }
    return model;
  }
}
