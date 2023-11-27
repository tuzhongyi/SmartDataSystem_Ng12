import { Injectable } from '@angular/core';
import { Language } from '../common/tools/language';
import { AICamera } from '../network/model/garbage-station/ai-camera.model';
import { EncodeDevice } from '../network/model/garbage-station/encode-device';
import { ResourceRequestService } from '../network/request/resources/resource.service';
import { AICameraManageModel } from '../view-model/ai-camera-manage.model';
import { AbstractCommonModelPromiseConverter } from './common-model.converter';

type AICameraManageSource = AICamera;

@Injectable({
  providedIn: 'root',
})
export class AICameraManageConverter extends AbstractCommonModelPromiseConverter<AICameraManageModel> {
  constructor(private service: ResourceRequestService) {
    super();
    this.init();
  }

  devices: EncodeDevice[] = [];

  async init() {
    let paged = await this.service.encodeDevice.list();
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
      device = await this.service.encodeDevice.get(item.EncodeDeviceId);
    }
    model.DeciveName = device.Name;
    model.Labels = item.Labels ?? [];
    return model;
  }

  private _listDevices() {
    return this.service.encodeDevice.list();
  }
}
