import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { EventType } from 'src/app/enum/event-type.enum';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station-number-statistic-v2.model';

export class GarbageStationWindowDetailsConverter
  implements IConverter<GarbageStationNumberStatisticV2[], number[]>
{
  Convert(
    source: GarbageStationNumberStatisticV2[],
    filter: GarbageStationWindowDetailsFilter
  ): number[] {

    switch (filter) {
      case GarbageStationWindowDetailsFilter.GarbageRatio:        
        return this.fromGarbageRatio(source)
        case GarbageStationWindowDetailsFilter.AvgDropDuration:        
        return this.fromAvgDropDuration(source)
        case GarbageStationWindowDetailsFilter.MaxDropDuration:        
        return this.fromMaxDropDuration(source)
        case GarbageStationWindowDetailsFilter.CountDropDuration:        
        return this.fromCountDropDuration(source)
        case GarbageStationWindowDetailsFilter.IllegalDropEvent:        
        return this.fromEventRecord(source, EventType.IllegalDrop)
        case GarbageStationWindowDetailsFilter.MixedIntoEvent:        
        return this.fromEventRecord(source, EventType.MixedInto)
    
      default:
        throw new Error("filter is error")
    }
  }

  fromGarbageRatio(source: GarbageStationNumberStatisticV2[]){    
    return source.map(x=>x.GarbageRatio??0)
  }
  fromAvgDropDuration(source: GarbageStationNumberStatisticV2[]){
    return source.map(x=>x.AvgGarbageTime??0)
  }
  fromMaxDropDuration(source: GarbageStationNumberStatisticV2[]){
    return source.map(x=>x.MaxGarbageTime??0)
  }
  fromCountDropDuration(source: GarbageStationNumberStatisticV2[]){
    return source.map(x=>x.GarbageDuration??0)
  }
  fromEventRecord(source: GarbageStationNumberStatisticV2[], eventType:EventType){
    return source.map(x=>{
      let count = 0;
      if(x.EventNumbers)
      {
        for (let i = 0; i < x.EventNumbers.length; i++) {
          const event = x.EventNumbers[i];
          if(event.EventType === eventType)
          {
            count += event.DeltaNumber??0;
          }
          
        }
      }
      return count;
    })
  }
}

export enum GarbageStationWindowDetailsFilter {
  GarbageRatio,
  AvgDropDuration,
  MaxDropDuration,
  CountDropDuration,
  IllegalDropEvent,
  MixedIntoEvent,
}
