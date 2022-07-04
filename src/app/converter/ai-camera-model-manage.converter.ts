import { Injectable } from "@angular/core";
import { IConverter } from "../common/interfaces/converter.interface";
import { OnlineStatus } from "../enum/online-status.enum";
import { AICamera } from "../network/model/ai-camera.model";
import { AICameraRequestService } from "../network/request/ai-camera/ai-camera.service";
import { AICameraModelManageModel } from "../view-model/ai-camera-model-manage.model";
import { AIModelManageModel } from "../view-model/ai-model-manage.model";

type AICameraModelManageSource = AICamera

@Injectable({
  providedIn: "root"
})
export class AICameraModelManageConverter implements IConverter<AICameraModelManageSource, AICameraModelManageModel> {
  constructor(private _cameraRequest: AICameraRequestService) {

  }
  Convert(source: AICameraModelManageSource) {
    if (source instanceof AICamera) {
      return this._fromAICamera(source)
    }
    throw new Error('Error');
  }
  iterateToModel<T extends Array<AICameraModelManageSource>>(data: T) {
    let res: Array<AICameraModelManageModel> = [];

    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      const model = this.Convert(item);
      res.push(model)
    }

    return res;
  }

  private _fromAICamera(item: AICamera) {
    let model = new AICameraModelManageModel();
    model.CameraId = item.Id;
    model.CameraName = item.Name;
    model.OnlineStatus = item.OnlineStatus ?? OnlineStatus.Offline;
    model.AIModels = [];
    return model
  }
}