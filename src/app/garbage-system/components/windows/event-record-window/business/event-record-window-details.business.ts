import { Injectable } from '@angular/core';
import { TimeData } from 'src/app/common/components/charts/chart.model';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import {
  IConverter,
} from 'src/app/common/interfaces/converter.interface';
import { EventType } from 'src/app/enum/event-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { EventNumberStatistic } from 'src/app/network/model/event-number-statistic.model';

import { GetGarbageStationVolumesParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { IntervalParams } from 'src/app/network/request/IParams.interface';
import { DetailsChartLoadOpts } from '../../charts/details-chart/details-chart.option';
import { GarbageStationWindowDetailsFilter } from '../../garbage-station-window/tab-items/garbage-station-window-details/details-chart.converter';

@Injectable()
export class EventRecordWindowDetailsBusiness implements IBusiness<EventNumberStatistic[], TimeData<number>[]>{
  constructor(private stationService:GarbageStationRequestService){

  }
  Converter: IConverter<EventNumberStatistic[], TimeData<number>[]> = new EventRecordWindowDetailsConverter();
  
  async getData(stationId:string, interval:IntervalParams, unit:TimeUnit): Promise<EventNumberStatistic[]> {
    let params = new GetGarbageStationVolumesParams()
    params = Object.assign(params, interval)
    params.TimeUnit = unit;
      let paged = await this.stationService.eventNumber.history.list(stationId, params)
      return paged.Data;
  }

  eventType:EventType=EventType.IllegalDrop;

  async load(opts: DetailsChartLoadOpts): Promise<TimeData<number>[]> {
    debugger;
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
    let data = await this.getData(opts.stationId, interval, opts.unit);
    let filter  = this.getFilter(this.eventType)
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

class EventRecordWindowDetailsConverter implements IConverter<EventNumberStatistic[], TimeData<number>[]>{
  Convert(source: EventNumberStatistic[], eventType:EventType): TimeData<number>[] {
    return source.map(x=>{
      let count = 0;
      let event = x.EventNumbers.find(x=>x.EventType === eventType)
      if(event)
      {
        count = event.DeltaNumber??0;
      }
      return {
        time:x.BeginTime,
        value:count
      }
    })
  }

}

