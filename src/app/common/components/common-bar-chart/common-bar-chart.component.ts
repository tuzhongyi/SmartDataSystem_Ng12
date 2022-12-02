import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NgxEchartsDirective } from 'ngx-echarts';
import { IModel } from 'src/app/network/model/model.interface';
import { CommonBarChartBusiness } from './common-bar-chart.business';
import {
  CommonBarChartModel,
  COMMON_BAR_CHART_TOKEN,
  ICommonBarCharBusiness,
} from './common-bar-chart.model';

@Component({
  selector: 'common-bar-chart',
  templateUrl: './common-bar-chart.component.html',
  styleUrls: ['./common-bar-chart.component.less'],
  providers: [
    {
      provide: COMMON_BAR_CHART_TOKEN,
      useClass: CommonBarChartBusiness,
    },
  ],
})
export class CommonBarChartComponent implements OnInit {
  @Input('business') business: ICommonBarCharBusiness;
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
      textStyle: {
        color: 'white',
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
        color: '#CFD7FE',
        // fontSize: 16,
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
    series: [],
  };

  @Input() merge: EChartsOption = {};

  @ViewChild(NgxEchartsDirective) ngxEcharts!: NgxEchartsDirective;

  model?: CommonBarChartModel<IModel>;

  constructor(
    @Inject(COMMON_BAR_CHART_TOKEN) business: ICommonBarCharBusiness
  ) {
    this.business = business;
  }

  async ngOnInit() {
    this._init();
  }

  private async _init() {
    this.model = await this.business.init();
    this.merge = {
      title: {
        text: this.title,
      },
      ...this.model.Merge,
    };
  }
}
