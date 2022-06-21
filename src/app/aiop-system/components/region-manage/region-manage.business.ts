import { Injectable } from "@angular/core";
import { RegionRequestService } from "src/app/network/request/region/region.service";

@Injectable()
export class RegionManageBusiness {
  constructor(private _regionRequest: RegionRequestService) {

  }
  loadData() {
    return this._regionRequest.list()
  }
}