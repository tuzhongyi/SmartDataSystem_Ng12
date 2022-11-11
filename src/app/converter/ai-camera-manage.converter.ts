import { Injectable } from '@angular/core';
import { Language } from '../common/tools/language';
import { AICamera } from '../network/model/ai-camera.model';
import { EncodeDevice } from '../network/model/encode-device';
import { EncodeDeviceRequestService } from '../network/request/encode-device/encode-device.service';
import { AICameraManageModel } from '../view-model/ai-camera-manage.model';
import {
  AbstractCommonModelConverter,
  AbstractCommonModelPromiseConverter,
} from './common-model.converter';

type AICameraManageSource = AICamera;

@Injectable({
  providedIn: 'root',
})
export class AICameraManageConverter extends AbstractCommonModelPromiseConverter<AICameraManageModel> {
  constructor(private _encodeDeviceRequest: EncodeDeviceRequestService) {
    super();
    this.init();
  }

  devices: EncodeDevice[] = [];

  async init() {
    let paged = await this._encodeDeviceRequest.list();
    this.devices = paged.Data;
  }

  Convert(source: AICameraManageSource) {
    if (source instanceof AICamera) {
      return this._fromAICamera(source);
    }
    throw new Error('Error');
  }

  private async _fromAICamera(item: AICamera) {
    // console.log(item)
    let model = new AICameraManageModel();
    model.Id = item.Id;
    model.Name = item.Name;
    model.CameraType = Language.CameraType(item.CameraType);
    model.CameraState = Language.CameraState(item.CameraState) || '-';
    let device = this.devices.find((x) => x.Id === item.EncodeDeviceId);
    if (!device) {
      device = await this._encodeDeviceRequest.get(item.EncodeDeviceId);
    }
    model.DeciveName = device.Name;
    model.Labels = item.Labels ?? [];
    return model;
  }

  private _listDevices() {
    return this._encodeDeviceRequest.list();
  }
}
