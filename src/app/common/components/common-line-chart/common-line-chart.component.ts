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

  @Input() options: EChartsOption = {};

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
    // this.model = await this._business.init();
  }
  update() {
    this._init();
  }
}
