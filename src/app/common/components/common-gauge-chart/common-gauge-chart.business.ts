import {
  CommonGaugeChartModel,
  ICommonGaugeCharBusiness,
} from './common-gauge-chart.model';

export class CommonGaugeChartBusiness implements ICommonGaugeCharBusiness {
  async init() {
    let model = new CommonGaugeChartModel();
    let value = (Math.random() * 101) >> 0;
    model.Merge = {
      series: [
        {
          type: 'gauge',
          data: [
            {
              /**
               * x:1 右往左
               * y:1  下往上
               * x2:1 左往右
               * y2:1 上往下
               */

              name: 'Gauge',
              value: value,
              itemStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 100 / value,
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
          ],
        },
      ],
    };
    return model;
  }
}