import { Injectable } from '@angular/core';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { EventType } from 'src/app/enum/event-type.enum';
import { DivisionNumberStatisticV2 } from 'src/app/network/model/garbage-station/division-number-statistic-v2.model';
import { DivisionNumberStatistic } from 'src/app/network/model/garbage-station/division-number-statistic.model';
import { EventNumber } from 'src/app/network/model/garbage-station/event-number.model';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station/garbage-station-number-statistic-v2.model';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station/garbage-station-number-statistic.model';
import { GarbageDropRecordTaskTableModel } from './garbage-drop-record-task-table.model';

@Injectable()
export class GarbageDropRecordTaskTableConverter {
  constructor(private global: GlobalStorageService) {}

  Convert(
    source:
      | DivisionNumberStatistic
      | GarbageStationNumberStatistic
      | DivisionNumberStatisticV2
      | GarbageStationNumberStatisticV2
  ): GarbageDropRecordTaskTableModel {
    if (
      source instanceof GarbageStationNumberStatisticV2 ||
      source instanceof DivisionNumberStatisticV2
    ) {
      return this.history(source);
    } else {
      return this.today(source);
    }
  }

  history(source: DivisionNumberStatisticV2 | GarbageStationNumberStatisticV2) {
    let model = this.number(source.EventNumbers);
    model.name = source.Name;
    return model;
  }
  today(source: DivisionNumberStatistic | GarbageStationNumberStatistic) {
    let model = this.number(source.TodayEventNumbers);
    model.name = source.Name;
    return model;
  }

  number(numbers?: EventNumber[]) {
    let model = new GarbageDropRecordTaskTableModel();
    if (numbers) {
      let GarbageDropHandleCount = 0;
      let GarbageDropTimeoutCount = 0;

      numbers.forEach((x) => {
        if (x.EventType == EventType.GarbageDrop) {
          model.count = x.DayNumber;
        } else if (x.EventType == EventType.GarbageDropHandle) {
          GarbageDropHandleCount = x.DayNumber;
        } else if (
          x.EventType ==
          (this.global.defaultDivisionType === DivisionType.City
            ? EventType.GarbageDropSuperTimeout
            : EventType.GarbageDropTimeout)
        ) {
          GarbageDropTimeoutCount = x.DeltaNumber ?? 0;
        }
      });

      model.timeout = GarbageDropTimeoutCount;
      model.unhandle = model.count - GarbageDropHandleCount;
      model.ratio = '100%';
      let ratio = (GarbageDropHandleCount / model.count) * 100;
      if (!Number.isNaN(ratio)) model.ratio = ratio.toFixed(2) + '%';
    }
    return model;
  }
}
