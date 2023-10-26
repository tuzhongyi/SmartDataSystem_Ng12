import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { GarbageDropEventRecord } from 'src/app/network/model/garbage-station/garbage-event-record.model';
import { GetGarbageDropEventRecordsParams } from 'src/app/network/request/event/event-request.params';
import { DaPuQiaoGarbageStationEventRecordVisionModel } from './dapuqiao-garbage-station-event-record-vision-table.model';
import { DaPuQiaoGarbageStationEventRecordVisionTableService } from './dapuqiao-garbage-station-event-record-vision-table.service';

@Injectable()
export class DaPuQiaoGarbageStationEventRecordVisionTableBusiness
  implements
    IBusiness<
      GarbageDropEventRecord[],
      DaPuQiaoGarbageStationEventRecordVisionModel[]
    >
{
  constructor(
    private service: DaPuQiaoGarbageStationEventRecordVisionTableService
  ) {}
  async load(
    ...args: any
  ): Promise<DaPuQiaoGarbageStationEventRecordVisionModel[]> {
    let data = await this.getData();
    let model = data.map((x, i) => this.convert(x, data.length - i));
    return model;
  }
  async getData(...args: any): Promise<GarbageDropEventRecord[]> {
    let params = new GetGarbageDropEventRecordsParams();
    params.IsTimeout = true;
    params.IsSuperTimeout = true;
    let date = new Date();
    let duration = DateTimeTool.allDay(date);
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.Desc = true;

    let paged = await this.service.event.record.GarbageDrop.list(params);
    return paged.Data;
  }
  convert(input: GarbageDropEventRecord, index: number) {
    let plain = instanceToPlain(input);
    let model = plainToInstance(
      DaPuQiaoGarbageStationEventRecordVisionModel,
      plain
    );
    model.Index = index;
    model.GarbageStation = this.service.station.get(input.Data.StationId);
    model.Minutes = input.Data.TakeMinutes;
    if (!model.Minutes) {
      model.Minutes =
        (new Date().getTime() - input.Data.DropTime.getTime()) / (1000 * 60);
    }
    return model;
  }
}
