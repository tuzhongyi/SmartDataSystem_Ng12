import { Component, Inject, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { IModel } from 'src/app/network/model/model.interface';
import { CommonPieChartBusiness } from './common-pie-chart.business';
import {
  CommonPieChartModel,
  COMMON_PIE_CHART_TOKEN,
  ICommonPieCharBusiness,
} from './common-pie-chart.model';

@Component({
  selector: 'common-pie-chart',
  templateUrl: './common-pie-chart.component.html',
  styleUrls: ['./common-pie-chart.component.less'],
  providers: [
    {
      provide: COMMON_PIE_CHART_TOKEN,
      useClass: CommonPieChartBusiness,
    },
  ],
})
export class CommonPieChartComponent implements OnInit {
  @Input() title: string = '';

  @Input('business') _business: ICommonPieCharBusiness;

  @Input() options: EChartsOption = {
    series: [
      {
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
        name: 'Collection Pie',
        type: 'pie',
        center: ['50%', '50%'],
        radius: ['40%', '75%'],
        emphasis: {
          disabled: true,
        },
        labelLine: {
          show: false,
        },
        label: {
          show: true,
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

          if (params.labelLinePoints) {
            const points = params.labelLinePoints as number[][];
            const isLeft = params.labelRect.x < params.rect.x;
            points[2][0] = isLeft
              ? params.labelRect.x
              : params.labelRect.x + params.labelRect.width;
            return {
              labelLinePoints: points,
            };
          }
          return params;
        },
      },
    ],
  };

  @Input() merge: EChartsOption = {
    series: [
      {
        type: 'pie',
        data: [
          {
            name: 'Good',
            value: 1,
          },
          {
            name: 'Average',
            value: 2,
          },
          {
            name: 'Poor',
            value: 3,
          },
        ],
      },
    ],
  };

  model?: CommonPieChartModel<IModel>;

  constructor(
    @Inject(COMMON_PIE_CHART_TOKEN) business: ICommonPieCharBusiness
  ) {
    this._business = business;
  }

  async ngOnInit() {
    this._init();
  }

  private async _init() {
    this.model = await this._business.init();

    this.merge = this.model.Merge;
  }
  update() {
    this._init();
  }
}
