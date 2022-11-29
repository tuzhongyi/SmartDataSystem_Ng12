import { Component, Inject, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { IModel } from 'src/app/network/model/model.interface';
import { CommonGaugeChartBusiness } from './common-gauge-chart.business';
import {
  CommonGaugeChartModel,
  COMMON_GAUGE_CHART_TOKEN,
  ICommonGaugeCharBusiness,
} from './common-gauge-chart.model';

@Component({
  selector: 'common-gauge-chart',
  templateUrl: './common-gauge-chart.component.html',
  styleUrls: ['./common-gauge-chart.component.less'],
  providers: [
    {
      provide: COMMON_GAUGE_CHART_TOKEN,
      useClass: CommonGaugeChartBusiness,
    },
  ],
})
export class CommonGaugeChartComponent implements OnInit {
  @Input('business') _business: ICommonGaugeCharBusiness;

  @Input() options: EChartsOption = {
    series: [
      {
        type: 'gauge',
        name: 'Common Gauge',
        center: ['50%', '50%'],
        radius: '75%',

        // 逆时针计算，水平为0度，垂直向上为90度
        startAngle: 225,
        endAngle: -45,

        // 顺时针绘制
        clockwise: true,

        min: 0,

        max: 100,

        // 整个表盘被分成 10 块
        splitNumber: 10,

        // 坐标轴
        axisLine: {
          show: true,

          // 首尾是否为圆角
          roundCap: false,
          lineStyle: {
            width: 15,
            // 注意不是渐变
            // color: [
            //   [1 / 3, '#EF6464'], // 0~33% is #EF6464
            //   [(1 / 3) * 2, '#FAC858'], // 33~66% is #FAC858
            //   [1, '#21E452'], // 60%~100% is  #21E452
            // ],
            color: [[1, '#6B7199']],
            shadowColor: 'rgba(35, 95 ,164,1)',
            shadowBlur: 5,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
          },
        },

        // 进度条覆盖坐标轴
        progress: {
          show: true,
          // 当有多个进图条时，是否覆盖
          overlap: true,
          width: 15,
          roundCap: false,
          itemStyle: {},
        },
        // 块分割线
        splitLine: {
          show: false,
          length: 10,

          // 距坐标轴的距离
          distance: 10,

          lineStyle: {
            color: 'auto',
          },
        },
        // 坐标轴精确刻度
        axisTick: {
          show: false,

          // 每个split块被分成5分
          splitNumber: 5,

          length: 6,

          distance: 10,

          lineStyle: {
            color: 'auto',
          },
        },

        // 坐标轴数字
        axisLabel: {
          show: false,
          fontSize: 12,
          // 距离splitLine，而不是坐标轴
          distance: 15,
          color: 'auto',

          formatter: '{value}',
        },

        // 指针
        pointer: {
          show: false,
          icon: undefined,
          offsetCenter: [0, 0],
          length: '60%',
          width: 6,
          itemStyle: {},
        },
        anchor: {
          show: false,
          showAbove: true,
          size: 25,
          itemStyle: {
            borderWidth: 10,
          },
        },
        itemStyle: {},

        // 数据的name值
        title: {
          show: true,
          color: 'auto',

          offsetCenter: ['0%', '0%'],
          fontSize: 18,
        },
        // 当前 value 详情
        detail: {
          show: false,
          offsetCenter: ['0%', '50%'],
          fontSize: 30,
          color: 'violet',
        },
        // 当前所有数据项的 name 值

        data: [],
      },
    ],
  };

  @Input() merge: EChartsOption = {};

  model?: CommonGaugeChartModel<IModel>;

  constructor(
    @Inject(COMMON_GAUGE_CHART_TOKEN) business: ICommonGaugeCharBusiness
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
}
