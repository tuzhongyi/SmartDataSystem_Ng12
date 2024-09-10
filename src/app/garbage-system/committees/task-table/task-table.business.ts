import {} from '@angular/common';
import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { GarbageDropEventRecord } from 'src/app/network/model/garbage-station/event-record/garbage-drop-event-record.model';
import { GetGarbageDropEventRecordsParams } from 'src/app/network/request/event/event-request-garbage-drop.params';
import { EventRequestService } from 'src/app/network/request/event/event-request.service';

import { TaskTableConverter } from './task-table.converter';

import { DateTimeTool } from 'src/app/common/tools/date-time-tool/datetime.tool';
import { TaskTableViewModel } from './task-table.model';

@Injectable()
export class TaskTableBusiness
  implements IBusiness<GarbageDropEventRecord[], TaskTableViewModel[]>
{
  constructor(
    private eventService: EventRequestService,
    private converter: TaskTableConverter
  ) {}

  async getData(divisionId: string): Promise<GarbageDropEventRecord[]> {
    let params = new GetGarbageDropEventRecordsParams();

    let day = DateTimeTool.allDay(new Date());

    params.BeginTime = day.begin;
    params.EndTime = day.end;
    params.DivisionIds = [divisionId];
    let paged = await this.eventService.record.GarbageDrop.list(params);
    return paged.Data;
  }

  async load(divisionId: string) {
    let data = await this.getData(divisionId);
    let model = await this.converter.Convert(data);
    return model;
  }
}
