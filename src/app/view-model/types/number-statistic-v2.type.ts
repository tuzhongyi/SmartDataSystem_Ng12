import { DivisionNumberStatisticV2 } from 'src/app/network/model/garbage-station/division-number-statistic-v2.model';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station/garbage-station-number-statistic-v2.model';

export type NumberStatisticV2Type =
  | GarbageStationNumberStatisticV2
  | DivisionNumberStatisticV2;
