import { Injectable } from '@angular/core';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { EventType } from 'src/app/enum/event-type.enum';
import { StatisticSummaryViewModel } from 'src/app/garbage-system/committees/summary/statistic-summary.model';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station/garbage-station-number-statistic-v2.model';
import { AuditStatisticEventData } from './audit-statistic-event.model';
import { AuditStatisticEventService } from './audit-statistic-event.service';

@Injectable()
export class AuditStatisticEventBusiness {
  constructor(private service: AuditStatisticEventService) {}

  async load(division: Division) {
    let data = new AuditStatisticEventData();
    data.stationStatistic = await this.service.station.history(division.Id);
    data.divisionStatistic = await this.header(
      division.Id,
      data.stationStatistic
    );
    data.divisionHistory = await this.service.division.history(division.Id);
    if (division.DivisionType === DivisionType.Committees) {
      data.children = data.stationStatistic;
    } else {
      data.children = await this.service.division.children(division.Id);
    }
    return data;
  }

  default() {
    return this.service.division.default();
  }

  async header(
    divisionId: string,
    stations: GarbageStationNumberStatisticV2[]
  ) {
    let x = await this.service.division.today(divisionId);

    let array = [];
    for (let i = 0; i < x.length; i++) {
      const divisionStatistic = x[i];

      let maxGarbageTime = 0;
      let count = 0;
      let timeout = 0;
      let garde = 0;
      stations.forEach((x) => {
        maxGarbageTime = Math.max(maxGarbageTime, x.MaxGarbageTime ?? 0);
        x.EventNumbers;
        if (x.EventNumbers) {
          for (let i = 0; i < x.EventNumbers.length; i++) {
            const number = x.EventNumbers[i];
            switch (number.EventType) {
              case EventType.GarbageDrop:
                count += number.DayNumber;
                break;
              case EventType.GarbageDropTimeout:
              case EventType.GarbageDropSuperTimeout:
                timeout += number.DayNumber;
                break;
              default:
                break;
            }
          }
        }
      });
      if (count > 0) {
        garde = Math.ceil((1 - timeout / count) * 100);
      }
      array[i] = new StatisticSummaryViewModel(maxGarbageTime, garde);
      array[i] = Object.assign(array[i], divisionStatistic);
    }
    return array;
  }

  history(divisionId: string) {}
}
