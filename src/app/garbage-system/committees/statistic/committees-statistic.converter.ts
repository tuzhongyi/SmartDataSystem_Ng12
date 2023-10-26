import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { EventType } from 'src/app/enum/event-type.enum';
import { DivisionNumberStatistic } from 'src/app/network/model/garbage-station/division-number-statistic.model';
import { CommitteesStatisticViewModel } from './committees-statistic.model';

export class CommitteesStatisticConverter
  implements IConverter<DivisionNumberStatistic, CommitteesStatisticViewModel>
{
  Convert(statistic: DivisionNumberStatistic) {
    let vm = new CommitteesStatisticViewModel();

    vm.CameraCount = statistic.CameraNumber;
    vm.OfflineCount = statistic.OfflineCameraNumber;
    vm.OnlineCount = statistic.CameraNumber - statistic.OfflineCameraNumber;
    vm.StationCount = statistic.StationNumber;
    vm.StationDropCount = statistic.GarbageDropStationNumber ?? 0;
    vm.StationFullCount =
      statistic.WetFullStationNumber + statistic.DryFullStationNumber;

    if (statistic.TodayEventNumbers) {
      statistic.TodayEventNumbers.forEach((x) => {
        switch (x.EventType) {
          case EventType.IllegalDrop:
            vm.IllegalDropCount = x.DayNumber;
            break;
          case EventType.MixedInto:
            vm.MixedIntoCount = x.DayNumber;
            break;
          default:
            break;
        }
      });
    }
    return vm;
  }
}
