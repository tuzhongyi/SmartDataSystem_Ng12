import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { EChartsOption } from 'echarts';
import { DateTimeTool } from 'src/app/common/tools/date-time-tool/datetime.tool';
import { Duration } from 'src/app/network/model/garbage-station/duration.model';
import { DetailsChartHeatmapModel } from '../details-chart-heatmap.model';
import { IDetailsChartHeatmapTimeController } from './details-chart-heatmap-controller.interface';

@Injectable()
export class DetailsChartHeatmapMonthController
  implements IDetailsChartHeatmapTimeController
{
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
  loadAxisX(duration: Duration): string[] {
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
  loadAxisY(): string[] {
    let times = [];
    for (let i = 0; i < 24; i++) {
      let time = i.toString().padStart(2, '0');
      let next = (i + 1).toString().padStart(2, '0');
      times.push(`${time}:00-${next}:00`);
    }
    return times;
  }
  format(item: any): string {
    if (!item) return '';
    const date = new Date(item);
    let day = date.getDay();
    let weekend = day === 0 || day === 6 ? 'weekend' : 'weekday';
    return `{${weekend}|${date.getDate()}日}`;
  }
  loadData(datas: DetailsChartHeatmapModel[]) {
    return datas.map((x) => {
      let hour = x.time.getHours();
      let date = x.time.getDate();
      let weekindex = DateTimeTool.month.week.getMonthWeek(x.time) - 1;
      let index = date - 1;
      index += weekindex;
      return {
        data: x,
        value: [index, hour, x.value],
      };
    });
  }
  config(option: EChartsOption): void {}
}
