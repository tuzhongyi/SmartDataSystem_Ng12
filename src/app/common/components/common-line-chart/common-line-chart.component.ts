import { Component, Inject, Input, OnInit } from '@angular/core';
import { EChartsOption, LineSeriesOption } from 'echarts';
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
  @Input() title: string = '';
  @Input() theme = EChartsTheme.adsame;
  @Input('business') _business: ICommonLineCharBusiness;

  model: CommonLineChartModel | null = null;

  lineOption: EChartsOption = {
    title: {
      text: this.title,
    },
    legend: {},
    xAxis: {},
    yAxis: {
      type: 'value',
    },
  };
  merge: EChartsOption = {};

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
      xAxis: this.model.xAxis,
      series: this.model.series,
    };
  }
  update() {
    this._init();
  }
}
