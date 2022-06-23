import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { IConverter, IPromiseConverter } from "../common/interfaces/converter.interface";
import { Language } from "../common/tools/language";
import { CameraAIEventRecord } from "../network/model/camera-ai-event-record.model";
import { Medium } from "../common/tools/medium";
import { AICameraEventsModel } from "../view-model/ai-camera-events.model";

type AICameraEventsSource = CameraAIEventRecord;

@Injectable({
  providedIn: 'root'
})
export class AICameraEventsConverter implements IPromiseConverter<AICameraEventsSource, AICameraEventsModel>{
  constructor(private _datePipe: DatePipe,) { }

  async Convert(source: AICameraEventsSource) {
    if (source instanceof CameraAIEventRecord) {
      return this._fromCameraAIEventRecord(source)
    }
    throw new Error('Error');
  }
  async iterateToModel<T extends Array<AICameraEventsSource>>(data: T) {
    let res: Array<AICameraEventsModel> = [];

    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      const model = await this.Convert(item);
      res.push(model)
    }

    return res;
  }
  private async _fromCameraAIEventRecord(item: CameraAIEventRecord) {
    let model = new AICameraEventsModel();
    model.EventId = item.EventId;
    model.EventType = Language.EventType(item.EventType)
    model.ModelName = item.Data.ModelName ?? "";
    model.ResourceType = Language.ResourceType(item.ResourceType!);
    model.ResourceName = item.ResourceName ?? "'";
    model.EventTime = this._datePipe.transform(
      item.EventTime,
      "yyyy-MM-dd HH:mm:ss"
    ) ?? '';
    model.ImageUrl = await Medium.img(item.ImageUrl)
    return model;
  }
}