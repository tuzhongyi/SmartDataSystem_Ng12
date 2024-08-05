import { Injectable } from '@angular/core';
import { EnumTool } from 'src/app/common/tools/enum-tool/enum.tool';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { EventType } from 'src/app/enum/event-type.enum';

import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { DateTimeTool } from 'src/app/common/tools/date-time-tool/datetime.tool';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { Duration } from 'src/app/network/model/garbage-station/duration.model';
import { RankModel } from 'src/app/view-model/rank.model';
import { IllegalMixintoRankConverter } from '../illegal-mixinto-rank.converter';
import { NumberStatisticModel } from '../illegal-mixinto-rank.model';
import { IllegalMixintoRankDivisionBusiness } from './illegal-mixinto-rank-division.business';
import { IllegalMixintoRankStationBusiness } from './illegal-mixinto-rank-station.business';

@Injectable()
export class IllegalMixintoRankBusiness {
  constructor(
    private division: IllegalMixintoRankDivisionBusiness,
    private station: IllegalMixintoRankStationBusiness,
    private global: GlobalStorageService
  ) {}

  private converter = new IllegalMixintoRankConverter();

  async getData(divisionId: string, type: DivisionType, unit: TimeUnit) {
    let today = await this.today(divisionId, type);
    if (unit === TimeUnit.Day) {
      return today;
    }
    let duration = DateTimeTool.TimeUnit(unit, new Date());
    let history = await this.history(divisionId, type, unit, duration);
    history.map((history) => {
      if (history.EventNumbers) {
        let current = today.find((y) => y.Id === history.Id);
        if (!current || !current.EventNumbers) {
          return history;
        }
        for (let i = 0; i < history.EventNumbers.length; i++) {
          const item = history.EventNumbers[i];
          let index = current.EventNumbers.findIndex(
            (x) => x.EventType === item.EventType
          );
          if (index < 0) continue;
          history.EventNumbers[i].DayNumber +=
            current.EventNumbers[index].DayNumber;
        }
      }
      return history;
    });
    return history;
  }

  async history(
    divisionId: string,
    type: DivisionType,
    unit: TimeUnit,
    duration: Duration
  ) {
    switch (type) {
      case DivisionType.County:
      case DivisionType.Committees:
        return this.division.history(divisionId, type, unit, duration);
      case DivisionType.None:
        return this.station.history(divisionId, unit, duration);
      default:
        throw new Error();
    }
  }

  async today(divisionId: string, type: DivisionType) {
    switch (type) {
      case DivisionType.County:
      case DivisionType.Committees:
        return this.division.today(divisionId, type);
      case DivisionType.None:
        return this.station.today(divisionId);
      default:
        throw new Error();
    }
  }

  async load(
    divisionId: string,
    eventType: EventType,
    unit: TimeUnit
  ): Promise<RankModel[]> {
    let type = EnumTool.division.child(this.global.divisionType);
    let data = await this.getData(divisionId, type, unit);
    while (data.length < 6) {
      let item = new NumberStatisticModel();
      item.Name = '-';
      data.push(item);
    }
    let result = this.converter.Convert(data, eventType);

    return result.sort((a, b) => {
      return b.value - a.value;
    });
  }
}

export const IllegalMixintoRankBusinessProviders = [
  IllegalMixintoRankBusiness,
  IllegalMixintoRankDivisionBusiness,
  IllegalMixintoRankStationBusiness,
];
