import { Injectable } from '@angular/core';
import { DeviceSession } from '../../model/html2tcp/device-session.model';
import { IPEndPoint } from '../../model/html2tcp/ip-end-point.model';
import { LocalDevice } from '../../model/html2tcp/local-device.model';
import { Http2TCPUrl } from '../../url/http2tcp/http2tcp.url';
import { BaseRequestService } from '../base-request.service';
import { HowellAuthHttpService } from '../howell-auth-http.service';

@Injectable({
  providedIn: 'root',
})
export class Http2TCPRequestService {
  constructor(http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(http);
  }

  private basic: BaseRequestService;

  array() {
    let url = Http2TCPUrl.device.session.basic();

    return this.basic.getArray(url, DeviceSession);
  }
  get(id: string) {
    let url = Http2TCPUrl.device.session.item(id);
    return this.basic.get(url, DeviceSession);
  }
  delete(id: string) {
    let url = Http2TCPUrl.device.session.item(id);
    return this.basic.delete(url, DeviceSession);
  }

  local = {
    device: (id: string) => {
      let url = Http2TCPUrl.device.session.localDevices(id);
      return this.basic.getArray(url, LocalDevice);
    },
  };

  forwarding = {
    get: (id: string) => {
      let url = Http2TCPUrl.device.session.forwarding(id);
      return this.basic.get(url, IPEndPoint);
    },
    set: (id: string, item: IPEndPoint) => {
      let url = Http2TCPUrl.device.session.forwarding(id);
      return this.basic.put(url, IPEndPoint, item);
    },
  };
}
