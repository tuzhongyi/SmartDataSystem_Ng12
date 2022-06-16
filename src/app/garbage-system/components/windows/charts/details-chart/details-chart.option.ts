import { TimeUnit } from 'src/app/enum/time-unit.enum';
import * as echarts from 'echarts/core';
import { EChartsTheme } from 'src/app/enum/echarts-theme.enum';
import {
  BarSeriesOption,
  GridComponentOption,
  LegendComponentOption,
  LineSeriesOption,
  TitleComponentOption,
  TooltipComponentOption,
} from 'echarts';
import { LegendOption, XAXisOption } from 'echarts/types/dist/shared';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { Language } from 'src/app/global/tool/language';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';

export type EChartOptions = echarts.ComposeOption<
  | TitleComponentOption
  | GridComponentOption
  | LegendComponentOption
  | LineSeriesOption
  | BarSeriesOption
  | TooltipComponentOption
  | XAXisOption
>;

export class ChartConfig {
  constructor(
    unit: TimeUnit,
    date: Date,
    legend?: LegendComponentOption,
    merge?: EChartOptions
  ) {
    this.options = this.getOption(unit, date, legend);
    this.merge = merge || {};
  }

  theme: EChartsTheme = EChartsTheme.adsame;
  static color = ['#7586e0', '#ffba00', '#21E452'];
  getOption(
    unit: TimeUnit,
    date: Date,
    legend?: LegendComponentOption
  ): EChartOptions {
    let x = this.getX(unit, date);
    return {
      color: ChartConfig.color,
      legend: legend,
      title: {
        show: false,
      },
      tooltip: {},
      xAxis: x,
      yAxis: {
        type: 'value',
      },
    };
  }

  options: EChartOptions;

  merge: EChartOptions;

  getX(unit: TimeUnit, date: Date): XAXisOption | undefined {
    let interval: DurationParams;
    switch (unit) {
      case TimeUnit.Hour:
        return {
          mainType: 'xAxis',
          type: 'category',

          data: [
            ...Array.from(
              { length: 25 },
              (v, i) => i.toString().padStart(2, '0') + ':00'
            ),
          ],
        };
      case TimeUnit.Month:
        interval = DurationParams.allMonth(date);

        return {
          mainType: 'xAxis',
          type: 'category',

          data: [
            ...Array.from(
              {
                length:
                  interval.EndTime.getDate() - interval.BeginTime.getDate() + 1,
              },
              (v, i) => (i + 1).toString() + '日'
            ),
          ],
        };
      case TimeUnit.Week:
        interval = DurationParams.allWeek(date);

        return {
          mainType: 'xAxis',
          type: 'category',

          data: [...Array.from({ length: 7 }, (v, i) => Language.Week(i + 1))],
        };
      default:
        break;
    }
    return undefined;
  }
}
