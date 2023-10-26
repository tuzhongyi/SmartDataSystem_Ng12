import {} from '@angular/common';
import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { GarbageDropEventRecord } from 'src/app/network/model/garbage-station/garbage-event-record.model';
import { GetGarbageDropEventRecordsParams } from 'src/app/network/request/event/event-request.params';
import { EventRequestService } from 'src/app/network/request/event/event-request.service';
import { DurationParams } from 'src/app/network/request/IParams.interface';

import { TaskTableConverter } from './task-table.converter';

import { TaskTableViewModel } from './task-table.model';

@Injectable()
export class TaskTableBusiness
  implements IBusiness<GarbageDropEventRecord[], TaskTableViewModel[]>
{
  constructor(private eventService: EventRequestService) {}
  Converter: IConverter<GarbageDropEventRecord[], TaskTableViewModel[]> =
    new TaskTableConverter();

  async getData(divisionId: string): Promise<GarbageDropEventRecord[]> {
    let params = new GetGarbageDropEventRecordsParams();

    let day = DurationParams.allDay(new Date());

    params.BeginTime = day.BeginTime;
    params.EndTime = day.EndTime;
    params.DivisionIds = [divisionId];
    let paged = await this.eventService.record.GarbageDrop.list(params);
    return paged.Data;
  }

  async load(divisionId: string) {
    let data = await this.getData(divisionId);
    let model = this.Converter.Convert(data);
    return model;
  }
}
