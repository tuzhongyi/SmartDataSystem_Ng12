import { Injectable } from "@angular/core";
import { SRRequestService } from "src/app/network/request/sr/sr-request.service";

@Injectable()
export class SRServerManageBusiness {
  constructor(private _srRequest: SRRequestService) {

  }
  async loadData() {
    return await this._srRequest.list();
  }
}