import { Injectable } from '@angular/core';
import { IConverter } from '../common/interfaces/converter.interface';
import { EventType } from '../enum/event-type.enum';
import { EventNumberStatistic } from '../network/model/event-number-statistic.model';
import { EChartsLineModelV2 } from '../view-model/echarts-line.model';
@Injectable({
  providedIn: 'root',
})
export class EventStatisticConverter
  implements IConverter<EventNumberStatistic, number>
{
  constructor() {}

  Convert(source: EventNumberStatistic, type?: EventType): number {
    if (source instanceof EventNumberStatistic) {
      return this._fromEventNumberStatistic(
        source,
        type ?? EventType.IllegalDrop
      );
    }
    return 0;
  }

  _fromEventNumberStatistic(input: EventNumberStatistic, type: EventType) {
    let temp = input.EventNumbers.find((n) => n.EventType == type);
    if (temp) {
      return temp.DeltaNumber ?? 0;
    }
    return 0;
  }
}
