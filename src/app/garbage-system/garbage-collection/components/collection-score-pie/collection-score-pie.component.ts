import { Component, OnInit, ViewChild } from '@angular/core';

import { NgxEchartsDirective } from 'ngx-echarts';
import { EChartsTheme } from 'src/app/enum/echarts-theme.enum';
import { EChartsOption } from 'echarts';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Subscription } from 'rxjs';
import { CollectionScorePieBusiness } from './collection-score-pie.business';
import { CollectionScorePieConverter } from './collection-score-pie.converter';
import {
  CollectionScorePieModel,
  ICollectionScorePieSearchInfo,
} from './collection-score-pie.model';

@Component({
  selector: 'collection-score-pie',
  templateUrl: './collection-score-pie.component.html',
  styleUrls: ['./collection-score-pie.component.less'],
  providers: [CollectionScorePieBusiness, CollectionScorePieConverter],
})
export class CollectionScorePieComponent implements OnInit {
  title = '今日垃圾分类评分';
  model: CollectionScorePieModel | null = null;

  subscription: Subscription;

  searchInfo: ICollectionScorePieSearchInfo = {
    DivisionId: '',
  };

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
  merge: EChartsOption = {
    series: [
      {
        type: 'pie',
        data: [
          {
            value: (Math.random() * 150) >> 0,
            name: '好评',
          },
          {
            value: (Math.random() * 150) >> 0,
            name: '中评',
          },
          {
            value: (Math.random() * 150) >> 0,
            name: '差评',
          },
        ],
      },
    ],
  };

  constructor(
    private _business: CollectionScorePieBusiness,
    private _globalStorage: GlobalStorageService
  ) {
    this.subscription = this._globalStorage.collectionStatusChange.subscribe(
      this._init.bind(this)
    );
  }

  ngOnInit(): void {
    this._init();
  }

  private async _init() {
    this.searchInfo.DivisionId = this._globalStorage.divisionId;

    this.model = await this._business.init(this.searchInfo);
    if (this.model) {
      this.merge = {
        series: [
          {
            type: 'pie',
            data: [
              ...this.model.CountDes.map((des) => {
                return {
                  value: des.Count,
                  name: des.Label,
                };
              }),
            ],
          },
        ],
      };
    }
  }
}
