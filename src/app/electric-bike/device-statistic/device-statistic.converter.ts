import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { EventType } from 'src/app/enum/event-type.enum';
import { DivisionNumberStatistic } from 'src/app/network/model/division-number-statistic.model';
import { DeviceStatisticModel } from './device-statistic.model';

export class DeviceStatisticConverter
  implements IConverter<DivisionNumberStatistic, DeviceStatisticModel>
{
  Convert(
    source: DivisionNumberStatistic,
    ...res: any[]
  ): DeviceStatisticModel {
    let model = new DeviceStatisticModel();
    model.all = source.StationNumber;
    model.offline = source.OfflineCameraNumber;
    model.online = source.CameraNumber - source.OfflineCameraNumber;
    if (source.TodayEventNumbers) {
      let smoke = source.TodayEventNumbers.find(
        (x) => x.EventType == EventType.Smoke
      );
      if (smoke) {
        model.smoke = smoke.DayNumber;
      }
    }
    return model;
  }
}
