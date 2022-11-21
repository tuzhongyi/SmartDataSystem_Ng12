import { Component, Inject, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { IModel } from 'src/app/network/model/model.interface';
import { HWPieChartBusiness } from './hw-pie-chart.business';
import {
  HWPieChartModel,
  HW_PIE_CHART_TOKEN,
  IHWPieCharBusiness,
} from './hw-pie-chart.model';

@Component({
  selector: 'hw-pie-chart',
  templateUrl: './hw-pie-chart.component.html',
  styleUrls: ['./hw-pie-chart.component.less'],
  providers: [
    {
      provide: HW_PIE_CHART_TOKEN,
      useClass: HWPieChartBusiness,
    },
  ],
})
export class HWPieChartComponent implements OnInit {
  @Input() title: string = '';

  @Input('business') _business: IHWPieCharBusiness;

  model: HWPieChartModel<IModel> | null = null;

  pieOption: EChartsOption = {
    color: [
      '#21e452',
      '#fac858',
      '#ef6464',
      '#ee6666',
      '#73c0de',
      '#3ba272',
      '#fc8452',
      '#9a60b4',
      '#ea7ccc',
    ],
    series: [
      {
        name: 'Collection Score',
        type: 'pie',
        center: ['50%', '50%'],
        radius: ['30%', '65%'],
        emphasis: {
          disabled: true,
        },
        label: {
          alignTo: 'edge',
          edgeDistance: 10,
          lineHeight: 25,
          formatter: '{a|{c}}\n{b|{b}}',

          rich: {
            a: {
              color: 'auto',
              fontSize: 17,
            },
            b: {
              color: '#cfd7ff',
              fontSize: 16,
            },
          },
        },
        itemStyle: {
          borderColor: 'rgba(6, 13, 55, 0.7)',
          borderWidth: 2,
        },
        labelLayout(params) {
          /**
           *  文本框
           *  Rect labelRect: {x: number, y: number, width: number, height: number}
           *
           *  饼图内容
           *  Rect rect: {x: number, y: number, width: number, height: number}
           *
           *  文本线构成点，从饼图往外发散
           *  labelLinePoints?: number[][]
           **/

          // console.log(params);
          const points = params.labelLinePoints as number[][];
          const isLeft = params.labelRect.x < params.rect.x;
          points[2][0] = isLeft
            ? params.labelRect.x
            : params.labelRect.x + params.labelRect.width;
          return {
            labelLinePoints: points,
          };
        },
      },
    ],
  };
  merge: EChartsOption = {};

  constructor(@Inject(HW_PIE_CHART_TOKEN) business: IHWPieCharBusiness) {
    this._business = business;
  }

  async ngOnInit() {
    this._init();
  }

  private async _init() {
    this.model = await this._business.init();

    this.merge = {
      series: [
        {
          type: 'pie',
          data: [
            ...this.model.Data.map((entry) => {
              return {
                value: entry.Count,
                name: entry.Label,
              };
            }),
          ],
        },
      ],
    };
  }
  update() {
    this._init();
  }
}
