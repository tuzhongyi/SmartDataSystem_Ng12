import { Injectable } from '@angular/core';
import {
  ClassConstructor,
  instanceToPlain,
  plainToInstance,
} from 'class-transformer';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GarbageStationModel } from 'src/app/view-model/garbage-station.model';
import { DivisionModelConverter } from './division.model.converter';

@Injectable({
  providedIn: 'root',
})
export class GarbageStationModelConverter
  implements IConverter<GarbageStation, GarbageStationModel>
{
  constructor(
    private service: DivisionRequestService,
    private converter: DivisionModelConverter
  ) {}
  Convert<T extends GarbageStationModel = GarbageStationModel>(
    source: GarbageStation,
    cls?: ClassConstructor<T>
  ): T {
    let plain = instanceToPlain(source);
    let type = GarbageStationModel;
    if (cls) {
      (type as any) = cls;
    }
    let model = plainToInstance(type, plain);
    if (model.DivisionId) {
      model.Division = this.service.cache.get(model.DivisionId).then((x) => {
        return this.converter.Convert(x);
      });
    }
    return model as any;
  }
}
