import { TimeData } from "src/app/common/components/charts/chart.model";
import { IConverter } from "src/app/common/interfaces/converter.interface";
import { EventType } from "src/app/enum/event-type.enum";
import { EventNumberStatistic } from "src/app/network/model/event-number-statistic.model";

export class EventRecordWindowDetailsConverter implements IConverter<EventNumberStatistic[], TimeData<number>[]>{
    Convert(source: EventNumberStatistic[], eventType:EventType): TimeData<number>[] {
      return source.map(x=>{
        let count = 0;
        let event = x.EventNumbers.find(x=>x.EventType === eventType)
        if(event)
        {
          count = event.DeltaNumber??0;
        }
        return {
          time:x.EndTime,
          value:count
        }
      })
    }
  
  }