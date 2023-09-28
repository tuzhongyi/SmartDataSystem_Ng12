import { Injectable } from '@angular/core';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { GetGarbageDropEventRecordsParams } from 'src/app/network/request/event/event-request.params';
import { EventRequestService } from 'src/app/network/request/event/event-request.service';

@Injectable()
export class DapuqiaoMainSuperviseButtonBusiness {
  constructor(
    private service: EventRequestService,
    private global: GlobalStorageService
  ) {}

  async load() {
    let datas = await this.getData(await this.global.defaultDivisionId);
    let value = 0;
    for (let i = 0; i < datas.length; i++) {
      const data = datas[i];
      if (data.Data.IsHandle) {
        continue;
      }
      if (data.Data.SuperVisionData) {
        if (data.Data.SuperVisionData.SupervisedState === 1) {
          continue;
        }
      }
      value++;
    }
    return value;
  }
  async getData(divisionId: string) {
    let duration = DateTimeTool.allDay(new Date());
    let params = new GetGarbageDropEventRecordsParams();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.DivisionId = divisionId;
    params.Level = 3;
    return this.service.record.GarbageDrop.all(params);
  }
}
