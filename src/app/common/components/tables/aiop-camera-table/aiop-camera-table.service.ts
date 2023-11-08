import { Injectable } from '@angular/core';
import { AICameraRequestService } from 'src/app/network/request/ai-camera/ai-camera.service';
import { EncodeDeviceRequestService } from 'src/app/network/request/encode-device/encode-device.service';

@Injectable()
export class AiopCameraTableService {
  constructor(
    public camera: AICameraRequestService,
    public device: EncodeDeviceRequestService
  ) {}
}
