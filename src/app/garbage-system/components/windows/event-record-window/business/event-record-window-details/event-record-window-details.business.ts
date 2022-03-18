import { Injectable } from '@angular/core';
import { TimeData } from 'src/app/common/components/charts/chart.model';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import {
  IConverter,
} from 'src/app/common/interfaces/converter.interface';
import { EventType } from 'src/app/enum/event-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { EventNumberStatistic } from 'src/app/network/model/event-number-statistic.model';
import { GetDivisionVolumesParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';

import { GetGarbageStationVolumesParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { IntervalParams } from 'src/app/network/request/IParams.interface';
import { DetailsChartLoadOptions } from '../../../charts/details-chart/details-chart.model';
import { GarbageStationWindowDetailsFilter } from '../../../garbage-station-window/tab-items/garbage-station-window-details/garbage-station-window-details-chart.converter';
import { EventRecordWindowDetailsConverter } from './event-record-window-details.converter';

@Injectable()
export class EventRecordWindowDetailsBusiness implements IBusiness<EventNumberStatistic[], TimeData<number>[]>{
  constructor(private stationService:GarbageStationRequestService, private divisionService:DivisionRequestService ){

  }
  Converter: IConverter<EventNumberStatistic[], TimeData<number>[]> = new EventRecordWindowDetailsConverter();
  
  async getData(id:string, type:UserResourceType, interval:IntervalParams, unit:TimeUnit): Promise<EventNumberStatistic[]> {
    switch (type) {
      case UserResourceType.Station:
        return this.getStationData(id, interval, unit);    
      default:
        return this.getDivisionData(id, interval, unit);
    }
  }

  async getStationData(stationId:string, interval:IntervalParams, unit:TimeUnit){
    let params = new GetGarbageStationVolumesParams()
    params = Object.assign(params, interval)
    params.TimeUnit = unit;
      let paged = await this.stationService.eventNumber.history.list(stationId, params)
      return paged.Data;
  }
  async getDivisionData(divisionId:string, interval:IntervalParams, unit:TimeUnit){
    let params = new GetDivisionVolumesParams()
    params = Object.assign(params, interval)
    params.TimeUnit = unit;
    let paged = await this.divisionService.eventNumber.history.list(divisionId, params)
    return paged.Data;
  }

  eventType:EventType=EventType.IllegalDrop;

  async load(opts: DetailsChartLoadOptions): Promise<TimeData<number>[]> {    
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
    let model = this.Converter.Convert(data, this.eventType);
    return model;
  }

  getFilter(eventType:EventType)
  {
    switch (eventType) {
      case EventType.MixedInto:
        return GarbageStationWindowDetailsFilter.MixedIntoEvent;
      case EventType.IllegalDrop:
      default:
        return GarbageStationWindowDetailsFilter.IllegalDropEvent
    }
  }


}



