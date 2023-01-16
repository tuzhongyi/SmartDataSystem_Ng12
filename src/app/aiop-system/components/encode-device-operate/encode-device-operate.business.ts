import { Injectable } from '@angular/core';
import { EncodeDevice } from 'src/app/network/model/encode-device';
import { EncodeDeviceRequestService } from 'src/app/network/request/encode-device/encode-device.service';
import { LabelRequestService } from 'src/app/network/request/label/label.service';
import { ResourceRequestService } from 'src/app/network/request/resources/resource.service';
import { BatchRequest } from 'src/app/network/request/resources/resources-params';

@Injectable()
export class EncodeDeviceOperateBusiness {
  constructor(
    private _encodeDeviceRequest: EncodeDeviceRequestService,
    private _resourceRequest: ResourceRequestService
  ) {}
  getProtocols() {
    return this._encodeDeviceRequest.protocol();
  }
  getEncodeDevice(id: string) {
    return this._encodeDeviceRequest.get(id);
  }
  createEncodeDevice(item: EncodeDevice) {
    return this._encodeDeviceRequest.create(item);
  }
  updateEncodeDevice(item: EncodeDevice) {
    return this._encodeDeviceRequest.update(item);
  }
  addResourceLabel(resourceId: string, labelId: string) {
    return this._resourceRequest.label.create(labelId, resourceId);
  }
  getResourceLabels(id: string) {
    return this._resourceRequest.label.array(id);
  }
}
