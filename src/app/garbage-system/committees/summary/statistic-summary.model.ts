import { DivisionNumberStatisticV2 } from 'src/app/network/model/garbage-station/division-number-statistic-v2.model';

export class StatisticSummaryViewModel extends DivisionNumberStatisticV2 {
  constructor(maxGarbageTime = 0, garde = 0) {
    super();
    this.MaxGarbageTime = maxGarbageTime;
    this.Garde = garde;
  }
  MaxGarbageTime: number;
  Garde: number;
}
