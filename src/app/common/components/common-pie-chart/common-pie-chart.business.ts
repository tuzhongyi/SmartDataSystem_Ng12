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

    model.Data = [
      {
        Count: (Math.random() * 255) >> 0,
        Label: 'Label One',
      },
      {
        Count: (Math.random() * 255) >> 0,
        Label: 'Label Two',
      },
      {
        Count: (Math.random() * 255) >> 0,
        Label: 'Label Three',
      },
    ];
    return model;
  }
}
