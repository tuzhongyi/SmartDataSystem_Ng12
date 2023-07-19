import { Injectable } from '@angular/core';
import { AIGarbageDevicesRequestService } from './garbage-device.service';
import { AIGarbageRegionsRequestService } from './region.service';
import { AIGarbageRfidRequestService } from './rfid.service';

@Injectable({
  providedIn: 'root',
})
export class AIGarbageRequestService {
  constructor(
    public device: AIGarbageDevicesRequestService,
    public rfid: AIGarbageRfidRequestService,
    public region: AIGarbageRegionsRequestService
  ) {}
}
