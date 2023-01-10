import { EventEmitter, Injectable } from '@angular/core';
import {
  ITimeData,
  ITimeDataGroup,
} from 'src/app/common/components/charts/chart.model';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { StatisticToTimeDataConverter } from 'src/app/converter/statistic-to-timedata.converter';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { EventType } from 'src/app/enum/event-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { Division } from 'src/app/network/model/division.model';
import { GetDivisionEventNumbersParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetGarbageStationEventNumbersParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { EventNumberStatisticGroup } from 'src/app/view-model/event-number-statistic-group.model';
import { EventRecordComparisonOptions } from './EventRecordComparison.model';

@Injectable()
export class EventRecordComparisonBusiness
  implements
    IBusiness<Array<EventNumberStatisticGroup>, ITimeDataGroup<number>[]>
{
  constructor(
    private stationService: GarbageStationRequestService,
    private divisionService: DivisionRequestService
  ) {}
  Converter: IConverter<
    Array<EventNumberStatisticGroup>,
    ITimeDataGroup<number>[]
  > = new EventRecordComparisonConverter();
  subscription?: ISubscription | undefined;
  loading?: EventEmitter<void> | undefined;
  async load(
    opts: EventRecordComparisonOptions
  ): Promise<ITimeDataGroup<number>[]> {
    let interval = DurationParams.TimeUnit(opts.unit, opts.date);
    let unit = TimeUnit.Day;
    if (opts.unit == TimeUnit.Day || opts.unit === TimeUnit.Hour) {
      unit = TimeUnit.Hour;
    }
    let data = await this.getData(opts.divisionType, opts.ids, unit, interval);
    let model = this.Converter.Convert(data, opts.eventType);
    return model;
  }
  async getData(
    type: DivisionType,
    ids: string[],
    unit: TimeUnit,
    interval: DurationParams
  ) {
    if (type === DivisionType.None) {
      return this.getDataByStation(ids, unit, interval);
    } else {
      return this.getDataByDivision(ids, unit, interval);
    }
  }

  async getDataByStation(
    ids: string[],
    unit: TimeUnit,
    interval: DurationParams
  ) {
    let params = new GetGarbageStationEventNumbersParams();
    params.BeginTime = interval.BeginTime;
    params.EndTime = interval.EndTime;
    params.TimeUnit = unit;
    let result = new Array<EventNumberStatisticGroup>();
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      let paged = await this.stationService.eventNumber.history.list(
        id,
        params
      );
      let array = new EventNumberStatisticGroup();
      array.Id = id;
      array.datas = paged.Data;
      let station = await this.stationService.cache.get(id);
      array.Name = station.Name;
      result.push(array);
    }
    return result;
  }
  async getDataByDivision(
    ids: string[],
    unit: TimeUnit,
    interval: DurationParams
  ) {
    let params = new GetDivisionEventNumbersParams();
    params.BeginTime = interval.BeginTime;
    params.EndTime = interval.EndTime;
    params.TimeUnit = unit;
    let result = new Array<EventNumberStatisticGroup>();
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      let paged = await this.divisionService.eventNumber.history.list(
        id,
        params
      );
      let array = new EventNumberStatisticGroup();
      array.Id = id;
      array.datas = paged.Data;
      let division = await this.divisionService.cache.get(id);
      array.Name = division.Name;
      result.push(array);
    }
    return result;
  }
}

class EventRecordComparisonConverter
  implements
    IConverter<Array<EventNumberStatisticGroup>, ITimeDataGroup<number>[]>
{
  converter = {
    item: new StatisticToTimeDataConverter(),
  };

  Convert(
    source: Array<EventNumberStatisticGroup>,
    eventType: EventType
  ): ITimeDataGroup<number>[] {
    let array = source.map((x) => {
      let datas = this.converter.item.Convert(x.datas, eventType);
      let result: ITimeDataGroup<number> = {
        Id: x.Id,
        Name: x.Name,
        datas: datas,
      };
      return result;
    });
    return array;
  }
}
