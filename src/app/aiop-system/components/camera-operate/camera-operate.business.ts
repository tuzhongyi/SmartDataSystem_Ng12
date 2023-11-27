import { Injectable } from '@angular/core';
import { AICamera } from 'src/app/network/model/garbage-station/ai-camera.model';
import { ResourceRequestService } from 'src/app/network/request/resources/resource.service';

@Injectable()
export class CameraOperateBusiness {
  constructor(private service: ResourceRequestService) {}

  listEncodeDevice() {
    return this.service.encodeDevice.list();
  }
  getAICamera(id: string) {
    return this.service.camera.get(id);
  }
  createAICamera(camera: AICamera) {
    return this.service.camera.create(camera);
  }
  updateAICamera(camera: AICamera) {
    return this.service.camera.update(camera);
  }
  addResourceLabel(resourceId: string, labelId: string) {
    return this.service.label.binding(resourceId, labelId);
  }
  getResourceLabels(id: string) {
    return this.service.label.array(id);
  }
}
