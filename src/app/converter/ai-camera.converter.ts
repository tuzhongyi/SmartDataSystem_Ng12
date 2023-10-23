import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { IConverter } from '../common/interfaces/converter.interface';
import { AICamera } from '../network/model/ai-camera.model';
import { EncodeDeviceRequestService } from '../network/request/encode-device/encode-device.service';
import { AICameraModel } from '../view-model/ai-camera.model';

@Injectable({
  providedIn: 'root',
})
export class AICameraConverter implements IConverter<AICamera, AICameraModel> {
  constructor(private service: EncodeDeviceRequestService) {}
  Convert(source: AICamera, ...res: any[]): AICameraModel {
    let plain = instanceToPlain(source);
    let model = plainToInstance(AICameraModel, plain);
    model.EncodeDevice = this.service.get(source.EncodeDeviceId);
    return model;
  }
}