import { Injectable } from "@angular/core";
import { SRServerRequestService } from "src/app/network/request/ai-sr-server/sr-server.service";

@Injectable()
export class SRServerManageBusiness {
  constructor(private _srRequest: SRServerRequestService) {

  }
  async loadData() {
    return await this._srRequest.list();
  }
  async sync(id: string) {
    return await this._srRequest.sync(id)
  }
  async delete(id: string) {
    return await this._srRequest.delete(id)
  }
}