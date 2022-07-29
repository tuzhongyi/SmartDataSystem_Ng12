import { Injectable } from "@angular/core";
import { Language } from "../common/tools/language";
import { AICamera } from "../network/model/ai-camera.model";
import { EncodeDevice } from "../network/model/encode-device";
import { EncodeDeviceRequestService } from "../network/request/encode-device/encode-device.service";
import { AICameraManageModel } from "../view-model/ai-camera-manage.model";
import { CommonModelConverter, CommonModelPromiseConverter } from "./common-model.converter";

type AICameraManageSource = AICamera;


@Injectable({
  providedIn: "root"
})
export class AICameraManageConverter extends CommonModelPromiseConverter<AICameraManageModel> {

  private _encodeDevicesMap: Map<string, EncodeDevice> = new Map();


  constructor(private _encodeDeviceRequest: EncodeDeviceRequestService,) {
    super();
  }

  Convert(source: AICameraManageSource) {
    if (source instanceof AICamera) {
      return this._fromAICamera(source)
    }
    throw new Error('Error');
  }

  private async _fromAICamera(item: AICamera) {
    console.log(item)
    let model = new AICameraManageModel();
    model.Id = item.Id;
    model.Name = item.Name;
    model.CameraType = Language.CameraType(item.CameraType);
    model.CameraState = Language.CameraState(item.CameraState) || "-";
    let { Name } = await this._encodeDeviceRequest.get(item.EncodeDeviceId);
    model.DeciveName = Name;
    model.Labels = item.Labels ?? [];
    return model
  }

  private _listDevices() {
    return this._encodeDeviceRequest.list();
  }
}
