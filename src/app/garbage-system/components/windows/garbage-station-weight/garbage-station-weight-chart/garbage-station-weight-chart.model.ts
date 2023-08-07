import {
  BarSeriesOption,
  GridComponentOption,
  LegendComponentOption,
  LineSeriesOption,
  TitleComponentOption,
  TooltipComponentOption,
} from 'echarts';
import { XAXisOption } from 'echarts/types/dist/shared';
import { DateTimePickerView } from 'src/app/common/directives/date-time-picker/date-time-picker.directive';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { Language } from 'src/app/common/tools/language';
import { ChartType } from 'src/app/enum/chart-type.enum';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { EChartsTheme } from 'src/app/enum/echarts-theme.enum';
import { GarbageType } from 'src/app/enum/garbage-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { DivisionNumberStatisticV2 } from 'src/app/network/model/division-number-statistic-v2.model';
import { Division } from 'src/app/network/model/division.model';
import { Duration } from 'src/app/network/model/duration.model';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station-number-statistic-v2.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';

export type NumberStatisticV2 =
  | GarbageStationNumberStatisticV2
  | DivisionNumberStatisticV2;

export class GarbageStationWeightChartArgs {
  unit: TimeUnit = TimeUnit.Week;
  date: Date = new Date();
  type: GarbageStationWeightChartArgsType = {
    garbage: GarbageType.Dry,
    division: DivisionType.City,
    chart: ChartType.bar,
  };

  id!: string;
}

export interface GarbageStationWeightChartArgsType {
  garbage: GarbageType;
  division: DivisionType;
  chart: ChartType;
}

export class GarbageStationWeightChartDateArgs {
  format = 'yyyy年MM月dd日';
  view = DateTimePickerView.month;
  isweek = true;
}
export class GarbageStationWeightChartSelected {
  division?: Division;
  station?: GarbageStation;
}

export type EChartOptions = echarts.ComposeOption<
  | TitleComponentOption
  | GridComponentOption
  | LegendComponentOption
  | LineSeriesOption
  | BarSeriesOption
  | TooltipComponentOption
  | XAXisOption
>;

export class ChartConfig<T = any> {
  constructor(
    unit: TimeUnit,
    type: DivisionType,
    date: Date,
    legend?: LegendComponentOption,
    merge?: EChartOptions
  ) {
    this.options = this.getOption(unit, type, date, legend);
    this.merge = merge || {};
  }

  // static color = [
  //   '#00dc78',
  //   '#29a5f9',

  //   '#f46855',
  //   '#01edf5',
  //   '#ffba3b',
  //   '#21E452',
  // ];
  options: EChartOptions;

  merge: EChartOptions;
  theme: EChartsTheme = EChartsTheme.adsame;

  data?: T;

  getOption(
    unit: TimeUnit,
    type: DivisionType,
    date: Date,
    legend?: LegendComponentOption
  ): EChartOptions {
    let x = this.getX(unit, date);
    return {
      legend: legend,
      grid: {
        bottom: 40,
      },
      title: {
        show: true,
      },
      tooltip: {
        formatter: (v: any) => {
          let val = v[0].name;
          let suffix = type === DivisionType.None ? 'kg' : 't';

          for (let i = 0; i < v.length; i++) {
            val += `<br/> ${v[i].marker} ${v[i].seriesName} ${v[i].value}${suffix}`;
          }
          return val;
        },
      },
      xAxis: x,
      yAxis: {
        type: 'value',
        axisLabel: {
          show: true,
          color: '#fff',
          formatter: (v: any) => {
            if (type === DivisionType.None) {
              return `${v.toFixed(2)}kg`;
            }
            return `${v.toFixed(3)}t`;
          },
        },
      },
    };
  }

  getX(unit: TimeUnit, date: Date): XAXisOption | undefined {
    let interval: Duration;
    switch (unit) {
      case TimeUnit.Hour:
        return {
          mainType: 'xAxis',
          type: 'category',
          axisTick: {
            show: false,
          },
          data: [
            ...Array.from(
              { length: 25 },
              (v, i) => i.toString().padStart(2, '0') + ':00'
            ),
          ],
        };
      case TimeUnit.Month:
        interval = DateTimeTool.allMonth(date);

        return {
          mainType: 'xAxis',
          type: 'category',

          data: [
            ...Array.from(
              {
                length: interval.end.getDate() - interval.begin.getDate() + 1,
              },
              (v, i) => (i + 1).toString() + '日'
            ),
          ],
        };
      case TimeUnit.Week:
        interval = DateTimeTool.allWeek(date);

        return {
          mainType: 'xAxis',
          type: 'category',
          data: [...Array.from({ length: 7 }, (v, i) => Language.Week(i + 1))],
        };
      case TimeUnit.Year:
        interval = DateTimeTool.allYear(date);
        return {
          mainType: 'xAxis',
          type: 'category',
          data: [
            ...Array.from(
              {
                length: interval.end.getMonth() - interval.begin.getMonth() + 1,
              },
              (v, i) => (i + 1).toString() + '月'
            ),
          ],
        };
      default:
        break;
    }
    return undefined;
  }
}
