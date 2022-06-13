import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { EventType } from 'src/app/enum/event-type.enum';
import { StatisticSummaryViewModel } from '../statistic-summary.model';
import { StatisticSummaryHeaderViewModel } from './statistic-summary-header.model';

export class StatisticSummaryHeaderConverter
  implements
    IConverter<StatisticSummaryViewModel[], StatisticSummaryHeaderViewModel>
{
  Convert(input: StatisticSummaryViewModel[]): StatisticSummaryHeaderViewModel {
    let vm = new StatisticSummaryHeaderViewModel();

    let max = 0;
    let gardeCount = 0;
    for (let i = 0; i < input.length; i++) {
      const statistic = input[i];
      if (statistic.EventNumbers) {
        for (let i = 0; i < statistic.EventNumbers.length; i++) {
          const event = statistic.EventNumbers[i];
          switch (event.EventType) {
            case EventType.IllegalDrop:
              vm.IllegalDrop += event.DayNumber;
              break;
            case EventType.MixedInto:
              vm.MixedInto += event.DayNumber;
              break;
            case EventType.GarbageDrop:
              vm.GarbageTotal += event.DayNumber;
              break;
            case EventType.GarbageDropHandle:
              vm.GarbageHandle += event.DayNumber;
              break;
            default:
              break;
          }
        }
      }
      max = Math.max(max, statistic.MaxGarbageTime);

      gardeCount += statistic.Garde;
    }
    if (vm.GarbageTotal > 0) {
      vm.GarbageHandleRatio = Math.ceil(
        (vm.GarbageHandle / vm.GarbageTotal) * 100
      );
    }

    if (input.length > 0) {
      vm.Garde = Math.round(gardeCount / input.length);
    }

    vm.GarbageTimeHour = Math.floor(max / 60);
    vm.GarbageTimeMinute = Math.ceil(max % 60);

    // vm.Garde = input.

    return vm;
  }
}
