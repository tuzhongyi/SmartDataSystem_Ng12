import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { Duration } from 'src/app/common/tools/datetime.tool';
import { SmokeEventRecord } from 'src/app/network/model/garbage-event-record.model';
import { GetGarbageDropEventRecordsParams } from 'src/app/network/request/event/event-request.params';
import { EventRequestService } from 'src/app/network/request/event/event-request.service';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { WidescreenEventRecordTableConverter } from './widescreen-event-record-table.converter';
import { WidescreenEventRecordItem } from './widescreen-event-record-table.model';

@Injectable()
export class WidescreenEventRecordTableBusiness
  implements IBusiness<SmokeEventRecord[], WidescreenEventRecordItem[]>
{
  constructor(private service: EventRequestService) {}
  Converter = new WidescreenEventRecordTableConverter();

  async load(
    duration: Duration,
    divisionId?: string
  ): Promise<WidescreenEventRecordItem<any>[]> {
    let params = new DurationParams();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    let data = await this.getData(params, divisionId);
    let model = this.Converter.Convert(data);
    return model;
  }
  async getData(
    duration: DurationParams,
    divisionId?: string
  ): Promise<SmokeEventRecord[]> {
    let params = new GetGarbageDropEventRecordsParams();
    if (divisionId) {
      params.DivisionIds = [divisionId];
    }
    params.BeginTime = duration.BeginTime;
    params.EndTime = duration.EndTime;
    params.Desc = true;
    let paged = await this.service.record.Smoke.list(params);
    return paged.Data;
  }
}
