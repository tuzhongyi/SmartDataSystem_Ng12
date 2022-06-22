import { Injectable } from "@angular/core";
import { Platform } from "src/app/network/model/platform.model";
import { PlatformRequestSerivce } from "src/app/network/request/platform/platform.service";

@Injectable()
export class PlatformOperateBusiness {
  constructor(private _platformRequest: PlatformRequestSerivce) {

  }
  async addPlatform(model: Platform) {
    return await this._platformRequest.create(model)
  }
  async updatePlatform(model: Platform) {
    return await this._platformRequest.set(model)
  }
  async getProtocols() {
    return await this._platformRequest.protocol();

  }
  async getPlatform(id: string) {
    return await this._platformRequest.get(id)
  }
}