import { Injectable } from "@angular/core";
import { AbstractService } from "src/app/business/Ibusiness";
import { Region, RegionTree } from "../../model/region";
import { RegionsURL } from "../../url/aiop/regions/regions.url";
import { BaseRequestService, BaseTypeRequestService } from "../base-request.service";
import { HowellAuthHttpService } from "../howell-auth-http.service";
import { GetRegionsParams } from "./region.params";

@Injectable({
  providedIn: "root",
})
export class RegionRequestService {
  private basic: BaseRequestService;
  private type: BaseTypeRequestService<Region>;

  constructor(_http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(_http);
    this.type = this.basic.type(Region);
  }

  create(item: Region) {
    return this.type.post(RegionsURL.create(), item)
  }

  get(id: string): Promise<Region> {
    return this.type.get(RegionsURL.item(id));
  }

  set(item: Region) {

    return this.type.put(RegionsURL.item(item.Id), item)
  }

  delete(id: string) {
    return this.type.delete(RegionsURL.item(id));
  }

  list(params: GetRegionsParams = new GetRegionsParams()) {
    return this.type.paged(RegionsURL.list(), params);
  }
  trees(): Promise<RegionTree> {
    return this.basic.get(RegionsURL.trees(), RegionTree)
  }
}
