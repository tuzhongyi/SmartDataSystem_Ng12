import { Injectable } from "@angular/core";
import { HowellAuthHttpService } from "../howell-auth-http.service";
import { HwPlatform } from 'src/app/network/model/platform.model';
import { GetPlatformsParams } from "./platforms-params";
import { AbstractService } from "src/app/business/Ibusiness";
import { BaseRequestService, BaseTypeRequestService } from "../base-request.service";
import { PlatformsURL } from "../../url/aiop/platforms/platforms.url";
import { classToPlain } from "class-transformer";
@Injectable({
  providedIn: "root",
})
export class PlatformRequestSerivce extends AbstractService<HwPlatform> {
  private basic: BaseRequestService;
  private type: BaseTypeRequestService<HwPlatform>;

  constructor(_http: HowellAuthHttpService) {
    super();
    this.basic = new BaseRequestService(_http);
    this.type = this.basic.type(HwPlatform);
  }


  create(item: HwPlatform) {
    return this.type.post(PlatformsURL.basic, item)
  }

  list(params: GetPlatformsParams = new GetPlatformsParams()) {
    return this.type.paged(PlatformsURL.list(), params);
  }

  get(id: string): Promise<HwPlatform> {
    return this.type.get(PlatformsURL.item(id));
  }

  set(item: HwPlatform) {
    return this.type.put(PlatformsURL.item(item.Id), item)
  }

  delete(id: string) {
    return this.type.delete(PlatformsURL.item(id))
  }
  protocol(): Promise<any> {
    return this.type.get(PlatformsURL.protocols());;
  }
  sync(id: string) {
    return this.type.post(PlatformsURL.sync(id))
  }
}
