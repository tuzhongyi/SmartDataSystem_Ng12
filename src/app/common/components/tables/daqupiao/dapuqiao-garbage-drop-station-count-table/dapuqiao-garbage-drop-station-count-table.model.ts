import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { DivisionNumberStatisticV2 } from 'src/app/network/model/division-number-statistic-v2.model';
import { DivisionNumberStatistic } from 'src/app/network/model/division-number-statistic.model';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station-number-statistic-v2.model';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station-number-statistic.model';

export class DaPuQiaoGarbageDropStationCountTableArgs {
  date: Date = new Date();
  type: UserResourceType = UserResourceType.County;
  parentId?: string;
  unit: TimeUnit = TimeUnit.Day;
}

export class DivisionNumberStatisticModel extends DivisionNumberStatistic {
  Parent!: Promise<Division>;
}
export class DivisionNumberStatisticV2Model extends DivisionNumberStatisticV2 {
  Parent!: Promise<Division>;
}
export class GarbageStationNumberStatisticModel extends GarbageStationNumberStatistic {
  Parent!: Promise<Division>;
}
export class GarbageStationNumberStatisticV2Model extends GarbageStationNumberStatisticV2 {
  Parent!: Promise<Division>;
}

export type NumberStatistic =
  | DivisionNumberStatistic
  | DivisionNumberStatisticV2
  | GarbageStationNumberStatistic
  | GarbageStationNumberStatisticV2;

export type NumberStatisticModel =
  | DivisionNumberStatisticModel
  | DivisionNumberStatisticV2Model
  | GarbageStationNumberStatisticModel
  | GarbageStationNumberStatisticV2Model;
