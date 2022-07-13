import { Injectable } from "@angular/core";
import { EncodeDevice } from "src/app/network/model/encode-device";
import { EncodeDeviceRequestService } from "src/app/network/request/encode-device/encode-device.service";

@Injectable()
export class EncodeDeviceOperateBusiness {
  constructor(private _encodeDeviceRequest: EncodeDeviceRequestService) {

  }
  getProtocols() {
    return this._encodeDeviceRequest.protocol();

  }
  getEncodeDevice(id: string) {
    return this._encodeDeviceRequest.get(id)
  }
  createEncodeDevice(item: EncodeDevice) {
    return this._encodeDeviceRequest.create(item)
  }
  setEncodeDevice(item: EncodeDevice) {
    return this._encodeDeviceRequest.update(item)
  }

}