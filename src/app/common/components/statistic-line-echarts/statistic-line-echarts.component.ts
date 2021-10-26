import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

// 按需引入 Echarts

import * as echarts from 'echarts/core';
import {
  GridComponent,
  GridComponentOption,
  TitleComponent,
  TitleComponentOption,
  LegendComponent,
  LegendComponentOption,
  TooltipComponent,
  TooltipComponentOption,
} from 'echarts/components';
import { LineSeriesOption, LinesSeriesOption } from 'echarts/charts';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import {
  YAXisComponentOption,
  XAXisComponentOption,
  SeriesOption,
} from 'echarts';
import { ResizedEvent } from 'angular-resize-event';
import {
  EChartsLineModel,
  EChartsLineOption,
} from 'src/app/view-model/echarts-line.model';
echarts.use([
  GridComponent,
  TitleComponent,
  LegendComponent,
  TooltipComponent,
  LineChart,
  UniversalTransition,
  CanvasRenderer,
]);
type ECOption = echarts.ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | LinesSeriesOption
  | LineSeriesOption
  | YAXisComponentOption
  | XAXisComponentOption
>;

@Component({
  selector: 'app-statistic-line-echarts',
  templateUrl: './statistic-line-echarts.component.html',
  styleUrls: ['./statistic-line-echarts.component.less'],
})
export class StatisticLineEChartsComponent
  implements OnInit, AfterViewInit, OnChanges
{
  private myChart?: echarts.ECharts;

  private options: ECOption = {};

  @ViewChild('chartContainer') chartContainer?: ElementRef;

  @Input() lineOption?: EChartsLineOption;
  @Input() eChartsLineModel?: EChartsLineModel;

  constructor() {}
  ngOnChanges(changes: SimpleChanges) {
    // console.log('change', changes);
    if (this.myChart) {
      if ('eChartsLineModel' in changes) {
        this.options.series = this.eChartsLineModel?.series;
        this.myChart.setOption(this.options, {
          notMerge: true,
        });
      }
    }
  }
  ngOnInit() {
    // 创建表格，但现在还没有数据
    if (this.lineOption) {
      this.options = {
        title: this.lineOption.title,
        legend: this.lineOption.legend,
        tooltip: this.lineOption.tooltip,
        grid: this.lineOption.grid,
        xAxis: this.lineOption.xAxis,
        yAxis: this.lineOption.yAxis,
        series: [],
      };
    }
  }

  ngAfterViewInit() {
    if (this.chartContainer) {
      this.myChart = echarts.init(this.chartContainer.nativeElement);
      this.myChart.setOption(this.options, {
        notMerge: true,
      });
    }
  }
  onResized(e: ResizedEvent) {
    if (this.myChart) {
      // console.log('hello', e);
      let w = e.newRect.width;

      if (this.lineOption) {
        if (w < 224) {
          this.lineOption.legend.show = false;
          this.myChart.setOption(this.options);
        } else {
          this.lineOption.legend.show = true;
          this.myChart.setOption(this.options);
        }

        if (w < 175) {
          this.lineOption.title.textStyle!.width = w;
          this.myChart.setOption(this.options);
        }
      }
      this.myChart.resize();
    }
  }
}
