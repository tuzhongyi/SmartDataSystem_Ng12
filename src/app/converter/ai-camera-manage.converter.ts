import { Injectable } from "@angular/core";
import { Language } from "../common/tools/language";
import { AICamera } from "../network/model/ai-camera.model";
import { EncodeDevice } from "../network/model/encode-device";
import { EncodeDeviceRequestService } from "../network/request/encode-device/encode-device.service";
import { AICameraManageModel } from "../view-model/ai-camera-manage.model";
import { CommonModelConverter } from "./common-model.converter";

type AICameraManageSource = AICamera;


@Injectable({
  providedIn: "root"
})
export class AICameraManageConverter extends CommonModelConverter<AICameraManageModel> {

  private _encodeDevicesMap: Map<string, EncodeDevice> = new Map();


  constructor(private _encodeDeviceRequest: EncodeDeviceRequestService,) {
    super();
    this._init();
  }

  private async _init() {
    let devices = (await this._listDevices()).Data
    devices.forEach(device => this._encodeDevicesMap.set(device.Id, device))
  }
  Convert(source: AICameraManageSource) {
    if (source instanceof AICamera) {
      return this._fromAICamera(source)
    }
    throw new Error('Error');
  }

  private _fromAICamera(item: AICamera) {
    let model = new AICameraManageModel();
    model.Id = item.Id;
    model.Name = item.Name;
    model.CameraType = Language.CameraType(item.CameraType);
    model.CameraState = Language.CameraState(item.CameraState) || "-"
    model.DeciveName = this._encodeDevicesMap.get(item.EncodeDeviceId)?.Name ?? "";
    model.Labels = item.Labels ?? [];
    return model
  }

  private _listDevices() {
    return this._encodeDeviceRequest.list();
  }
}
