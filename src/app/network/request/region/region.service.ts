import { Injectable } from "@angular/core";
import { AbstractService } from "src/app/business/Ibusiness";
import { Region } from "../../model/region";
import { RegionsURL } from "../../url/aiop/regions/regions.url";
import { BaseRequestService, BaseTypeRequestService } from "../base-request.service";
import { HowellAuthHttpService } from "../howell-auth-http.service";
import { GetRegionsParams } from "./region-params";

@Injectable({
  providedIn: "root",
})
export class RegionRequestService extends AbstractService<Region> {
  private basic: BaseRequestService;
  private type: BaseTypeRequestService<Region>;

  constructor(_http: HowellAuthHttpService) {
    super();
    this.basic = new BaseRequestService(_http);
    this.type = this.basic.type(Region);
  }

  // create(item: Region) {
  //   return this.requestService.post<Region, HowellResponse<Region>>(
  //     AIOPRegionUrl.create(),
  //     SaveModel.toModel(item, SaveModel.formMustField.region)
  //   );
  // }

  // get(id: string) {
  //   return this.requestService.get<Region>(AIOPRegionUrl.get(id));
  // }

  // set(item: Region) {
  //   return this.requestService.put<Region, HowellResponse<Region>>(
  //     AIOPRegionUrl.edit(item.Id),
  //     SaveModel.toModel(item, SaveModel.formMustField.region)
  //   );
  // }

  // del(id: string) {
  //   return this.requestService.delete<Region>(AIOPRegionUrl.del(id));
  // }
  get(id: string): Promise<Region> {
    return this.type.get(RegionsURL.item(id));
  }

  list(params: GetRegionsParams = new GetRegionsParams()) {

    return this.type.paged(RegionsURL.list(), params);
  }
}
