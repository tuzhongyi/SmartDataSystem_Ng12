import { Injectable } from '@angular/core';
import { ITimeData } from 'src/app/common/components/charts/chart.model';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import {
  IConverter,
} from 'src/app/common/interfaces/converter.interface';
import { EventType } from 'src/app/enum/event-type.enum';
import { StatisticType } from 'src/app/enum/statistic-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { StoreService } from 'src/app/global/service/store.service';
import { Division } from 'src/app/network/model/division.model';
import { EventNumberStatistic } from 'src/app/network/model/event-number-statistic.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { GetDivisionEventNumbersParams, GetDivisionVolumesParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';

import { GetGarbageStationVolumesParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { IntervalParams } from 'src/app/network/request/IParams.interface';
import { DetailsChartLoadOptions } from '../../../charts/details-chart/details-chart.model';
import { EventRecordWindowDetailsConverter } from './event-record-window-details.converter';

@Injectable()
export class EventRecordWindowDetailsBusiness implements IBusiness<EventNumberStatistic[], ITimeData<number>[]>{
  constructor(
    private stationService: GarbageStationRequestService,
    private divisionService: DivisionRequestService,
    private store: StoreService
  ) {

  }
  Converter: IConverter<EventNumberStatistic[], ITimeData<number>[]> = new EventRecordWindowDetailsConverter();

  async getData(id: string, type: UserResourceType, interval: IntervalParams, unit: TimeUnit): Promise<EventNumberStatistic[]> {
    switch (type) {
      case UserResourceType.Station:
        return this.getDataByStation(id, interval, unit);
      default:
        return this.getDataByDivision(id, interval, unit);
    }
  }

  division?: Division;
  station?: GarbageStation;

  async getDataByStation(stationId: string, interval: IntervalParams, unit: TimeUnit) {
    let params = new GetGarbageStationVolumesParams()
    params = Object.assign(params, interval)
    params.TimeUnit = unit;
    let paged = await this.stationService.eventNumber.history.list(stationId, params)
    return paged.Data;
  }
  async getDataByDivision(divisionId: string, interval: IntervalParams, unit: TimeUnit) {
    let params = new GetDivisionEventNumbersParams()
    params = Object.assign(params, interval)
    params.TimeUnit = unit;
    let paged = await this.divisionService.eventNumber.history.list(divisionId, params)
    return paged.Data;
  }

  async loadDefault(divisionId: string) {
    this.division = await this.divisionService.cache.get(divisionId);
  }

  async load(opts: DetailsChartLoadOptions): Promise<ITimeData<number>[]> {
    let divisionId = this.store.divisionId
    this.loadDefault(divisionId)

    let interval = new IntervalParams()
    interval.BeginTime = opts.begin;
    interval.EndTime = opts.end;
    let type = opts.stationId ? UserResourceType.Station : UserResourceType.None;
    let id = opts.stationId ?? opts.divisionId ?? divisionId;

    let data = await this.getData(id, type, interval, opts.unit);
    let model = this.Converter.Convert(data, opts.type);
    return model;
  }

  getFilter(eventType: EventType) {
    switch (eventType) {
      case EventType.MixedInto:
        return StatisticType.mixedInto;
      case EventType.IllegalDrop:
      default:
        return StatisticType.illegalDrop;
    }
  }

}



