import { CommonChartModel } from 'src/app/view-model/common-chart.model';
import { ICommonBarCharBusiness } from './common-bar-chart.model';
import * as echarts from 'echarts';
import { Injectable } from '@angular/core';

@Injectable()
export class CommonBarChartBusiness implements ICommonBarCharBusiness {
  init(): CommonChartModel<any> | Promise<CommonChartModel<any>> {
    let model = new CommonChartModel();
    model.Merge = {
      series: [
        {
          name: '好评',
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 1,
              x2: 0,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: 'red', // color at 0%
                },
                {
                  offset: 1,
                  color: 'blue', // color at 100%
                },
              ],
            },
          },
        },
        {
          name: '差评',
          data: [200, 130, 50, 120, 70, 110, 80],
          type: 'bar',
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              { offset: 0, color: 'violet' },
              { offset: 1, color: 'yellow' },
            ]),
          },
        },
      ],
    };
    return model;
  }
}
