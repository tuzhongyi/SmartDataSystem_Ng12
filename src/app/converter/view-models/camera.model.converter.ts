import { Injectable } from '@angular/core';
import {
  ClassConstructor,
  instanceToPlain,
  plainToInstance,
} from 'class-transformer';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { Camera } from 'src/app/network/model/garbage-station/camera.model';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { CameraModel } from 'src/app/view-model/camera-model';
import { GarbageStationModelConverter } from './garbage-station.model.converter';
@Injectable({
  providedIn: 'root',
})
export class CameraModelConverter implements IConverter<Camera, CameraModel> {
  constructor(
    private service: GarbageStationRequestService,
    private converter: GarbageStationModelConverter
  ) {}

  Convert<T extends CameraModel = CameraModel>(
    source: Camera,
    cls?: ClassConstructor<T>
  ): T {
    let plain = instanceToPlain(source);
    let type = CameraModel;
    if (cls) {
      (type as any) = cls;
    }
    let model = plainToInstance(type, plain);
    model.GarbageStation = this.service.cache
      .get(source.GarbageStationId)
      .then((x) => {
        return this.converter.Convert(x);
      });
    return model as any;
  }
}
