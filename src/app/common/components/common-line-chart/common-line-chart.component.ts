import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { EChartsOption, LineSeriesOption } from 'echarts';
import { NgxEchartsDirective } from 'ngx-echarts';
import { EChartsTheme } from 'src/app/enum/echarts-theme.enum';
import { CommonLineChartBusiness } from './common-line-chart.business';
import {
  CommonLineChartModel,
  COMMON_LINE_CHART_TOKEN,
  ICommonLineCharBusiness,
} from './common-line-chart.model';

@Component({
  selector: 'common-line-chart',
  templateUrl: './common-line-chart.component.html',
  styleUrls: ['./common-line-chart.component.less'],
  providers: [
    {
      provide: COMMON_LINE_CHART_TOKEN,
      useClass: CommonLineChartBusiness,
    },
  ],
})
export class CommonLineChartComponent implements OnInit {
  @Input('business') _business: ICommonLineCharBusiness;
  @Input() title: string = '';

  @Input() options: EChartsOption = {
    grid: {
      show: false,
      left: 10,
      right: 10,
      bottom: 0,
      containLabel: true,
    },
    tooltip: {},
    title: {
      textStyle: {
        color: 'white',
        fontSize: 24,
        fontFamily: 'Source Han Sans CN Normal',
        fontWeight: 'normal',
        overflow: 'truncate',
      },
      subtextStyle: {
        color: 'inherit',
      },
    },
    legend: {
      selectedMode: false,
      right: 0,
      icon: 'none',
      textStyle: {
        color: 'inherit',
      },
    },
    xAxis: {
      type: 'category',
      axisLine: {
        lineStyle: {
          color: '#CCC',
        },
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: 'rgba(117,134,224,0.5)',
        },
      },
      axisLabel: {
        show: true,
        color: '#CFD7FE',
        fontSize: 14,
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: ['rgba(117,134,224,0.3)'],
        },
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)'],
        },
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false,
        lineStyle: {
          color: '#CCC',
        },
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: '#cfd7fe',
        },
      },
      axisLabel: {
        show: false,
        color: '#CFD7FE',
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: ['rgba(117,134,224,0.3)'],
        },
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)'],
        },
      },
    },
  };

  @Input() merge: EChartsOption = {};

  @ViewChild(NgxEchartsDirective) ngxEcharts!: NgxEchartsDirective;

  model?: CommonLineChartModel;

  constructor(
    @Inject(COMMON_LINE_CHART_TOKEN) business: ICommonLineCharBusiness
  ) {
    this._business = business;
  }

  async ngOnInit() {
    this._init();
  }

  private async _init() {
    this.model = await this._business.init();
    this.merge = {
      title: {
        text: this.title,
      },
      ...this.model.Merge,
    };
  }
}
