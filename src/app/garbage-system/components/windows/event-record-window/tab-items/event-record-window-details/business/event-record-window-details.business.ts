import { Injectable } from '@angular/core';
import { ITimeData } from 'src/app/common/components/charts/chart.model';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { EventType } from 'src/app/enum/event-type.enum';
import { StatisticType } from 'src/app/enum/statistic-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';

import { ExportTool } from 'src/app/common/tools/export.tool';
import { LocaleCompare } from 'src/app/common/tools/locale-compare';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { DetailsChartLoadOptions } from '../../../../charts/details-chart/details-chart.model';
import { EventRecordWindowDetailsConverter } from '../event-record-window-details.converter';
import { EventNumberStatisticModel } from '../event-record-window-details.model';
import { EventRecordWindowDetailsDivisionBusiness } from './event-record-window-details-division.business';
import { EventRecordWindowDetailsStationBusiness } from './event-record-window-details-station.business';

@Injectable()
export class EventRecordWindowDetailsBusiness
  implements IBusiness<EventNumberStatisticModel[], ITimeData<number>[][]>
{
  constructor(
    private stationService: GarbageStationRequestService,

    private store: GlobalStorageService,
    private exportTool: ExportTool,
    private station: EventRecordWindowDetailsStationBusiness,
    public division: EventRecordWindowDetailsDivisionBusiness,
    private converter: EventRecordWindowDetailsConverter
  ) {}

  async load(opts: DetailsChartLoadOptions): Promise<ITimeData<number>[][]> {
    let divisionId = this.store.divisionId;
    let interval = new DurationParams();
    interval.BeginTime = opts.begin;
    interval.EndTime = opts.end;
    let type = opts.stationId
      ? UserResourceType.Station
      : UserResourceType.None;
    let id = opts.stationId ?? opts.divisionId ?? divisionId;

    let data = await this.getData(id, type, interval, opts.unit);
    switch (opts.unit) {
      case TimeUnit.Hour:
        data = data.sort((a, b) => {
          return LocaleCompare.compare(a.Time.getHours(), b.Time.getHours());
        });
        break;
      case TimeUnit.Week:
        data = data.sort((a, b) => {
          let _a = a.Time.getDay();
          if (_a == 0) {
            _a = 7;
          }
          let _b = b.Time.getDay();
          if (_b == 0) {
            _b = 7;
          }
          return LocaleCompare.compare(_a, _b);
        });
        break;
      case TimeUnit.Month:
        data = data.sort((a, b) => {
          return LocaleCompare.compare(a.Time.getDate(), b.Time.getDate());
        });
        break;
      case TimeUnit.Year:
        data = data.sort((a, b) => {
          return LocaleCompare.compare(a.Time.getMonth(), b.Time.getMonth());
        });
        break;

      default:
        break;
    }
    let model = this.converter.Convert(data, opts.type, opts.unit);
    return model;
  }
  async getData(
    id: string,
    type: UserResourceType,
    interval: DurationParams,
    unit: TimeUnit
  ): Promise<EventNumberStatisticModel[]> {
    switch (type) {
      case UserResourceType.Station:
        if (unit === TimeUnit.Year) {
          return this.station.year(id, interval);
        } else {
          return this.station.history(id, interval, unit);
        }

      default:
        if (unit === TimeUnit.Year) {
          return this.division.year(id, interval);
        } else {
          return this.division.history(id, interval, unit);
        }
    }
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
  EventRecordWindowDetailsConverter,
];
