import { Injectable } from '@angular/core';
import {
  CommonPieChartModel,
  ICommonPieCharBusiness,
} from './common-pie-chart.model';

@Injectable()
export class CommonPieChartBusiness implements ICommonPieCharBusiness {
  constructor() {}
  async init() {
    let model = new CommonPieChartModel();

    model.Merge = {
      series: [
        {
          type: 'pie',
          data: [
            {
              name: 'Label One',
              value: (Math.random() * 255) >> 0,
            },
            {
              name: 'Label Two',
              value: (Math.random() * 255) >> 0,
            },
            {
              name: 'Label Three',
              value: (Math.random() * 255) >> 0,
            },
          ],
        },
      ],
    };
    return model;
  }
}
