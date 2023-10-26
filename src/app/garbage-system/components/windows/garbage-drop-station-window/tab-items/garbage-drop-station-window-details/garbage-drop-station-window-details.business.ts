import { Injectable } from '@angular/core';
import { ITimeData } from 'src/app/common/components/charts/chart.model';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { EventType } from 'src/app/enum/event-type.enum';
import { StatisticType } from 'src/app/enum/statistic-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { EventNumberStatistic } from 'src/app/network/model/garbage-station/event-number-statistic.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { GetDivisionEventNumbersParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';

import { GetGarbageStationVolumesParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { DetailsChartLoadOptions } from '../../../charts/details-chart/details-chart.model';
import { GarbageDropStationWindowDetailsConverter } from './garbage-drop-station-window-details.converter';

@Injectable()
export class GarbageDropStationWindowDetailsBusiness
  implements IBusiness<EventNumberStatistic[], ITimeData<number>[][]>
{
  constructor(
    private stationService: GarbageStationRequestService,
    private divisionService: DivisionRequestService,
    private store: GlobalStorageService
  ) {}
  Converter: IConverter<EventNumberStatistic[], ITimeData<number>[][]> =
    new GarbageDropStationWindowDetailsConverter();

  async getData(
    id: string,
    type: UserResourceType,
    interval: DurationParams,
    unit: TimeUnit
  ): Promise<EventNumberStatistic[]> {
    switch (type) {
      case UserResourceType.Station:
        return this.getDataByStation(id, interval, unit);
      default:
        return this.getDataByDivision(id, interval, unit);
    }
  }

  division?: Division;
  station?: GarbageStation;

  async getDataByStation(
    stationId: string,
    interval: DurationParams,
    unit: TimeUnit
  ) {
    let params = new GetGarbageStationVolumesParams();
    params = Object.assign(params, interval);
    params.TimeUnit = unit;
    let paged = await this.stationService.eventNumber.history.list(
      stationId,
      params
    );
    return paged.Data;
  }
  async getDataByDivision(
    divisionId: string,
    interval: DurationParams,
    unit: TimeUnit
  ) {
    let params = new GetDivisionEventNumbersParams();
    params = Object.assign(params, interval);
    params.TimeUnit = unit;
    let paged = await this.divisionService.eventNumber.history.list(
      divisionId,
      params
    );
    return paged.Data;
  }

  async loadDefault(divisionId: string) {
    this.division = await this.divisionService.cache.get(divisionId);
  }

  async load(opts: DetailsChartLoadOptions): Promise<ITimeData<number>[][]> {
    let divisionId = this.store.divisionId;
    this.loadDefault(divisionId);

    let interval = new DurationParams();
    interval.BeginTime = opts.begin;
    interval.EndTime = opts.end;
    let type = opts.stationId
      ? UserResourceType.Station
      : UserResourceType.None;
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
