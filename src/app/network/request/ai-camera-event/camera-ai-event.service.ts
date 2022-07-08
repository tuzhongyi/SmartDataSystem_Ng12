import { Injectable } from "@angular/core";
import { CameraAIEventRecord } from "../../model/camera-ai-event-record.model";
import { CameraAIUrl } from "../../url/aiop/events/records/camera-ai/camera-ai.url";
import { BaseRequestService, BaseTypeRequestService } from "../base-request.service";
import { HowellAuthHttpService } from "../howell-auth-http.service";
import { GetCameraAIEventRecordsParams } from "./camera-ai-event.params";

@Injectable({
  providedIn: 'root'
})
export class CameraAIEventRequestService {

  private basic: BaseRequestService;
  private type: BaseTypeRequestService<CameraAIEventRecord>;


  constructor(_http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(_http);
    this.type = this.basic.type(CameraAIEventRecord);
  }

  list(params: GetCameraAIEventRecordsParams = new GetCameraAIEventRecordsParams()) {
    return this.type.paged(CameraAIUrl.list(), params);
  }

  create(item: CameraAIEventRecord) {
    return this.type.post(CameraAIUrl.create(), item)
  }
}