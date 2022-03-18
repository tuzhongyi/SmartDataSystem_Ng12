import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { GetDivisionStatisticNumbersParamsV2 } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetGarbageStationStatisticNumbersParamsV2 } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { IntervalParams } from 'src/app/network/request/IParams.interface';
import { DetailsChartLoadOptions } from '../../../charts/details-chart/details-chart.model';


import { GarbageStationWindowDetailsConverter } from './garbage-station-window-details-chart.converter';
import { GarbageStationWindowDetailsType } from './garbage-station-window-details-chart.model';



@Injectable()
export class GarbageStationWindowDetailsBusiness
  implements IBusiness<GarbageStationWindowDetailsType[], number[]>
{
  constructor(private stationService: GarbageStationRequestService, private divisionService:DivisionRequestService) {}
  Converter: IConverter<GarbageStationWindowDetailsType[], number[]> =
    new GarbageStationWindowDetailsConverter();
  subscription?: ISubscription | undefined;
  loading?: EventEmitter<void> | undefined;
  async load(opts: DetailsChartLoadOptions): Promise<number[]> {
    let interval: IntervalParams = new IntervalParams();
    switch (opts.unit) {
      case TimeUnit.Hour:
      case TimeUnit.Day:
        interval = IntervalParams.allDay(opts.date);
        break;
      case TimeUnit.Week:
        interval = IntervalParams.allWeek(opts.date);
        break;
      case TimeUnit.Month:
        interval = IntervalParams.allMonth(opts.date);
        break;
      default:
        break;
    }
    let type = opts.stationId?UserResourceType.Station : UserResourceType.None;
    let id = opts.stationId??opts.divisionId;
    if(!id){
      throw new Error("GarbageStationWindowDetailsBusiness id is undefined")
    }
    let data = await this.getData(id, type, interval, opts.unit);
    let model = this.Converter.Convert(data);
    return model;
  }
  async getData(
    id: string,
    type:UserResourceType,
    interval: IntervalParams,
    unit: TimeUnit
  ): Promise<GarbageStationWindowDetailsType[]> {
    switch (type) {
      case UserResourceType.Station:
        return this.getStationStatistic(id, interval, unit);    
      default:
        return this.getDivisionStatistic(id, interval, unit);
    }
  }

  getStationStatistic(stationId:string, interval:IntervalParams, unit:TimeUnit){
    let params = new GetGarbageStationStatisticNumbersParamsV2();
    params = Object.assign(params, interval);
    params.GarbageStationIds = [stationId];
    params.TimeUnit = unit;
    return this.stationService.statistic.number.history.list(params);    
  }
  getDivisionStatistic(divisionId:string, interval:IntervalParams, unit:TimeUnit)
  {
    let params = new GetDivisionStatisticNumbersParamsV2()
    params = Object.assign(params, interval)
    params.DivisionIds = [divisionId]
    params.TimeUnit = unit;
    return this.divisionService.statistic.number.history.list(divisionId, params);
  }
}
