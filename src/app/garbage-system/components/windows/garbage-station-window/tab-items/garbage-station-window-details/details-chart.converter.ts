import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { EventType } from 'src/app/enum/event-type.enum';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station-number-statistic-v2.model';

export class GarbageStationWindowDetailsConverter
  implements IConverter<GarbageStationNumberStatisticV2, number[]>
{
  Convert(
    source: GarbageStationNumberStatisticV2,
    eventType: EventType
  ): number[] {
    let array: number[] = [];

    if (source.EventNumbers) {
      for (let i = 0; i < source.EventNumbers.length; i++) {
        const event = source.EventNumbers[i];
        if (event.EventType === eventType) {
          array.push(event.DeltaNumber ?? 0);
        }
      }
    }

    return array;
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
