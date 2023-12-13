import { EventEmitter, Injectable } from '@angular/core';
import { ITimeDataGroup } from 'src/app/common/components/charts/chart.model';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station/garbage-station-number-statistic-v2.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetGarbageStationStatisticNumbersParamsV2 } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { GarbageStationWindowDetailsConverter } from './garbage-station-window-details.converter';
import { GarbageStationDetailsChartOptions } from './garbage-station-window-details.model';

@Injectable()
export class GarbageStationWindowDetailsBusiness
  implements
    IBusiness<GarbageStationNumberStatisticV2[], ITimeDataGroup<number>[]>
{
  constructor(
    private stationService: GarbageStationRequestService,
    private divisionService: DivisionRequestService
  ) {}
  Converter: IConverter<
    GarbageStationNumberStatisticV2[],
    ITimeDataGroup<number>[]
  > = new GarbageStationWindowDetailsConverter();
  subscription?: ISubscription | undefined;
  loading?: EventEmitter<void> | undefined;

  async load(
    opts: GarbageStationDetailsChartOptions
  ): Promise<ITimeDataGroup<number>[]> {
    let data = await this.getData(opts);
    let model = this.Converter.Convert(data, opts.type);
    return model;
  }
  async getData(
    opts: GarbageStationDetailsChartOptions
  ): Promise<GarbageStationNumberStatisticV2[]> {
    let params = new GetGarbageStationStatisticNumbersParamsV2();
    let duration = DateTimeTool.TimeUnit(opts.unit, opts.date);
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.GarbageStationIds = opts.stationIds;
    params.TimeUnit = opts.unit;
    return this.stationService.statistic.number.history.list(params);
  }

  groupBy<T>(array: T[], f: (t: T) => any) {
    const groups: {
      [key: string]: T[];
    } = {};
    array.forEach((item) => {
      const group = JSON.stringify(f(item));
      groups[group] = groups[group] || [];
      groups[group].push(item);
    });
    return Object.keys(groups).map((group) => {
      return groups[group];
    });
  }
}
