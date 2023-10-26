import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { DivisionNumberStatisticV2 } from 'src/app/network/model/garbage-station/division-number-statistic-v2.model';
import { DivisionNumberStatistic } from 'src/app/network/model/garbage-station/division-number-statistic.model';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station/garbage-station-number-statistic-v2.model';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station/garbage-station-number-statistic.model';

export class DaPuQiaoGarbageDropStationCountTableArgs {
  date: Date = new Date();
  type: UserResourceType = UserResourceType.County;
  parentId?: string;
  unit: TimeUnit = TimeUnit.Day;
}

export class DivisionNumberStatisticModel extends DivisionNumberStatistic {
  [key: string]: any;
  Parent!: Promise<Division>;
  FeedbackRatio: number = 0;
  SupervisedRatio: number = 0;
}
export class DivisionNumberStatisticV2Model extends DivisionNumberStatisticV2 {
  [key: string]: any;
  Parent!: Promise<Division>;
  FeedbackRatio: number = 0;
  SupervisedRatio: number = 0;
}
export class GarbageStationNumberStatisticModel extends GarbageStationNumberStatistic {
  [key: string]: any;
  Parent!: Promise<Division>;
  FeedbackRatio: number = 0;
  SupervisedRatio: number = 0;
}
export class GarbageStationNumberStatisticV2Model extends GarbageStationNumberStatisticV2 {
  [key: string]: any;
  Parent!: Promise<Division>;
  FeedbackRatio: number = 0;
  SupervisedRatio: number = 0;
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

export enum DaPuQiaoGarbageDropStationCountTableSortKey {
  Name = 'Name',
  DivisionName = 'DivisionName',
  Level1Number = 'Level1Number',
  Level2Number = 'Level2Number',
  Level3Number = 'Level3Number',
  AllLevelNumber = 'AllLevelNumber',
  Level1FeedbackNumber = 'Level1FeedbackNumber',
  Level2FeedbackNumber = 'Level2FeedbackNumber',
  Level3FeedbackNumber = 'Level3FeedbackNumber',
  PropertyFeedbackNumber = 'PropertyFeedbackNumber',
  ThirdPartFeedbackNumber = 'ThirdPartFeedbackNumber',
  FeedbackNumber = 'FeedbackNumber',
  AvgFeedbackSeconds = 'AvgFeedbackSeconds',
  FeedbackRatio = 'FeedbackRatio',
  SupervisedNumber = 'SupervisedNumber',
  SupervisedRatio = 'SupervisedRatio',
}
