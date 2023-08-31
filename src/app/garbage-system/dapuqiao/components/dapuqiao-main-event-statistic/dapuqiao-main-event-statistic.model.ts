import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { IChartPieData } from 'src/app/garbage-system/components/charts/pies/chart-pie-event-statistic/chart-pie-event-statistic.option';

export class DapuqiaoMainEventStatisticArgs {
  unit: TimeUnit = TimeUnit.Day;
}

export class DapuqiaoMainEventStatisticModel {
  /** 督办 */
  supervision: IChartPieData = {
    name: '督办率',
    value: 100,
    index: 1,
  };
  /** 反馈 */
  feedback: IChartPieData = {
    name: '反馈率',
    value: 100,
    index: 0,
  };
  statistic = {
    all: 0,
    feedback: 0,
    supervision: 0,
  };
}
