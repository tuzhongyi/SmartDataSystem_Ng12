import { instanceToPlain } from 'class-transformer';
import { ResourceOnlineStatusRecord } from 'src/app/network/model/aiop/resource-online-status-record.model';
import { ResourcesUrl } from 'src/app/network/url/aiop/resources/resources.url';
import { HowellBaseRequestService } from '../../base-request-howell.service';
import { GetResourceOnlineStatusRecordsParams } from './resource-status.params';

export class ResourceStatusService {
  constructor(private basic: HowellBaseRequestService) {}
  private _online?: ResourceOnlineStatusService;
  public get online(): ResourceOnlineStatusService {
    if (!this._online) {
      this._online = new ResourceOnlineStatusService(this.basic);
    }
    return this._online;
  }
}

class ResourceOnlineStatusService {
  constructor(private basic: HowellBaseRequestService) {}
  private _record?: ResourceOnlineStatusRecordService;
  public get record(): ResourceOnlineStatusRecordService {
    if (!this._record) {
      this._record = new ResourceOnlineStatusRecordService(this.basic);
    }
    return this._record;
  }
}
class ResourceOnlineStatusRecordService {
  constructor(private basic: HowellBaseRequestService) {}

  list(params = new GetResourceOnlineStatusRecordsParams()) {
    let plain = instanceToPlain(params);
    let url = ResourcesUrl.onlineStatus().record().list();
    return this.basic.paged(url, ResourceOnlineStatusRecord, plain);
  }
}
