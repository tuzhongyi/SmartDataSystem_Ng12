import { StatisticSummaryViewModel } from 'src/app/garbage-system/committees/summary/statistic-summary.model';
import { DivisionNumberStatisticV2 } from 'src/app/network/model/garbage-station/division-number-statistic-v2.model';
import { EventNumberStatistic } from 'src/app/network/model/garbage-station/event-number-statistic.model';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station/garbage-station-number-statistic-v2.model';

export class AuditStatisticEventData {
  divisionStatistic: StatisticSummaryViewModel[] = [
    new StatisticSummaryViewModel(),
  ];
  stationStatistic: GarbageStationNumberStatisticV2[] = [];

  divisionHistory: EventNumberStatistic[] = [];
  children: (DivisionNumberStatisticV2 | GarbageStationNumberStatisticV2)[] =
    [];
}
