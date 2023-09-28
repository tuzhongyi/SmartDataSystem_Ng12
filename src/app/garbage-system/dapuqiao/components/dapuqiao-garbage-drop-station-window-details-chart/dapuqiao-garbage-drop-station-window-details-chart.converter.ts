import { Injectable } from '@angular/core';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { Language } from 'src/app/common/tools/language';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { IChartBarData } from 'src/app/garbage-system/components/charts/bars/chart-bar-simple/chart-bar-simple.option';
import { IChartData } from 'src/app/garbage-system/components/charts/chart.model';
import { Duration } from 'src/app/network/model/duration.model';
import {
  DapuqiaoGarbageDropStationWindowDetailsChartItemKey,
  DapuqiaoGarbageDropStationWindowDetailsChartItemLanguage,
  NumberStatistic,
} from './dapuqiao-garbage-drop-station-window-details-chart.model';

@Injectable()
export class DapuqiaoGarbageDropStationWindowDetailsChartConverter {
  x = new XConverter();
  data = new DataConverter();
}

class DataConverter {
  convert(
    input: NumberStatistic[],
    key: DapuqiaoGarbageDropStationWindowDetailsChartItemKey
  ): IChartData<number[]> {
    let data: IChartData<number[]> = {
      name: DapuqiaoGarbageDropStationWindowDetailsChartItemLanguage[key],
      value: input.map((x) => {
        if (x.Level3Statistic) {
          switch (key) {
            case DapuqiaoGarbageDropStationWindowDetailsChartItemKey.Level1Number:
              return x.Level3Statistic.Level1Number ?? 0;
            case DapuqiaoGarbageDropStationWindowDetailsChartItemKey.Level2Number:
              return x.Level3Statistic.Level2Number ?? 0;
            case DapuqiaoGarbageDropStationWindowDetailsChartItemKey.Level3Number:
              return x.Level3Statistic.Level3Number ?? 0;
            case DapuqiaoGarbageDropStationWindowDetailsChartItemKey.AllLevelNumber:
              return x.Level3Statistic.AllLevelNumber ?? 0;
            case DapuqiaoGarbageDropStationWindowDetailsChartItemKey.Level1FeedbackNumber:
              return x.Level3Statistic.Level1FeedbackNumber ?? 0;
            case DapuqiaoGarbageDropStationWindowDetailsChartItemKey.Level2FeedbackNumber:
              return x.Level3Statistic.Level2FeedbackNumber ?? 0;
            case DapuqiaoGarbageDropStationWindowDetailsChartItemKey.Level3FeedbackNumber:
              return x.Level3Statistic.Level3FeedbackNumber ?? 0;
            case DapuqiaoGarbageDropStationWindowDetailsChartItemKey.PropertyFeedbackNumber:
              return x.Level3Statistic.PropertyFeedbackNumber ?? 0;
            case DapuqiaoGarbageDropStationWindowDetailsChartItemKey.ThirdPartFeedbackNumber:
              return x.Level3Statistic.ThirdPartFeedbackNumber ?? 0;
            case DapuqiaoGarbageDropStationWindowDetailsChartItemKey.FeedbackNumber:
              return x.Level3Statistic.FeedbackNumber ?? 0;
            case DapuqiaoGarbageDropStationWindowDetailsChartItemKey.AvgFeedbackSeconds:
              return x.Level3Statistic.AvgFeedbackSeconds ?? 0;
            case DapuqiaoGarbageDropStationWindowDetailsChartItemKey.FeedbackRatio:
              if (x.Level3Statistic.AllLevelNumber) {
                let value =
                  (x.Level3Statistic.FeedbackNumber ?? 0) /
                  x.Level3Statistic.AllLevelNumber;
                return Math.round(value * 10000) / 100;
              }
              return 100;

            case DapuqiaoGarbageDropStationWindowDetailsChartItemKey.SupervisedNumber:
              return x.Level3Statistic.SupervisedNumber ?? 0;
            case DapuqiaoGarbageDropStationWindowDetailsChartItemKey.SupervisedRatio:
              if (x.Level3Statistic.Level3Number) {
                let value =
                  (x.Level3Statistic.SupervisedNumber ?? 0) /
                  x.Level3Statistic.Level3Number;
                return Math.round(value * 10000) / 100;
              }
              return 100;
            default:
              break;
          }
        }
        return 0;
      }),
    };
    return data;
  }
  convertToBar(
    input: NumberStatistic,
    key: DapuqiaoGarbageDropStationWindowDetailsChartItemKey
  ): IChartBarData {
    throw new Error();
  }
}

class XConverter {
  convert(date: Date, unit: TimeUnit) {
    let duration = DateTimeTool.TimeUnit(unit, date);
    switch (unit) {
      case TimeUnit.Year:
        return this.year(duration);
      case TimeUnit.Week:
        return this.week(duration);
      case TimeUnit.Month:
        return this.month(duration);
      default:
        return [];
    }
  }

  year(duration: Duration) {
    let result: string[] = [];
    for (let i = duration.begin.getMonth(); i <= duration.end.getMonth(); i++) {
      result.push(`${(i + 1).toString().padStart(2, '0')}月`);
    }
    return result;
  }
  week(duration: Duration) {
    let result: string[] = [];
    for (let i = duration.begin.getDay(); i <= duration.end.getDay(); i++) {
      result.push(Language.Week(i));
    }
    return result;
  }
  month(duration: Duration) {
    let result: string[] = [];
    for (let i = duration.begin.getDate(); i <= duration.end.getDate(); i++) {
      result.push(`${i.toString().padStart(2, '0')}日`);
    }
    return result;
  }
}
