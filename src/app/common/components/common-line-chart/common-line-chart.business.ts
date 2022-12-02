import { Injectable } from '@angular/core';
import {
  CommonLineChartModel,
  ICommonLineCharBusiness,
} from './common-line-chart.model';

@Injectable()
export class CommonLineChartBusiness implements ICommonLineCharBusiness {
  init(): CommonLineChartModel<any> | Promise<CommonLineChartModel<any>> {
    let model = new CommonLineChartModel();
    // model.xAxis = {
    //   type: 'category',
    //   data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    // };
    // model.yAxis = {};

    // model.series = [
    //   {
    //     type: 'line',
    //     data: [150, 230, 224, 218, 135, 147, 260],
    //     name: '单位(起)',
    //   },
    // ];
    return model;
  }
}
