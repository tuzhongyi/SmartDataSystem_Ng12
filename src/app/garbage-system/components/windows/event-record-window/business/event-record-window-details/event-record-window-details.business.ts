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

import { ExportTool } from 'src/app/common/tools/export.tool';
import { DivisionNumberStatisticV2 } from 'src/app/network/model/garbage-station/division-number-statistic-v2.model';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station/garbage-station-number-statistic-v2.model';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { DetailsChartLoadOptions } from '../../../charts/details-chart/details-chart.model';
import { EventRecordWindowDetailsDivisionBusiness } from './event-record-window-details-division.business';
import { EventRecordWindowDetailsStationBusiness } from './event-record-window-details-station.business';
import { EventRecordWindowDetailsConverter } from './event-record-window-details.converter';

@Injectable()
export class EventRecordWindowDetailsBusiness
  implements
    IBusiness<
      | EventNumberStatistic[]
      | DivisionNumberStatisticV2[]
      | GarbageStationNumberStatisticV2[],
      ITimeData<number>[][]
    >
{
  division?: Division;

  constructor(
    private stationService: GarbageStationRequestService,

    private store: GlobalStorageService,
    private exportTool: ExportTool,
    private _station: EventRecordWindowDetailsStationBusiness,
    private _division: EventRecordWindowDetailsDivisionBusiness
  ) {}

  private Converter: IConverter<
    | EventNumberStatistic[]
    | DivisionNumberStatisticV2[]
    | GarbageStationNumberStatisticV2[],
    ITimeData<number>[][]
  > = new EventRecordWindowDetailsConverter();

  async load(opts: DetailsChartLoadOptions): Promise<ITimeData<number>[][]> {
    let divisionId = this.store.divisionId!;
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
  async getData(
    id: string,
    type: UserResourceType,
    interval: DurationParams,
    unit: TimeUnit
  ): Promise<
    | EventNumberStatistic[]
    | DivisionNumberStatisticV2[]
    | GarbageStationNumberStatisticV2[]
  > {
    switch (type) {
      case UserResourceType.Station:
        if (unit === TimeUnit.Year) {
          return this._station.history(id, interval);
        } else {
          return this._station.history(id, interval, unit);
        }

      default:
        if (unit === TimeUnit.Year) {
          return this._division.history(id, interval);
        } else {
          return this._division.history(id, interval, unit);
        }
    }
  }

  async loadDefault(divisionId: string) {
    this.division = await this._division.get(divisionId);
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

export const EventRecordWindowDetailsProviders = [
  EventRecordWindowDetailsStationBusiness,
  EventRecordWindowDetailsDivisionBusiness,
  EventRecordWindowDetailsBusiness,
];
