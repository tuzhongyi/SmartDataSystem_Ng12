import { Injectable } from '@angular/core';
import { LocaleCompare } from 'src/app/common/tools/locale-compare';
import { AICameraEventsConverter } from 'src/app/aiop-system/components/ai-camera-events/ai-camera-events.converter';
import { EventType } from 'src/app/enum/event-type.enum';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetCameraAIEventRecordsParams } from 'src/app/network/request/ai-camera-event/camera-ai-event.params';
import { CameraAIEventRequestService } from 'src/app/network/request/ai-camera-event/camera-ai-event.service';
import { AIModelRequestService } from 'src/app/network/request/ai-model/ai-model.service';
import {
  AICameraEventsModel,
  AICameraEventsSearchInfo,
} from 'src/app/aiop-system/components/ai-camera-events/ai-camera-events.model';
import { AICameraRequestService } from 'src/app/network/request/ai-camera/ai-camera.service';

@Injectable()
export class AICameraEventsBusiness {
  constructor(
    private _cameraAIEventRequest: CameraAIEventRequestService,
    private _aiCameraRequest: AICameraRequestService,
    private _cameraAIModelRequest: AIModelRequestService,
    private _converter: AICameraEventsConverter
  ) {}

  async init(searchInfo: AICameraEventsSearchInfo) {
    let { Data, Page } = await this._listCameraAIEvents(searchInfo);

    // console.log(Data);

    let data = await this._converter.iterateToModel(Data);
    data = data.sort((a, b) => {
      return LocaleCompare.compare(a.EventTime, b.EventTime, true);
    });

    let res: PagedList<AICameraEventsModel> = {
      Page: Page,
      Data: data,
    };

    return res;
  }

  listAIModels() {
    return this._cameraAIModelRequest.list();
  }
  getAICamera(id: string) {
    return this._aiCameraRequest.get(id);
  }

  private async _listCameraAIEvents(searchInfo: AICameraEventsSearchInfo) {
    let params = new GetCameraAIEventRecordsParams();
    params.PageIndex = searchInfo.PageIndex;
    params.PageSize = searchInfo.PageSize;
    params.BeginTime = searchInfo.BeginTime;
    params.EndTime = searchInfo.EndTime;

    if (!searchInfo.Filter) {
      params.ResourceName = searchInfo.Condition;
    } else {
      if (+searchInfo.EventType) {
        params.EventTypes = [searchInfo.EventType];
      }
      params.ModelName = searchInfo.ModelName;
    }

    return this._cameraAIEventRequest.list(params);
  }
}
