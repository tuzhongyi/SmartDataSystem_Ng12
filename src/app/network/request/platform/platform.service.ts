import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from 'src/app/network/model/garbage-station/platform.model';
import { Protocol } from '../../model/garbage-station/protocol.model';
import { PlatformsURL } from '../../url/aiop/platforms/platforms.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../base-request-howell.service';
import { HowellAuthHttpService } from '../howell-auth-http.service';
import { GetPlatformsParams } from './platforms.params';
@Injectable({
  providedIn: 'root',
})
export class PlatformRequestSerivce {
  private basic: HowellBaseRequestService;
  private type: HowellBaseTypeRequestService<Platform>;

  constructor(http: HowellAuthHttpService, router: Router) {
    this.basic = new HowellBaseRequestService(http, router);
    this.type = this.basic.type(Platform);
  }

  create(item: Platform) {
    return this.type.post(PlatformsURL.create(), item);
  }

  list(params: GetPlatformsParams = new GetPlatformsParams()) {
    return this.type.paged(PlatformsURL.list(), params);
  }

  get(id: string): Promise<Platform> {
    return this.type.get(PlatformsURL.item(id));
  }

  set(item: Platform) {
    return this.type.put(PlatformsURL.item(item.Id), item);
  }

  delete(id: string) {
    return this.type.delete(PlatformsURL.item(id));
  }
  protocol(): Promise<any> {
    return this.basic.get(PlatformsURL.protocols(), Protocol);
  }
  sync(id: string) {
    return this.type.post(PlatformsURL.sync(id));
  }
}
