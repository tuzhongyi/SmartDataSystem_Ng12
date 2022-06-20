import { Injectable } from "@angular/core";
import { SRServer } from "src/app/network/model/sr-server";
import { SRRequestService } from "src/app/network/request/sr/sr-request.service";

@Injectable()
export class SRServerOperateBusiness {
  constructor(private _srRequest: SRRequestService) {

  }
  async getServer(id: string) {
    return await this._srRequest.get(id)
  }
  async addServer(server: SRServer) {
    return await this._srRequest.create(server)
  }
}