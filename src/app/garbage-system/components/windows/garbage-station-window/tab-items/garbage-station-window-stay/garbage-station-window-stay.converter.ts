import { IPromiseConverter } from 'src/app/common/interfaces/converter.interface';
import { EventType } from 'src/app/enum/event-type.enum';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station/garbage-station-number-statistic-v2.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
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
      model.garde = source.GarbageRatio.toFixed(0);
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
          case EventType.GarbageDrop:
            model.taskCount = number.DayNumber;
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
