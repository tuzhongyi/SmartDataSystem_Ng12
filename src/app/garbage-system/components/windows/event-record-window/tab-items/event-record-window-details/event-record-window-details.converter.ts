import { Injectable } from '@angular/core';
import { ITimeData } from 'src/app/common/components/charts/chart.model';
import { EventType } from 'src/app/enum/event-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { DivisionNumberStatisticV2 } from 'src/app/network/model/garbage-station/division-number-statistic-v2.model';
import { DivisionNumberStatistic } from 'src/app/network/model/garbage-station/division-number-statistic.model';
import { EventNumberStatistic } from 'src/app/network/model/garbage-station/event-number-statistic.model';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station/garbage-station-number-statistic-v2.model';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station/garbage-station-number-statistic.model';
import { StatisticTime } from 'src/app/network/model/garbage-station/statistic-time.model';
import { EventNumberStatisticModel } from './event-record-window-details.model';

@Injectable()
export class EventRecordWindowDetailsConverter {
  convert(
    input: EventNumberStatisticModel,
    type: EventType,
    unit: TimeUnit
  ): ITimeData<number | undefined> {
    let count = undefined;
    if (input.EventNumbers) {
      let event = input.EventNumbers.find((x) => x.EventType === type);
      if (event) {
        if (unit === TimeUnit.Hour) {
          count = event.DeltaNumber;
        } else {
          count = event.DayNumber;
        }
      }
    }
    return {
      time: input.Time,
      value: count,
    };
  }

  Convert(
    source: EventNumberStatisticModel[],
    types: EventType[],
    unit: TimeUnit
  ): ITimeData<number | undefined>[][] {
    let array: ITimeData<number | undefined>[][] = [];
    for (let i = 0; i < types.length; i++) {
      let item = source.map((x) => {
        return this.convert(x, types[i], unit);
      });

      array.push(item);
    }

    return array;
  }

  division(input: DivisionNumberStatisticV2 | DivisionNumberStatistic) {
    let model = new EventNumberStatisticModel();
    model.Id = input.Id;
    if (input instanceof DivisionNumberStatisticV2) {
      model.Time = StatisticTime.toDate(input.Time);
      model.EventNumbers = input.EventNumbers;
    } else {
      model.Time = new Date();
      model.EventNumbers = input.TodayEventNumbers;
    }
    return model;
  }
  station(
    input: GarbageStationNumberStatisticV2 | GarbageStationNumberStatistic
  ) {
    let model = new EventNumberStatisticModel();
    model.Id = input.Id;
    if (input instanceof GarbageStationNumberStatisticV2) {
      model.Time = StatisticTime.toDate(input.Time);
      model.EventNumbers = input.EventNumbers;
    } else {
      model.Time = new Date();
      model.EventNumbers = input.TodayEventNumbers;
    }

    return model;
  }

  statistic(id: string, input: EventNumberStatistic) {
    let model = new EventNumberStatisticModel();
    model.Id = id;
    model.EventNumbers = input.EventNumbers;
    model.Time = input.BeginTime;
    return model;
  }
  create(id: string, time: Date) {
    let model = new EventNumberStatisticModel();
    model.Id = id;
    model.Time = time;
    return model;
  }
}
