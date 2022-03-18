import { TimeUnit } from "src/app/enum/time-unit.enum";
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
import { XAXisOption } from "echarts/types/dist/shared";
import { IntervalParams } from "src/app/network/request/IParams.interface";
import { Language } from "src/app/global/tool/language";
import { UserResourceType } from "src/app/enum/user-resource-type.enum";

type EChartOptions = echarts.ComposeOption<
  | TitleComponentOption
  | GridComponentOption
  | LegendComponentOption
  | LineSeriesOption
  | BarSeriesOption
  | TooltipComponentOption
  | XAXisOption
>;


 export class ChartConfig {
    constructor(unit: TimeUnit, date: Date) {
      this.options = this.getOption(unit, date);
    }
  
    theme: EChartsTheme = EChartsTheme.adsame;
  
    getOption(unit: TimeUnit, date: Date): EChartOptions {
      let x = this.getX(unit, date);
      return {
        legend: {
          formatter: function () {
            return '单位(起)';
          },
        },
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
  
    merge: EChartOptions = {};
  
    getX(unit: TimeUnit, date: Date): XAXisOption | undefined {
      let interval: IntervalParams;
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
          interval = IntervalParams.allMonth(date);
  
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
          interval = IntervalParams.allWeek(date);
  
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