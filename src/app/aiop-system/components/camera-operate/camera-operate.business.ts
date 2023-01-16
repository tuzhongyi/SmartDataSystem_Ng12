import { Injectable } from '@angular/core';
import { AICamera } from 'src/app/network/model/ai-camera.model';
import { AICameraRequestService } from 'src/app/network/request/ai-camera/ai-camera.service';
import { EncodeDeviceRequestService } from 'src/app/network/request/encode-device/encode-device.service';
import { ResourceRequestService } from 'src/app/network/request/resources/resource.service';

@Injectable()
export class CameraOperateBusiness {
  constructor(
    private _AICameraRequest: AICameraRequestService,
    private _encodeDeviceRequest: EncodeDeviceRequestService,
    private _resourceRequest: ResourceRequestService
  ) {}

  listEncodeDevice() {
    return this._encodeDeviceRequest.list();
  }
  getAICamera(id: string) {
    return this._AICameraRequest.get(id);
  }
  createAICamera(camera: AICamera) {
    return this._AICameraRequest.create(camera);
  }
  updateAICamera(camera: AICamera) {
    return this._AICameraRequest.update(camera);
  }
  addResourceLabel(resourceId: string, labelId: string) {
    return this._resourceRequest.label.create(labelId, resourceId);
  }
  getResourceLabels(id: string) {
    return this._resourceRequest.label.array(id);
  }
}
