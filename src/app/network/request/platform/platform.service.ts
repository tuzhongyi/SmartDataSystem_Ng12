import { Injectable } from '@angular/core';
import { HowellAuthHttpService } from '../howell-auth-http.service';
import { Platform } from 'src/app/network/model/platform.model';
import { GetPlatformsParams } from './platforms.params';
import { AbstractService } from 'src/app/business/Ibusiness';
import {
  BaseRequestService,
  BaseTypeRequestService,
} from '../base-request.service';
import { PlatformsURL } from '../../url/aiop/platforms/platforms.url';
import { instanceToPlain } from 'class-transformer';
import { Protocol } from '../../model/protocol.model';
@Injectable({
  providedIn: 'root',
})
export class PlatformRequestSerivce {
  private basic: BaseRequestService;
  private type: BaseTypeRequestService<Platform>;

  constructor(_http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(_http);
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
