import {
  IConverter,
  IPromiseConverter,
} from 'src/app/common/interfaces/converter.interface';
import { EventType } from 'src/app/enum/event-type.enum';
import { Language } from 'src/app/global/tool/language';
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
      model.avgDropDuration = Language.Time(source.AvgGarbageTime);
    }
    if (source.MaxGarbageTime) {
      model.maxDropDuration = Language.Time(source.MaxGarbageTime);
    }
    if (source.Garde) {
      model.garde = source.Garde.toFixed(2);
    }
    if (source.GarbageDuration) {
      model.countDropDuration = Language.Time(source.GarbageDuration);
    }

    model.station = await getter.station(source.Id);

    if (source.EventNumbers) {
      for (let i = 0; i < source.EventNumbers.length; i++) {
        const number = source.EventNumbers[i];
        switch (number.EventType) {
          case EventType.GarbageDrop:
            model.eventCount;
            break;
          default:
            break;
        }
      }
    }
    return model;
  }
}
