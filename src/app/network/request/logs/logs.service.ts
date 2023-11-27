import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { instanceToPlain } from 'class-transformer';
import { VideoOperationLog } from '../../model/garbage-station/log-operation-video.model';
import { LogsUrl } from '../../url/garbage/logs.url';
import { HowellBaseRequestService } from '../base-request-howell.service';
import { HowellAuthHttpService } from '../howell-auth-http.service';
import { GetOperationLogsParams } from './logs.params';

@Injectable({
  providedIn: 'root',
})
export class LogsRequestService {
  private basic: HowellBaseRequestService;

  constructor(http: HowellAuthHttpService, router: Router) {
    this.basic = new HowellBaseRequestService(http, router);
  }

  private _operation?: LogOperationService;
  public get operation(): LogOperationService {
    if (!this._operation) {
      this._operation = new LogOperationService(this.basic);
    }
    return this._operation;
  }
}

class LogOperationService {
  constructor(private basic: HowellBaseRequestService) {}
  list(params = new GetOperationLogsParams()) {
    let plain = instanceToPlain(params);
    let url = LogsUrl.operations().list();
    return this.basic.paged(url, VideoOperationLog, plain);
  }
}
