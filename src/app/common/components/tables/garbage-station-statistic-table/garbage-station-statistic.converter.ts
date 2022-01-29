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
    return source.today!.map((x) => {
      return this.converter.item.Convert(
        x,
        source.yesterday!.find((y) => y.Id === x.Id)
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
    yesterday?: GarbageStationNumberStatisticV2
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
    if (yesterday) {
      if (yesterday.GarbageRatio) {
        model.GarbageRatioTd.differ =
          model.GarbageRatioTd.value - yesterday.GarbageRatio;
      }
      if (yesterday.AvgGarbageTime && model.AvgGarbageTimeTd.value !== 0) {
        model.AvgGarbageTimeTd.differ =
          ((model.AvgGarbageTimeTd.value - yesterday.AvgGarbageTime) /
            model.AvgGarbageTimeTd.value) *
          100;
        // model.AvgGarbageTimeTd.differ =
        //   100 -
        //   (yesterday.AvgGarbageTime /
        //     (model.AvgGarbageTimeTd.value + yesterday.AvgGarbageTime)) *
        //     100;
      }
      if (yesterday.MaxGarbageTime && model.MaxGarbageTimeTd.value !== 0) {
        model.MaxGarbageTimeTd.differ =
          ((model.MaxGarbageTimeTd.value - yesterday.MaxGarbageTime) /
            model.MaxGarbageTimeTd.value) *
          100;
      }
      if (yesterday.GarbageDuration && model.GarbageDurationTd.value !== 0) {
        model.GarbageDurationTd.differ =
          ((model.GarbageDurationTd.value - yesterday.GarbageDuration) /
            model.GarbageDurationTd.value) *
          100;
      }

      if (yesterday.EventNumbers) {
        for (let i = 0; i < yesterday.EventNumbers.length; i++) {
          const item = yesterday.EventNumbers[i];
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
}
