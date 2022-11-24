import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NgxEchartsDirective } from 'ngx-echarts';
import { Language } from 'src/app/common/tools/language';
import { Time } from 'src/app/common/tools/time';
import { CollectionPointScore } from 'src/app/enum/collection-point-score.enum';
import { EChartsTheme } from 'src/app/enum/echarts-theme.enum';
import { EChartOptions } from 'src/app/garbage-system/components/windows/charts/details-chart/details-chart.option';
import { CollectionScoreBusiness } from './collection-score-line.business';
import { CollectionScoreConverter } from './collection-score-line.converter';
import {
  CollectionScoreModel,
  CollectionScoreSearchInfo,
} from './collection-score-line.model';

@Component({
  selector: 'collection-score-line',
  templateUrl: './collection-score-line.component.html',
  styleUrls: ['./collection-score-line.component.less'],
  providers: [CollectionScoreBusiness, CollectionScoreConverter],
})
export class CollectionScoreLineComponent implements OnInit {
  @Input() type: CollectionPointScore = CollectionPointScore.Good;

  @ViewChild(NgxEchartsDirective) echarts!: any;

  get title() {
    return '今日清运' + Language.CollectionScore(this.type) + '数';
  }
  model: CollectionScoreModel | null = null;

  today = new Date();
  searchInfo: CollectionScoreSearchInfo = {
    BeginTime: Time.beginTime(this.today),
    EndTime: Time.endTime(this.today),
    Type: this.type,
  };

  theme = EChartsTheme.adsame;

  lineSeriesData: number[] = [];

  options: EChartsOption = {
    title: {
      text: this.title,
    },

    xAxis: {
      type: 'category',
      data: [
        ...Array.from(
          { length: 25 },
          (v, i) => i.toString().padStart(2, '0') + ':00'
        ),
      ],
    },
    yAxis: {
      type: 'value',
    },
  };
  merge: EChartsOption = {
    series: [
      {
        data: [],
        type: 'line',
        name: '单位(吨)',
      },
    ],
  };
  constructor(private _business: CollectionScoreBusiness) {}

  ngOnInit(): void {
    this._init();
  }

  private async _init() {
    this.model = await this._business.init(this.searchInfo);

    this.merge = {
      series: [
        {
          data: this.model.ChartData,
          type: 'line',
          name: '单位(吨)',
        },
      ],
    };
  }
}
