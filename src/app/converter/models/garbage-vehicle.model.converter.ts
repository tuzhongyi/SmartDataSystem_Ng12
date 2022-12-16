import { Injectable } from '@angular/core';
import { classToPlain, plainToClass } from 'class-transformer';

import { IConverter } from '../../common/interfaces/converter.interface';
import { GarbageVehicle } from '../../network/model/garbage-vehicle.model';
import { CollectionDivisionRequestService } from '../../network/request/garbage_vehicles/divisions/collection-division-request.service';
import { GarbageVehicleModel } from '../../network/view-model/garbage-vehicle.view-model';

@Injectable({
  providedIn: 'root',
})
export class GarbageVehicleModelConverter
  implements IConverter<GarbageVehicle, GarbageVehicleModel>
{
  constructor(private service: CollectionDivisionRequestService) {}
  Convert(source: GarbageVehicle, ...res: any[]): GarbageVehicleModel {
    let plain = classToPlain(source);
    let model = plainToClass(GarbageVehicleModel, plain);
    if (source.DivisionId) {
      model.Division = this.service.get(source.DivisionId);
    }
    return model;
  }
}
