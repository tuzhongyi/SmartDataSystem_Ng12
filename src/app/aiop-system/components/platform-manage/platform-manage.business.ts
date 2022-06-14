import { Injectable } from "@angular/core";
import { PlatformRequestSerivce } from "src/app/network/request/platform/platform.service";

@Injectable()
export class PlatformManageBusiness {
  constructor(private _platformRequest: PlatformRequestSerivce) {

  }
  async list() {
    let res = await this._platformRequest.list()
    console.log(res)
  }
}