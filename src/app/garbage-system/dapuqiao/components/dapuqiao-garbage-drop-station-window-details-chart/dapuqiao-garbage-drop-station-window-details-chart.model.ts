import { EChartsOption } from 'echarts';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { IChartData } from 'src/app/garbage-system/components/charts/chart.model';
import { IChartLineModel } from 'src/app/garbage-system/components/charts/lines/chart-line-simple/chart-line-simple.option';
import { DivisionNumberStatisticV2 } from 'src/app/network/model/garbage-station/division-number-statistic-v2.model';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station/garbage-station-number-statistic-v2.model';

export class DapuqiaoGarbageDropStationWindowDetailsChartArgs {
  date: Date = new Date();
  divisionId?: string;
  stationId?: string;
  unit: TimeUnit = TimeUnit.Month;
}
export class DapuqiaoGarbageDropStationWindowDetailsChartModel
  implements IChartLineModel
{
  data!: IChartData<number[]>;
  option: EChartsOption = {};

  x: string[] = [];
}

export type NumberStatistic =
  | DivisionNumberStatisticV2
  | GarbageStationNumberStatisticV2;

export enum DapuqiaoGarbageDropStationWindowDetailsChartItemKey {
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
export enum DapuqiaoGarbageDropStationWindowDetailsChartItemLanguage {
  Level1Number = '一级事件数量',
  Level2Number = '二级事件数量',
  Level3Number = '三级事件数量',
  AllLevelNumber = '全部事件数量',
  Level1FeedbackNumber = '一级事件后反馈数量',
  Level2FeedbackNumber = '二级事件后反馈数量',
  Level3FeedbackNumber = '三级事件后反馈数量',
  PropertyFeedbackNumber = '物业反馈数量',
  ThirdPartFeedbackNumber = '第三方反馈数量',
  FeedbackNumber = '全部事件反馈数量',
  AvgFeedbackSeconds = '平均反馈时长',
  FeedbackRatio = '反馈率',
  SupervisedNumber = '督办事件数量',
  SupervisedRatio = '三级事件督办率',
}
