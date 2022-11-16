import { Component, OnInit, ViewChild } from '@angular/core';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  LegendComponent,
  LegendComponentOption
} from 'echarts/components';
import { PieChart, PieSeriesOption } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout
]);

type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | PieSeriesOption
>;

import { NgxEchartsDirective } from 'ngx-echarts';
import { EChartsTheme } from 'src/app/enum/echarts-theme.enum';


echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout
]);



@Component({
  selector: 'collection-score-pie',
  templateUrl: './collection-score-pie.component.html',
  styleUrls: ['./collection-score-pie.component.less']
})
export class CollectionScorePieComponent implements OnInit {

  @ViewChild(NgxEchartsDirective) echarts!: any;


  theme = EChartsTheme.adsame;
  options: EChartsOption = {

    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ],
        emphasis: {
          // disabled: true,
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  merge: EChartsOption = {

  };

  constructor() { }

  ngOnInit(): void {
  }

}
