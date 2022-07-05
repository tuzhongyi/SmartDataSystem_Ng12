import { Injectable } from "@angular/core";
import { Platform } from "src/app/network/model/platform.model";
import { PlatformRequestSerivce } from "src/app/network/request/platform/platform.service";

@Injectable()
export class PlatformOperateBusiness {
  constructor(private _platformRequest: PlatformRequestSerivce) {

  }
  async createPlatform(item: Platform) {
    return await this._platformRequest.create(item)
  }
  async setPlatform(item: Platform) {
    return await this._platformRequest.set(item)
  }
  async getProtocols() {
    return await this._platformRequest.protocol();

  }
  async getPlatform(id: string) {
    return await this._platformRequest.get(id)
  }
}