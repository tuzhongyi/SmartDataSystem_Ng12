import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { DivisionNumberStatistic } from 'src/app/network/model/garbage-station/division-number-statistic.model';

export class AuditStatisticArgs {
  unit: TimeUnit = TimeUnit.Hour;
  date: Date = new Date();
}
export class AuditStatisticStatistic {
  data?: DivisionNumberStatistic;
}
