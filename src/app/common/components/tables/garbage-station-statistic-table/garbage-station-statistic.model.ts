import { Division } from 'src/app/network/model/division.model';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station-number-statistic-v2.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';

export class GarbageStationStatisticModel extends GarbageStationNumberStatisticV2 {
  [key: string]: any;

  GarbageRatioTd = new GarbageStationStatisticTd();

  AvgGarbageTimeTd = new GarbageStationStatisticTd();

  MaxGarbageTimeTd = new GarbageStationStatisticTd();

  GarbageDurationTd = new GarbageStationStatisticTd();

  IllegalDropTd = new GarbageStationStatisticTd();

  IllegalDrop = 0;
  MixedInto = 0;

  MixedIntoTd = new GarbageStationStatisticTd();

  GarbageStation?: GarbageStation;
  Committees?: Division;
  County?: Division;
}

export class GarbageStationStatisticTd {
  value: number = 0;
  format: string = '0';
  differ: number = 0;
}

export class GarbageStationStatisticTableSource {
  current?: GarbageStationNumberStatisticV2[];
  before?: GarbageStationNumberStatisticV2[];
}
