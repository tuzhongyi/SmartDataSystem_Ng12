import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { DateTimeTool } from 'src/app/common/tools/date-time-tool/datetime.tool';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { NumberStatisticV2Type } from 'src/app/view-model/types/number-statistic-v2.type';
import { EventRecordCountTableDivisionBusiness } from './event-record-count-table-division.business';
import { EventRecordCountTableStationBusiness } from './event-record-count-table-station.business';
import { EventRecordCountTableConverter } from './event-record-count-table.converter';
import {
  EventRecordCountTableModel,
  EventRecordCountTableOptions,
} from './event-record-count-table.model';

@Injectable()
export class EventRecordCountTableBusiness
  implements IBusiness<NumberStatisticV2Type[], EventRecordCountTableModel[]>
{
  private service: {
    division: EventRecordCountTableDivisionBusiness;
    station: EventRecordCountTableStationBusiness;
  };
  constructor(
    private global: GlobalStorageService,
    private local: LocalStorageService,
    private converter: EventRecordCountTableConverter,
    division: EventRecordCountTableDivisionBusiness,
    station: EventRecordCountTableStationBusiness
  ) {
    this.service = {
      division: division,
      station: station,
    };
  }

  async load(
    opts: EventRecordCountTableOptions
  ): Promise<EventRecordCountTableModel[]> {
    let id = opts.id;
    if (!id) {
      id = this.global.divisionId;
    }

    let type = opts.type;
    if (!type) {
      type = this.global.divisionType;
    }

    let data = await this.getData(id, type, opts);

    let model = await this.converter.Convert(data, opts.eventType);
    return model;
  }
  async getData(
    id: string,
    type: DivisionType,
    opts: EventRecordCountTableOptions
  ): Promise<NumberStatisticV2Type[]> {
    let duration = DateTimeTool.TimeUnit(opts.unit, opts.date);
    let interval = new DurationParams();
    interval.BeginTime = duration.begin;
    interval.EndTime = duration.end;
    if (opts.type === DivisionType.None) {
      let stations = await this.service.station.list(id);
      if (stations.length == 0) return [];
      let ids = stations.map((x) => x.Id);
      return this.service.station.history(ids, interval, opts.unit);
    } else {
      let divisions = await this.service.division.list(id, type);
      if (divisions.length == 0) return [];
      let ids = divisions.map((x) => x.Id);
      return this.service.division.history(ids, interval, opts.unit);
    }
  }
}
