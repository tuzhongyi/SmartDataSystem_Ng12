import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Language } from 'src/app/common/tools/language';
import { Time } from 'src/app/common/tools/time';
import { EChartsTheme } from 'src/app/enum/echarts-theme.enum';
import { TrashCanType } from 'src/app/enum/trashcan-type.enum';
import { CollectionStatisticBusiness } from './collection-statistic.business';
import { CollectionStatisticConverter } from './collection-statistic.converter';
import {
  CollectionStatisticModel,
  CollectionStatisticSearchInfo,
} from './collection-statistic.model';

@Component({
  selector: 'collection-statistic',
  templateUrl: './collection-statistic.component.html',
  styleUrls: ['./collection-statistic.component.less'],
  providers: [CollectionStatisticBusiness, CollectionStatisticConverter],
})
export class CollectionStatisticComponent implements OnInit {
  @Input() type: TrashCanType = TrashCanType.Dry;

  model: CollectionStatisticModel | null = null;

  today = new Date();
  searchInfo: CollectionStatisticSearchInfo = {
    BeginTime: Time.beginTime(this.today),
    EndTime: Time.endTime(this.today),
    Type: this.type,
  };
  theme = EChartsTheme.adsame;
  lineSeriesData: number[] = [];

  options: EChartsOption = {
    title: {
      text: '',
    },
    legend: {
      left: '70%',
      textStyle: {
        color: 'inherit',
        fontSize: 15,
        fontWeight: 600,
      },
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

  constructor(private _business: CollectionStatisticBusiness) {}

  ngOnInit(): void {
    this.options.title = {
      text: '今日' + Language.TrashCanType(this.type) + '清运量',
    };
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
