import { Injectable } from "@angular/core";
import { SRServer } from "src/app/network/model/sr-server";
import { SRServerRequestService } from "src/app/network/request/ai-sr-server/sr-server.service";

@Injectable()
export class SRServerOperateBusiness {
  constructor(private _srRequest: SRServerRequestService) {

  }
  async getServer(id: string) {
    return await this._srRequest.get(id)
  }
  async addServer(server: SRServer) {
    return await this._srRequest.create(server)
  }
}