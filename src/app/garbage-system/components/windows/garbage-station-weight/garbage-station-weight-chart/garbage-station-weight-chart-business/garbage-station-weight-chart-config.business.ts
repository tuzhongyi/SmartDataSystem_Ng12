import { Injectable } from '@angular/core';
import { LegendComponentOption } from 'echarts';
import { CallbackDataParams } from 'echarts/types/dist/shared';
import { ITimeDataGroup } from 'src/app/common/components/charts/chart.model';
import { ChartType } from 'src/app/enum/chart-type.enum';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import {
  ChartConfig,
  EChartOptions,
  GarbageStationWeightChartArgs,
  NumberStatisticV2,
} from '../garbage-station-weight-chart.model';
import { GarbageStationWeightChartService } from '../garbage-station-weight-chart.service';
import { GarbageStationWeightChartConverter } from './garbage-station-weight-chart.converter';

@Injectable()
export class GarbageStationWeightChartConfigBusiness {
  constructor(private service: GarbageStationWeightChartService) {}

  async load(args: GarbageStationWeightChartArgs) {
    let data: NumberStatisticV2[];
    let item: Division | GarbageStation;
    if (args.type.division === DivisionType.None) {
      data = await this.service.station.getData(args);
      item = await this.service.station.get(args.id);
    } else {
      data = await this.service.division.getData(args);
      item = await this.service.division.get(args.id);
    }
    let config = await this.getConfig(args, data, item);
    return config;
  }

  async getConfig(
    args: GarbageStationWeightChartArgs,
    source: NumberStatisticV2[],
    item: Division | GarbageStation
  ) {
    let config = new ChartConfig<ITimeDataGroup<number>>(
      args.unit,
      args.type.division,
      args.date,
      this.echartsLegend
    );
    let data = this.converter.Convert(source, item, args);
    config.data = data;
    config.merge = this.getEChartsMerge(args.type.chart, data, args.unit);
    return config;
  }

  getEChartsMerge(
    type: ChartType,
    data: ITimeDataGroup<number>,
    unit: TimeUnit
  ): EChartOptions {
    switch (type) {
      case ChartType.line:
        return {
          series: {
            type: 'line',
            name: data.Name,
            data: data.datas.map((x) => x.value),
            smooth: true,
            label: {
              formatter: (params: CallbackDataParams) => {
                return params.value.toString();
              },
            },
          },
        };
      case ChartType.bar:
      default:
        let width = 30;
        switch (unit) {
          case TimeUnit.Month:
            width = 15;
            break;
          case TimeUnit.Hour:
            width = 20;
            break;
          default:
            break;
        }

        return {
          series: {
            type: 'bar',
            name: data.Name,
            data: data.datas.map((x) => x.value),
            barWidth: `${width}px`,
            barMinHeight: 5,
            label: {
              show: false,
              position: 'top',
              fontSize: '16px',
              textBorderWidth: 0,
              formatter: (params: CallbackDataParams) => {
                return params.value.toString() + 't';
              },
            },
          },
        };
    }
  }
  converter = new GarbageStationWeightChartConverter();
  echartsLegend: LegendComponentOption = {
    selectedMode: true,
    show: true,
    right: '20px',
    top: '20px',

    icon: '',
    orient: 'horizontal',
    textStyle: {
      color: '#fff',
    },
  };
}
