import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  IConverter,
  IPromiseConverter,
} from '../../../common/interfaces/converter.interface';
import { Language } from '../../../common/tools/language';
import { CameraAIEventRecord } from '../../../network/model/camera-ai-event-record.model';
import { Medium } from '../../../common/tools/medium';
import { AICameraEventsModel } from './ai-camera-events.model';
import {
  AbstractCommonModelConverter,
  AbstractCommonModelPromiseConverter,
} from '../../../converter/common-model.converter';
import { ResourceRequestService } from 'src/app/network/request/resources/resource.service';
import { AICameraRequestService } from 'src/app/network/request/ai-camera/ai-camera.service';

type AICameraEventsSource = CameraAIEventRecord;

@Injectable()
export class AICameraEventsConverter extends AbstractCommonModelConverter<AICameraEventsModel> {
  constructor(private _resourceRequest: AICameraRequestService) {
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
    model.ImageUrl = Medium.img(item.ImageUrl);
    model.AICameraId = item.ResourceId;

    model.RawData = item;
    return model;
  }
}
