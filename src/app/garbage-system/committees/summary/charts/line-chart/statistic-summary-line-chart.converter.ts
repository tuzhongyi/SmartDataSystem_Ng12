import { formatDate } from '@angular/common';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { Language } from 'src/app/common/tools/language';
import { EventType } from 'src/app/enum/event-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { EventNumberStatistic } from 'src/app/network/model/garbage-station/event-number-statistic.model';
import { StatisticSummaryLineChartViewModel } from './statistic-summary-line-chart.model';

export class StatisticSummaryIllegalDropChartConverter
  implements
    IConverter<EventNumberStatistic[], StatisticSummaryLineChartViewModel>
{
  Convert(
    input: EventNumberStatistic[],
    eventType: EventType,
    unit: TimeUnit
  ): StatisticSummaryLineChartViewModel {
    let vm = new StatisticSummaryLineChartViewModel();
    vm.title = Language.EventType(eventType);
    vm.type = eventType;
    if (input.length > 0) {
      vm.xAxis = this.getXAxis(input[0].BeginTime, unit);
    }
    // 补0
    switch (unit) {
      case TimeUnit.Hour:
        vm.data.push(0);
        break;
      case TimeUnit.Day:
        break;
      default:
        break;
    }

    for (let i = 0; i < input.length; i++) {
      const statistic = input[i];
      let number = statistic.EventNumbers.find(
        (x) => x.EventType === eventType
      );
      if (number) {
        let strDate = formatDate(
          statistic.BeginTime,
          this.getDateFormat(unit),
          'en'
        );
        vm.xAxis[i] = strDate ? strDate : '';

        vm.data.push(number.DeltaNumber ? number.DeltaNumber : 0);
      }
    }
    return vm;
  }

  getXAxis(date: Date, unit: TimeUnit) {
    let axis = new Array<string>();
    switch (unit) {
      case TimeUnit.Hour:
        for (let i = 0; i <= 24; i++) {
          axis.push(`${i}:00`);
        }
        break;
      case TimeUnit.Day:
        let next = new Date(date.getFullYear(), date.getMonth() + 1);
        next.setSeconds(-1);
        let last = next.getDate();
        for (let i = 0; i < last; i++) {
          axis.push(`${i + 1}日`);
        }

        break;
      default:
        break;
    }
    return axis;
  }

  getDateFormat(unit: TimeUnit) {
    switch (unit) {
      case TimeUnit.Hour:
        return 'H:mm';
      case TimeUnit.Day:
        return 'd日';

      default:
        return '';
    }
  }
}
