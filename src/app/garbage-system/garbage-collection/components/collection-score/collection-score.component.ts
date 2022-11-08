import { Component, Input, OnInit } from '@angular/core';
import { Language } from 'src/app/common/tools/language';
import { Time } from 'src/app/common/tools/time';
import { CollectionScore } from 'src/app/enum/collection-score.enum';
import { EChartsTheme } from 'src/app/enum/echarts-theme.enum';
import { EChartOptions } from 'src/app/garbage-system/components/windows/charts/details-chart/details-chart.option';
import { CollectionScoreBusiness } from './collection-score.business';
import { CollectionScoreConverter } from './collection-score.converter';
import {
  CollectionScoreModel,
  CollectionScoreSearchInfo,
} from './collection-score.model';

@Component({
  selector: 'collection-score',
  templateUrl: './collection-score.component.html',
  styleUrls: ['./collection-score.component.less'],
  providers: [CollectionScoreBusiness, CollectionScoreConverter],
})
export class CollectionScoreComponent implements OnInit {
  @Input() type: CollectionScore = CollectionScore.Good;

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

  options: EChartOptions = {
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
    series: [
      {
        data: this.lineSeriesData,
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

    this.lineSeriesData.length = 0;
    this.lineSeriesData.push(...this.model.chartData);
  }
}
