import { Injectable } from '@angular/core';
import { IPEndPoint } from 'src/app/network/model/html2tcp/ip-end-point.model';
import { Http2TCPRequestService } from 'src/app/network/request/http2tcp/http2tcp-request.service';
import { AIGarbageStationDeviceSessionDeviceBusiness } from './ai-garbage-station-device-session-device.business';

@Injectable()
export class AIGarbageStationDeviceSessionManagerBusiness {
  constructor(
    public device: AIGarbageStationDeviceSessionDeviceBusiness,
    private service: Http2TCPRequestService
  ) {}

  load(id: string) {
    return this.service.local.device(id);
  }

  async session(id: string) {
    return this.service.get(id);
  }

  forwarding(id: string, data: IPEndPoint) {
    return this.service.forwarding.set(id, data);
  }
}
