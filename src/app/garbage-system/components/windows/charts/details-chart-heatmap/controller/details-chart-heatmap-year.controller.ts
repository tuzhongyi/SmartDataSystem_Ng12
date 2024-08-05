import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Duration } from 'src/app/network/model/garbage-station/duration.model';
import { DetailsChartHeatmapModel } from '../details-chart-heatmap.model';
import { IDetailsChartHeatmapTimeController } from './details-chart-heatmap-controller.interface';

@Injectable()
export class DetailsChartHeatmapYearController
  implements IDetailsChartHeatmapTimeController
{
  tooltip() {
    return {
      formatter: (params: any) => {
        let data = params.data.data;

        return `${params.marker} ${data.value}次<br/>${formatDate(
          data.time,
          'yyyy年MM月dd日',
          'en'
        )}`;
      },
    };
  }
  loadAxisX(duration: Duration) {
    let months = [];
    for (let i = duration.begin.getMonth(); i <= duration.end.getMonth(); i++) {
      months.push(`${i + 1}月`);
    }
    return months;
  }
  loadAxisY() {
    let days = [];
    for (let i = 1; i <= 31; i++) {
      days.push(`${i.toString()}日`);
    }
    return days;
  }
  format(item: any): string {
    return item;
  }
  loadData(datas: DetailsChartHeatmapModel[]) {
    return datas.map((x) => {
      let day = x.time.getDate();
      let month = x.time.getMonth();

      return {
        data: x,
        value: [month, day - 1, x.value],
      };
    });
  }
  config(option: EChartsOption): void {}
}
