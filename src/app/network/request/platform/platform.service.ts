import { Injectable } from "@angular/core";
import { HowellAuthHttpService } from "../howell-auth-http.service";
import { PlatformModel } from 'src/app/network/model/platform.model';
import { GetPlatformsParams } from "./platforms-params";
import { AbstractService } from "src/app/business/Ibusiness";
import { Division } from "../../model/division.model";
import { BaseRequestService, BaseTypeRequestService } from "../base-request.service";
import { PlatformsUrl } from "../../url/aiop/platforms/platforms.url";
import { classToPlain } from "class-transformer";
@Injectable({
  providedIn: "root",
})
export class PlatformRequestSerivce extends AbstractService<PlatformModel> {
  private basic: BaseRequestService;
  private type: BaseTypeRequestService<PlatformModel>;

  constructor(_http: HowellAuthHttpService) {
    super();
    this.basic = new BaseRequestService(_http);
    this.type = this.basic.type(PlatformModel);
  }


  // create(data: PlatformModel): Promise<PlatformModel> {
  //   let url = PlatformsUrl.basic;
  //   return this.type.post(url, data);
  // }

  list(params: GetPlatformsParams = new GetPlatformsParams()) {

    let url = PlatformsUrl.list();
    let data = classToPlain(params);
    return this.type.paged(url, data);
  }

  get(id: string): Promise<PlatformModel> {
    let url = PlatformsUrl.item(id);
    return this.type.get(url);
  }

}
