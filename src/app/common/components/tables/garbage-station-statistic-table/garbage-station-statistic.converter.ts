import { formatDate } from '@angular/common';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { EventType } from 'src/app/enum/event-type.enum';
import { Language } from 'src/app/global/tool/language';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station-number-statistic-v2.model';
import {
  GarbageStationStatisticModel,
  GarbageStationStatisticTableSource,
} from './garbage-station-statistic.model';

export class GarbageStationStatisticArrayConverter
  implements
    IConverter<
      GarbageStationStatisticTableSource,
      GarbageStationStatisticModel[]
    >
{
  converter = {
    item: new GarbageStationStatisticConverter(),
  };
  Convert(
    source: GarbageStationStatisticTableSource
  ): GarbageStationStatisticModel[] {
    return source.current!.map((x) => {
      return this.converter.item.Convert(
        x,
        source.before?.find((y) => y.Id === x.Id)
      );
    });
  }
}

export class GarbageStationStatisticConverter
  implements
    IConverter<GarbageStationNumberStatisticV2, GarbageStationStatisticModel>
{
  Convert(
    today: GarbageStationNumberStatisticV2,
    before?: GarbageStationNumberStatisticV2
  ): GarbageStationStatisticModel {
    let model = new GarbageStationStatisticModel();
    model = Object.assign(model, today);

    if (model.GarbageRatio) {
      model.GarbageRatioTd.value = model.GarbageRatio;
      model.GarbageRatioTd.format = model.GarbageRatio.toFixed(2);
    }
    if (model.AvgGarbageTime) {
      model.AvgGarbageTimeTd.value = model.AvgGarbageTime;
      model.AvgGarbageTimeTd.format = Language.Time(model.AvgGarbageTime);
    }
    if (model.MaxGarbageTime) {
      model.MaxGarbageTimeTd.value = model.MaxGarbageTime;
      model.MaxGarbageTimeTd.format = Language.Time(model.MaxGarbageTime);
    }
    if (model.GarbageDuration) {
      model.GarbageDurationTd.value = model.GarbageDuration;
      model.GarbageDurationTd.format = Language.Time(model.GarbageDuration);
    }

    if (model.EventNumbers) {
      for (let i = 0; i < model.EventNumbers.length; i++) {
        const item = model.EventNumbers[i];
        switch (item.EventType) {
          case EventType.IllegalDrop:
            model.IllegalDropTd.value = item.DayNumber;
            model.IllegalDrop = item.DayNumber;
            model.IllegalDropTd.format = item.DayNumber.toString();
            break;
          case EventType.MixedInto:
            model.MixedIntoTd.value = item.DayNumber;
            model.MixedInto = item.DayNumber;
            model.MixedIntoTd.format = item.DayNumber.toString();
            break;

          default:
            break;
        }
      }
    }
    if (before) {
      if (before.GarbageRatio) {
        model.GarbageRatioTd.differ =
          model.GarbageRatioTd.value - before.GarbageRatio;
      }

      model.AvgGarbageTimeTd.differ = this.getQoQ(
        model.AvgGarbageTimeTd.value,
        before.AvgGarbageTime
      );

      model.MaxGarbageTimeTd.differ = this.getQoQ(
        model.MaxGarbageTimeTd.value,
        before.MaxGarbageTime
      );

      model.GarbageDurationTd.differ = this.getQoQ(
        model.GarbageDurationTd.value,
        before.GarbageDuration
      );

      if (before.EventNumbers) {
        for (let i = 0; i < before.EventNumbers.length; i++) {
          const item = before.EventNumbers[i];
          switch (item.EventType) {
            case EventType.IllegalDrop:
              model.IllegalDropTd.differ =
                model.IllegalDropTd.value - item.DayNumber;
              break;
            case EventType.MixedInto:
              model.MixedIntoTd.differ =
                model.MixedIntoTd.value - item.DayNumber;
              break;

            default:
              break;
          }
        }
      }
    }

    EventType.MixedInto;
    return model;
  }

  /** 环比 */
  getQoQ(current: number, before?: number) {
    if (before) {
      return ((current - before) / before) * 100;
    }
    if (current === 0) {
      return 0;
    }
    return 100;
  }
}
