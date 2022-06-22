import {
  IConverter,
  IPromiseConverter,
} from 'src/app/common/interfaces/converter.interface';
import { EventType } from 'src/app/enum/event-type.enum';
import { Language } from 'src/app/common/tools/language';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station-number-statistic-v2.model';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station-number-statistic.model';
import { GarbageStationGarbageCountStatistic } from 'src/app/network/model/garbage-station-sarbage-count-statistic.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { GetGarbageStationStatisticNumbersParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationWindowStayModel } from './garbage-station-window-stay.model';

export class GarbageStationWindowStayConverter
  implements
    IPromiseConverter<
      GarbageStationNumberStatisticV2,
      GarbageStationWindowStayModel
    >
{
  async Convert(
    source: GarbageStationNumberStatisticV2,
    getter: { station: (id: string) => Promise<GarbageStation> }
  ): Promise<GarbageStationWindowStayModel> {
    let model = new GarbageStationWindowStayModel();
    if (source.AvgGarbageTime) {
      model.avgDropDuration = this.htmlFormat(source.AvgGarbageTime);
    }
    if (source.MaxGarbageTime) {
      model.maxDropDuration = this.htmlFormat(source.MaxGarbageTime);
    }
    if (source.GarbageRatio) {
      model.garde = source.GarbageRatio.toFixed(2);
    }
    if (source.GarbageDuration) {
      model.countDropDuration = this.htmlFormat(source.GarbageDuration);
    }

    model.station = await getter.station(source.Id);

    if (source.EventNumbers) {
      for (let i = 0; i < source.EventNumbers.length; i++) {
        const number = source.EventNumbers[i];
        switch (number.EventType) {
          case EventType.IllegalDrop:
            model.eventCount = number.DayNumber;
            break;
          default:
            break;
        }
      }
    }

    return model;
  }

  htmlFormat(minutes: number) {
    const hour = parseInt((minutes / 60).toString());
    const minute = parseInt((Math.ceil(minutes) % 60).toString());
    let m = `<div class="statistic-item-value-number">${minute}</div><div class="blue-text statistic-item-value-unit">分钟</div>`;
    let h = `<div class="statistic-item-value-number">${hour}</div><div class="blue-text statistic-item-value-unit">小时</div>`;
    let result = m;
    if (hour > 0) {
      result = h + m;
    }
    return result;
  }
}
