import { Injectable } from '@angular/core';
import { HWPieChartModel, IHWPieCharBusiness } from './hw-pie-chart.model';

@Injectable()
export class HWPieChartBusiness implements IHWPieCharBusiness {
  constructor() {}
  async init() {
    let model = new HWPieChartModel();

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
