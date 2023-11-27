import { Injectable } from '@angular/core';
import { Language } from '../../../common/tools/language';
import { Medium } from '../../../common/tools/medium';
import { AbstractCommonModelConverter } from '../../../converter/common-model.converter';
import { CameraAIEventRecord } from '../../../network/model/garbage-station/camera-ai-event-record.model';
import { AICameraEventsModel } from './ai-camera-events.model';

type AICameraEventsSource = CameraAIEventRecord;

@Injectable()
export class AICameraEventsConverter extends AbstractCommonModelConverter<AICameraEventsModel> {
  constructor() {
    super();
  }

  Convert(source: AICameraEventsSource) {
    if (source instanceof CameraAIEventRecord) {
      return this._fromCameraAIEventRecord(source);
    }
    throw new Error('Error');
  }
  private _fromCameraAIEventRecord(item: CameraAIEventRecord) {
    let model = new AICameraEventsModel();
    model.Id = item.EventId;
    model.EventType = Language.EventType(item.EventType);
    model.ModelName = item.Data.ModelName ?? '';
    model.ResourceType = Language.ResourceType(item.ResourceType!);
    model.ResourceName = item.ResourceName ?? "'";
    model.EventTime = item.EventTime;
    model.ImageUrl = Medium.jpg(item.ImageUrl);
    model.AsyncImageUrl = Medium.img(item.ImageUrl);
    model.AICameraId = item.ResourceId;

    model.RawData = item;
    return model;
  }
}
