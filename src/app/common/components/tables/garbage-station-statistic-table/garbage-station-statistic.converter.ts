import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { IPromiseConverter } from 'src/app/common/interfaces/converter.interface';
import { Language } from 'src/app/common/tools/language';
import { EventType } from 'src/app/enum/event-type.enum';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station/garbage-station-number-statistic-v2.model';
import { GarbageStationStatisticTableService } from './garbage-station-statistic-table.service';
import {
  GarbageStationStatisticModel,
  GarbageStationStatisticTableSource,
} from './garbage-station-statistic.model';

@Injectable()
export class GarbageStationStatisticArrayConverter
  implements
    IPromiseConverter<
      GarbageStationStatisticTableSource,
      GarbageStationStatisticModel[]
    >
{
  constructor(private service: GarbageStationStatisticTableService) {}
  converter = {
    item: new GarbageStationStatisticConverter(this.service),
  };
  async Convert(
    source: GarbageStationStatisticTableSource
  ): Promise<GarbageStationStatisticModel[]> {
    let array: GarbageStationStatisticModel[] = [];

    if (source.current) {
      for (let i = 0; i < source.current.length; i++) {
        let current = source.current[i];
        let item = await this.converter.item.Convert(
          current,
          source.before!.find((x) => x.Id === current.Id)
        );
        array.push(item);
      }
    }
    return array;
  }
}

export class GarbageStationStatisticConverter
  implements
    IPromiseConverter<
      GarbageStationNumberStatisticV2,
      GarbageStationStatisticModel
    >
{
  constructor(private service: GarbageStationStatisticTableService) {}

  async Convert(
    today: GarbageStationNumberStatisticV2,
    before?: GarbageStationNumberStatisticV2
  ): Promise<GarbageStationStatisticModel> {
    let plain = instanceToPlain(today);
    let model = plainToInstance(GarbageStationStatisticModel, plain);

    if (model.GarbageRatio) {
      model.GarbageRatioTd.value = model.GarbageRatio;
      if (model.GarbageRatio === 100) {
        model.GarbageRatioTd.format = model.GarbageRatio.toFixed(0);
      } else {
        model.GarbageRatioTd.format = model.GarbageRatio.toFixed(2);
      }
    }

    model.AvgGarbageTimeTd.value = model.AvgGarbageTime ?? 0;
    model.AvgGarbageTimeTd.format = Language.Time(model.AvgGarbageTime ?? 0);

    model.MaxGarbageTimeTd.value = model.MaxGarbageTime ?? 0;
    model.MaxGarbageTimeTd.format = Language.Time(model.MaxGarbageTime ?? 0);

    model.GarbageDurationTd.value = model.GarbageDuration ?? 0;
    model.GarbageDurationTd.format = Language.Time(model.GarbageDuration ?? 0);

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
        let abs = Math.abs(model.GarbageRatioTd.differ);
        if (
          model.GarbageRatioTd.value === 100 ||
          model.GarbageRatioTd.value === 0
        ) {
          model.GarbageRatioTd.differView = abs.toFixed(0);
        } else {
          model.GarbageRatioTd.differView = abs.toFixed(2);
        }
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

    model.GarbageStation = this.service.getStation(model.Id);

    model.GarbageStation.then((station) => {
      if (station.DivisionId) {
        model.Committees = this.service.division.cache.get(station.DivisionId);
        model.Committees.then((committees) => {
          if (committees.ParentId) {
            model.County = this.service.division.cache.get(committees.ParentId);
          }
        });
      }
    });

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
