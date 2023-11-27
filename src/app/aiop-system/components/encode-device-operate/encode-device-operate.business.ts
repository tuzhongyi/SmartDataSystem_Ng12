import { Injectable } from '@angular/core';
import { EncodeDevice } from 'src/app/network/model/garbage-station/encode-device';
import { ResourceRequestService } from 'src/app/network/request/resources/resource.service';

@Injectable()
export class EncodeDeviceOperateBusiness {
  constructor(private service: ResourceRequestService) {}
  getProtocols() {
    return this.service.encodeDevice.protocols();
  }
  getEncodeDevice(id: string) {
    return this.service.encodeDevice.get(id);
  }
  createEncodeDevice(item: EncodeDevice) {
    return this.service.encodeDevice.create(item);
  }
  updateEncodeDevice(item: EncodeDevice) {
    return this.service.encodeDevice.update(item);
  }
  addResourceLabel(resourceId: string, labelId: string) {
    return this.service.label.binding(resourceId, labelId);
  }
  getResourceLabels(id: string) {
    return this.service.label.array(id);
  }
}
