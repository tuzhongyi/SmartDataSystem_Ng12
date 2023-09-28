import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CameraAIEventRecord } from '../../model/camera-ai-event-record.model';
import { CameraAIUrl } from '../../url/aiop/events/records/camera-ai/camera-ai.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../base-request-howell.service';
import { HowellAuthHttpService } from '../howell-auth-http.service';
import { GetCameraAIEventRecordsParams } from './camera-ai-event.params';

@Injectable({
  providedIn: 'root',
})
export class CameraAIEventRequestService {
  private basic: HowellBaseRequestService;
  private type: HowellBaseTypeRequestService<CameraAIEventRecord>;

  constructor(http: HowellAuthHttpService, router: Router) {
    this.basic = new HowellBaseRequestService(http, router);
    this.type = this.basic.type(CameraAIEventRecord);
  }

  list(
    params: GetCameraAIEventRecordsParams = new GetCameraAIEventRecordsParams()
  ) {
    return this.type.paged(CameraAIUrl.list(), params);
  }

  create(item: CameraAIEventRecord) {
    return this.type.post(CameraAIUrl.create(), item);
  }
}
