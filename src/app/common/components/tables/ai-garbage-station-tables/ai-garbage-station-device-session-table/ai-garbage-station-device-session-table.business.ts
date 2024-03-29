import { Injectable } from '@angular/core';
import { Http2TCPRequestService } from 'src/app/network/request/http2tcp/http2tcp-request.service';

@Injectable()
export class AIGarbageStationDeviceTableBusiness {
  constructor(private service: Http2TCPRequestService) {}

  async load(id: string) {
    return this.getData(id);
  }

  private getData(id: string) {
    return this.service.local.device(id);
  }
}
