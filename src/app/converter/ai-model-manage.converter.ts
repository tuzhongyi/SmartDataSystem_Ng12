import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { CameraAIModel } from "../network/model/camera-ai.model";
import { IConverter } from "../common/interfaces/converter.interface";
import { AIModelManageModel } from "../view-model/ai-model-manage.model";
import Conf from "src/assets/json/ai-icon.json"

const imgBase = 'assets/img/ai-model';
const icons: any = Conf;

type AIModelManageSource = CameraAIModel;

@Injectable({
  providedIn: "root"
})
export class AIModelManageConverter implements IConverter<AIModelManageSource, AIModelManageModel>{
  constructor(private _datePipe: DatePipe) { }
  Convert(source: AIModelManageSource) {
    if (source instanceof CameraAIModel) {
      return this._fromCameraAIModel(source)
    }
    throw new Error('Error');
  }

  iterateToModel<T extends Array<AIModelManageSource>>(data: T) {
    let res: Array<AIModelManageModel> = [];

    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      const model = this.Convert(item);
      res.push(model)
    }

    return res;
  }
  private _fromCameraAIModel(item: CameraAIModel) {
    let model = new AIModelManageModel();
    model.Id = item.Id;
    model.ModelName = item.ModelName;
    model.ModelType = item.ModelType;
    model.TransformType = item.TransformType;
    model.Version = item.Version;
    model.LabelIcon = imgBase + "/" + icons[item.Label]
    model.UpdateTime = this._datePipe.transform(item.UpdateTime, 'yyyy-MM-dd hh:mm') ?? ""
    return model;
  }


}