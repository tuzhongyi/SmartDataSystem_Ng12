import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { instanceToPlain } from 'class-transformer';
import { GCHAAccessServer } from '../../model/gcha/gcha-access-server.model';
import { GCHADeviceInfo } from '../../model/gcha/gcha-device-info.model';
import { GCHADeviceRegister } from '../../model/gcha/gcha-device-register.model';
import { GCHADeviceRegistration } from '../../model/gcha/gcha-device-registration.model';
import { GCHAEventRecord } from '../../model/gcha/gcha-event-record.model';
import { GCHAUrl } from '../../url/gcha/gcha.url';
import { BaseRequestService } from '../base-request.service';
import { HowellAuthHttpService } from '../howell-auth-http.service';
import { GetDeviceRegistrationListParams } from './gcha-request.params';

@Injectable({
  providedIn: 'root',
})
export class GCHARequestService {
  private basic: BaseRequestService;
  constructor(private http: HowellAuthHttpService, router: Router) {
    this.basic = new BaseRequestService(http);
  }

  access = {
    server: () => {
      let url = GCHAUrl.access.server();
      return this.basic.getArray(url, GCHAAccessServer);
    },
  };

  private _device?: GCHADeviceRequestService;
  public get device(): GCHADeviceRequestService {
    if (!this._device) {
      this._device = new GCHADeviceRequestService(this.basic);
    }
    return this._device;
  }
}

class GCHADeviceRequestService {
  constructor(private basic: BaseRequestService) {}

  register() {
    let url = GCHAUrl.device.register();
    return this.basic.post(url, GCHADeviceRegister);
  }

  event = {
    record: (key: string, data: GCHAEventRecord) => {
      let url = GCHAUrl.device.event.record(key);
      let plain = instanceToPlain(data);
      return this.basic.postReturnString(url, plain);
    },
  };

  private _registration?: GCHADeviceRegistrationRequestService;
  public get registration(): GCHADeviceRegistrationRequestService {
    if (!this._registration) {
      this._registration = new GCHADeviceRegistrationRequestService(this.basic);
    }
    return this._registration;
  }

  private _information?: GCHADeviceInformationRequestService;
  public get information(): GCHADeviceInformationRequestService {
    if (!this._information) {
      this._information = new GCHADeviceInformationRequestService(this.basic);
    }
    return this._information;
  }

  private _configuration?: GCHADeviceConfigurationRequestService;
  public get configuration(): GCHADeviceConfigurationRequestService {
    if (!this._configuration) {
      this._configuration = new GCHADeviceConfigurationRequestService(
        this.basic
      );
    }
    return this._configuration;
  }
}

class GCHADeviceRegistrationRequestService {
  constructor(private basic: BaseRequestService) {}

  list(parmas: GetDeviceRegistrationListParams) {
    let url = GCHAUrl.device.registrations();
    let plain = instanceToPlain(parmas);

    return this.basic.paged(url, GCHADeviceRegistration, plain);
  }

  get(key: string) {
    let url = GCHAUrl.device.registrations(key);
    return this.basic.get(url, GCHADeviceRegistration);
  }
}
class GCHADeviceInformationRequestService {
  constructor(private basic: BaseRequestService) {}

  get(key: string) {
    let url = GCHAUrl.device.information(key);
    return this.basic.get(url, GCHADeviceInfo);
  }

  update(data: GCHADeviceInfo): Promise<GCHADeviceInfo> {
    let url = GCHAUrl.device.information(data.Id);
    let plain = instanceToPlain(data);
    return this.basic.put<GCHADeviceInfo>(url, GCHADeviceInfo, plain);
  }
}
class GCHADeviceConfigurationRequestService {
  constructor(private basic: BaseRequestService) {}

  get(key: string) {
    let url = GCHAUrl.device.configuration(key);
    return this.basic.http.getString(url).toPromise();
  }

  update(key: string, data: string): Promise<string> {
    let url = GCHAUrl.device.configuration(key);
    return this.basic.http.put(url, data).toPromise();
  }
}
