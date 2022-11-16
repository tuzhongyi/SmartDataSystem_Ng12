import { Injectable } from '@angular/core';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { GisRoutePoint } from 'src/app/network/model/gis-point.model';

@Injectable()
// implements IBusiness<GisRoutePoint[], EChartsOption>
export class CollectionMapRouteControlChartsBusiness {
  load(dom: HTMLDivElement, datas: GisRoutePoint[]) {
    var myChart = echarts.init(dom);
    var option: EChartsOption;

    let now = new Date();
    let begin = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9);
    let xData = [];
    let data = [];
    let time = begin.getTime();
    let offset = 0;
    while (time < now.getTime()) {
      if ((time & 8) == 0) data.push(0);
      xData.push(echarts.format.formatTime('hh:mm', new Date(time)));
      offset += 1 * 60 * 1000;
      time = begin.getTime() + offset;
    }

    option = {
      xAxis: {
        type: 'category',
        data: xData,
        boundaryGap: false,
      },
      yAxis: {
        type: 'value',
        show: false,
      },
      pieces: [
        {
          lte: 6,
          color: 'green',
        },
        {
          gt: 6,
          lte: 8,
          color: 'red',
        },
        {
          gt: 8,
          lte: 14,
          color: 'green',
        },
        {
          gt: 14,
          lte: 17,
          color: 'red',
        },
        {
          gt: 17,
          color: 'green',
        },
      ],
      series: [
        {
          symbol: 'none',
          data: data,
          type: 'line',
          lineStyle: {
            color: '#5470C6',
            width: 5,
          },
        },
      ],
    };

    option && myChart.setOption(option);
  }
}
