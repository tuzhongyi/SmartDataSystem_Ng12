import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { Duration } from 'src/app/network/model/garbage-station/duration.model';
import { DetailsChartHeatmapModel } from '../../details-chart-heatmap/details-chart-heatmap.model';
import { IDetailsChartHeatmap3DTimeController } from './details-chart-heatmap-3d-controller.interface';

@Injectable()
export class DetailsChartHeatmap3DYearController
  implements IDetailsChartHeatmap3DTimeController
{
  config(option: any): void {
    option.grid3D.boxWidth = 160;
    option.grid3D.boxDepth = 80;
    option.yAxis3D.name = '日期';
    option.xAxis3D.name = '月份';
    option.yAxis3D.axisLabel.interval = 0;
    option.xAxis3D.axisLabel.interval = 0;
  }

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

  loadData(datas: DetailsChartHeatmapModel[], max: number) {
    return datas.map((x) => {
      let day = x.time.getDate();
      let month = x.time.getMonth();

      let result: any = {
        data: x,
        value: [day - 1, month, x.value],
      };

      if (max > 0) {
        result.label = {
          show: x.value === max,
          fontSize: 16,
          textStyle: {
            color: '#fff',
          },
        };
      }

      return result;
    });
  }
  loadAxisX() {
    let days = [];
    for (let i = 1; i <= 31; i++) {
      days.push(`${i.toString()}`);
    }
    return days;
  }
  loadAxisY(duration: Duration) {
    let months = [];
    for (let i = duration.begin.getMonth(); i <= duration.end.getMonth(); i++) {
      months.push(`${i + 1}月`);
    }
    return months;
  }

  format(item: any): string {
    return item;
  }
}
