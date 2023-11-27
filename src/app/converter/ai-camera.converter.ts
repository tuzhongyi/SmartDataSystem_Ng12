import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { IConverter } from '../common/interfaces/converter.interface';
import { AICamera } from '../network/model/garbage-station/ai-camera.model';
import { EncodeDevice } from '../network/model/garbage-station/encode-device';
import { ResourceRequestService } from '../network/request/resources/resource.service';
import { AICameraModel } from '../view-model/ai-camera.model';

@Injectable({
  providedIn: 'root',
})
export class AICameraConverter implements IConverter<AICamera, AICameraModel> {
  constructor(private service: ResourceRequestService) {}
  Convert(source: AICamera, devices?: EncodeDevice[]): AICameraModel {
    let plain = instanceToPlain(source);
    let model = plainToInstance(AICameraModel, plain);
    model.EncodeDevice = new Promise((resolve) => {
      if (devices && devices.length > 0) {
        let device = devices.find((x) => x.Id === source.EncodeDeviceId);
        if (device) {
          resolve(device);
          return;
        }
      }
      this.service.encodeDevice.get(source.EncodeDeviceId).then((device) => {
        resolve(device);
      });
    });

    return model;
  }
}
