import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { StoreService } from 'src/app/common/service/store.service';
import { SmokeEventRecord } from 'src/app/network/model/garbage-event-record.model';
import { GetSmokeEventRecordsParams } from 'src/app/network/request/event/event-request.params';
import { EventRequestService } from 'src/app/network/request/event/event-request.service';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { AlarmListConverter } from './alarm.converter';
import { ElectricBikeAlarmModel } from './alarm.model';

@Injectable()
export class AlarmBusiness
  implements IBusiness<SmokeEventRecord[], ElectricBikeAlarmModel[]>
{
  constructor(
    private store: StoreService,
    private event: EventRequestService
  ) {}
  Converter: IConverter<
    SmokeEventRecord[],
    ElectricBikeAlarmModel<SmokeEventRecord>[]
  > = new AlarmListConverter();
  async load(
    divisionId?: string,
    date?: Date
  ): Promise<ElectricBikeAlarmModel<any>[]> {
    if (!divisionId) {
      divisionId = this.store.divisionId;
    }
    if (!date) {
      date = new Date();
    }
    let duration = DurationParams.before(date);
    let data = await this.getData(divisionId, duration);
    data = data.sort((a, b) => {
      return b.EventTime.getTime() - a.EventTime.getTime();
    });
    let model = this.Converter.Convert(data);
    return model;
  }
  async getData(
    divisionId: string,
    duration: DurationParams
  ): Promise<SmokeEventRecord[]> {
    let params = new GetSmokeEventRecordsParams();
    params.BeginTime = duration.BeginTime;
    params.EndTime = duration.EndTime;
    params.DivisionIds = [divisionId];
    params.PageSize = 100;
    let paged = await this.event.record.Smoke.list(params);
    return paged.Data;
  }
}
