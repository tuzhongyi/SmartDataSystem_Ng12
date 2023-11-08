import { Injectable } from '@angular/core';
import { AICameraRequestService } from 'src/app/network/request/ai-camera/ai-camera.service';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';

@Injectable()
export class AIOPGarbageStationDetailsCamerasService {
  constructor(
    public aicamera: AICameraRequestService,
    public station: GarbageStationRequestService
  ) {}
}
