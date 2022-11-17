import { Component, OnInit, ViewChild } from '@angular/core';

import { NgxEchartsDirective } from 'ngx-echarts';
import { EChartsTheme } from 'src/app/enum/echarts-theme.enum';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'collection-score-pie',
  templateUrl: './collection-score-pie.component.html',
  styleUrls: ['./collection-score-pie.component.less'],
})
export class CollectionScorePieComponent implements OnInit {
  @ViewChild(NgxEchartsDirective) echarts!: any;

  theme = EChartsTheme.adsame;

  options: EChartsOption = {
    title: {
      text: '今日垃圾分类评分',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        center: ['50%', '60%'],
        radius: ['20%', '60%'],
        data: [
          { value: 1048, name: '好评' },
          { value: 735, name: '中评' },
          { value: 580, name: '差评' },
        ],
        emphasis: {
          disabled: true,
        },
        label: {
          formatter: '{a|{b}}\n{b|{c} 小时}',
          fontSize: 15,
          rich: {
            a: {
              color: 'white',
            },
            b: {
              color: '#cfd7ff',
            },
          },
        },
        labelLine: {
          length: 20,
          length2: 50,
        },
        labelLayout(params) {
          console.log(params);
          return {
            x: params.rect.x,
            y: params.rect.y,
          };
        },
      },
    ],
  };
  merge: EChartsOption = {};

  constructor() {}

  ngOnInit(): void {}
}
