import { Injectable } from '@angular/core';
import {
  CommonLineChartModel,
  ICommonLineCharBusiness,
} from './common-line-chart.model';

@Injectable()
export class CommonLineChartBusiness implements ICommonLineCharBusiness {
  init(): CommonLineChartModel<any> | Promise<CommonLineChartModel<any>> {
    let model = new CommonLineChartModel();
    model.Merge = {
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      series: [
        {
          type: 'line',
          areaStyle: {},
          data: [150, 230, 224, 218, 135, 147, 261],
          name: '单位(起)',
          label: {
            show: true,
            color: '#cfd7fe',
            fontSize: '16',
            distance: 10,
          },
          itemStyle: {
            borderWidth: 1,
          },
          lineStyle: {
            width: 4,
          },
          symbolSize: 4,
          symbol: 'emptyCircle',
          smooth: false,
        },
      ],
    };
    return model;
  }
}
