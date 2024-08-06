import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { DateTimeTool } from 'src/app/common/tools/date-time-tool/datetime.tool';
import { Duration } from 'src/app/network/model/garbage-station/duration.model';
import { DetailsChartHeatmapModel } from '../../details-chart-heatmap/details-chart-heatmap.model';
import { IDetailsChartHeatmap3DTimeController } from './details-chart-heatmap-3d-controller.interface';

@Injectable()
export class DetailsChartHeatmap3DMonthController
  implements IDetailsChartHeatmap3DTimeController
{
  config(option: any): void {
    option.grid3D.boxWidth = 100;
    option.grid3D.boxDepth = 160;
    option.xAxis3D.name = '时间';
    option.yAxis3D.name = '日期';
    option.xAxis3D.axisLabel.interval = 1;
    option.yAxis3D.axisLabel.interval = 0;
  }

  tooltip() {
    return {
      formatter: (params: any) => {
        let value = params.value[2];
        if (!value) {
          return '';
        }

        let data = params.data.data;

        return `${params.marker} ${value}次<br/>${formatDate(
          data.time,
          'yyyy年MM月dd日 HH点',
          'en'
        )}`;
      },
    };
  }

  loadData(datas: DetailsChartHeatmapModel[], max: number) {
    return datas.map((x) => {
      let hour = x.time.getHours();
      let date = x.time.getDate();
      let weekindex = DateTimeTool.month.week.getMonthWeek(x.time) - 1;
      let index = date - 1;
      index += weekindex;
      let result: any = {
        data: x,
        value: [hour, index, x.value],
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
    let times = [];
    for (let i = 0; i < 24; i++) {
      let time = i.toString().padStart(2, '0');
      times.push(`${time}:00`);
    }
    return times;
  }
  loadAxisY(duration: Duration) {
    let time = duration.end.getTime() - duration.begin.getTime();
    let day = time / 1000 / 60 / 60 / 24;
    let datas = [];
    for (let i = 0; i < day; i++) {
      let today = new Date(duration.begin.getTime() + i * 24 * 60 * 60 * 1000);
      let week = today.getDay();
      datas.push(formatDate(today, 'yyyy-MM-dd', 'en'));
      if (week === 0 && today.getDate() != DateTimeTool.month.last(today)) {
        datas.push('');
      }
    }
    return datas;
  }

  format(item: any) {
    if (!item) return '';
    const date = new Date(item);
    let day = date.getDay();
    let weekend = day === 0 || day === 6 ? 'weekend' : 'weekday';
    return `{${weekend}|${date.getDate()}}`;
  }
}
