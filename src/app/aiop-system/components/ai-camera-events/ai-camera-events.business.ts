import { Injectable } from "@angular/core";
import { LocaleCompare } from "src/app/common/tools/locale-compare";
import { Time } from "src/app/common/tools/time";
import { AICameraEventsConverter } from "src/app/converter/ai-camera-events.converter";
import { EventType } from "src/app/enum/event-type.enum";
import { PagedList } from "src/app/network/model/page_list.model";
import { GetCameraAIEventRecordsParams } from "src/app/network/request/ai-camera-event/camera-ai-event.params";
import { CameraAIEventRequestService } from "src/app/network/request/ai-camera-event/camera-ai-event.service";
import { AIModelRequestService } from "src/app/network/request/ai-model/ai-model.service";
import { AICameraEventsModel } from "src/app/view-model/ai-camera-events.model";

@Injectable()
export class AICameraEventsBusiness {
  constructor(private _cameraAIEventRequest: CameraAIEventRequestService, private _cameraAIModelRequest: AIModelRequestService, private _converter: AICameraEventsConverter) {

  }

  async init(condition: string = '', beginTime: Date, endTime: Date, eventType: EventType, modelName: string, pageIndex: number = 1, pageSize: number = 9) {
    let params = new GetCameraAIEventRecordsParams();
    params.PageIndex = pageIndex;
    params.PageSize = pageSize;
    params.ResourceName = condition;

    params.BeginTime = Time.beginTime(beginTime);
    params.EndTime = Time.endTime(endTime);
    if (+eventType) {
      params.EventTypes = [eventType]
    }
    params.ModelName = modelName;


    let tmp = await this.listCameraAIEvents(params);

    console.log(tmp)
    let data = await this._converter.iterateToModel(tmp.Data);
    data = data.sort((a, b) => {
      return LocaleCompare.compare(a.EventTime, b.EventTime)
    })

    let res: PagedList<AICameraEventsModel> = {
      Page: tmp.Page,
      Data: data,
    };

    return res;

  }

  async listAIModels() {
    let res = await this._cameraAIModelRequest.list();
    return res.Data
  }
  async listCameraAIEvents(params: GetCameraAIEventRecordsParams) {
    return this._cameraAIEventRequest.list(params)
  }

}