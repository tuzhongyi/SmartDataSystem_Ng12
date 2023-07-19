import { Injectable } from '@angular/core';
import { instanceToPlain } from 'class-transformer';
import { AIGarbageDeviceCommandRecord } from '../../model/ai-garbage/device-command-record.model';
import { AIGarbageDeviceEventRecord } from '../../model/ai-garbage/device-event-record.model';
import { AIGarbageDeviceLogRecord } from '../../model/ai-garbage/device-log-recprd.model';
import { AIGarbageDeviceCommand } from '../../model/ai-garbage/garbage-device-command.enum';
import { AIGarbageDevice } from '../../model/ai-garbage/garbage-device.model';
import { AIGarbageUrl } from '../../url/ai-garbage/ai-garbage.url';
import {
  BaseRequestService,
  BaseTypeRequestService,
} from '../base-request.service';
import { ExcelService } from '../excel.service';
import { HowellAuthHttpService } from '../howell-auth-http.service';
import {
  GetAIGarbageStationDeviceCommandRecordsParams,
  GetAIGarbageStationDeviceEventRecordsParams,
  GetAIGarbageStationDeviceLogRecordsParams,
  GetAIGarbageStationDevicesParams,
} from './ai-garbage.params';

@Injectable({
  providedIn: 'root',
})
export class AIGarbageDevicesRequestService {
  private basic: BaseRequestService;
  private type: BaseTypeRequestService<AIGarbageDevice>;
  constructor(private http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(http);
    this.type = this.basic.type(AIGarbageDevice);
    this.records = new AIGarbageDevicesRecordsRequestService(this.basic);
  }

  excel = new ExcelService(this.http, AIGarbageUrl.garbageDevices.excel());
  records: AIGarbageDevicesRecordsRequestService;

  create(item: AIGarbageDevice) {
    let url = AIGarbageUrl.garbageDevices.basic();
    return this.type.post(url, item);
  }
  get(id: string) {
    let url = AIGarbageUrl.garbageDevices.item(id);
    return this.type.get(url);
  }
  getByStation(stationId: string) {
    let params = new GetAIGarbageStationDevicesParams();
    params.PageIndex = 1;
    params.PageSize = 1;
    params.GarbageStationIds = [stationId];
    return this.list(params).then((paged) => {
      return paged.Data[0];
    });
  }
  update(item: AIGarbageDevice) {
    let url = AIGarbageUrl.garbageDevices.item(item.Id);
    return this.type.put(url, item);
  }
  delete(id: string) {
    let url = AIGarbageUrl.garbageDevices.item(id);
    return this.type.delete(url);
  }
  list(params: GetAIGarbageStationDevicesParams) {
    let url = AIGarbageUrl.garbageDevices.list();
    return this.type.paged(url, params);
  }
  command(id: string, command: AIGarbageDeviceCommand) {
    let url = AIGarbageUrl.garbageDevices.command(id);
    let plain = instanceToPlain(command);
    return this.http
      .howellPost<AIGarbageDeviceCommand>(url, plain as AIGarbageDeviceCommand)
      .toPromise();
  }
}
class AIGarbageDevicesRecordsRequestService {
  constructor(private basic: BaseRequestService) {}
  commands = new AIGarbageDevicesRecordsCommandsRequestService(this.basic);
  logs = new AIGarbageDevicesRecordsLogsRequestService(this.basic);
  events = new AIGarbageDevicesRecordsEventsRequestService(this.basic);
}
class AIGarbageDevicesRecordsCommandsRequestService {
  private type: BaseTypeRequestService<AIGarbageDeviceCommandRecord>;
  constructor(basic: BaseRequestService) {
    this.type = basic.type(AIGarbageDeviceCommandRecord);
  }

  list(params: GetAIGarbageStationDeviceCommandRecordsParams) {
    let url = AIGarbageUrl.garbageDevices.records.commands.list();
    return this.type.paged(url, params);
  }
}
class AIGarbageDevicesRecordsLogsRequestService {
  private type: BaseTypeRequestService<AIGarbageDeviceLogRecord>;
  constructor(basic: BaseRequestService) {
    this.type = basic.type(AIGarbageDeviceLogRecord);
  }

  list(params: GetAIGarbageStationDeviceLogRecordsParams) {
    let url = AIGarbageUrl.garbageDevices.records.logs.list();
    return this.type.paged(url, params);
  }
}
class AIGarbageDevicesRecordsEventsRequestService {
  private type: BaseTypeRequestService<AIGarbageDeviceEventRecord>;
  constructor(private basic: BaseRequestService) {
    this.type = basic.type(AIGarbageDeviceEventRecord);
  }

  list(params: GetAIGarbageStationDeviceEventRecordsParams) {
    let url = AIGarbageUrl.garbageDevices.records.events.list();
    return this.type.paged(url, params);
  }
}
