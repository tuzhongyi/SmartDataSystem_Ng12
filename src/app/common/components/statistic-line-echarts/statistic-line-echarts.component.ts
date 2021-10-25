import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
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
} from 'echarts/components';
import { LineSeriesOption, LinesSeriesOption } from 'echarts/charts';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import {
  YAXisComponentOption,
  XAXisComponentOption,
  TooltipComponentOption,
} from 'echarts';
import { ResizedEvent } from 'angular-resize-event';
import { EChartsLineModel, LineOption } from 'src/app/view-model/echarts.model';
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
export class StatisticLineEChartsComponent implements OnInit, AfterViewInit {
  private myChart?: echarts.ECharts;

  private options: ECOption = {};

  @ViewChild('chartContainer') chartContainer?: ElementRef;

  @Input() lineOption: LineOption = new LineOption();
  @Input() eChartsLineModel: EChartsLineModel = new EChartsLineModel();

  constructor() {}

  ngOnInit() {
    let a = [0, 5, 11, 17, 23];
    this.options = {
      title: this.lineOption.title,
      legend: this.lineOption.legend,
      // tooltip: [this.lineOption.tooltip],
      grid: {
        top: '20%',
        left: 15,
        right: 15,
        bottom: 0,
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: [],
        axisLine: {
          onZero: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: '#CFD7FE',
          fontSize: 16,
          interval: (index: number, value: string) => {
            return a.includes(index);
          },
        },
      },
      yAxis: {
        type: 'value',
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            color: 'rgb(117,134,224,0.3)',
          },
        },
      },
      series: [
        {
          type: 'line',
          name: '单位(起)',

          data: [],
          areaStyle: {},
          lineStyle: {
            width: 4,
            color: '#7586e0',
          },
          itemStyle: {
            color: '#7586e0',
          },
          label: {
            show: true,
            formatter: function (params: any) {
              return params.value ? params.value : '';
            },
            color: '#fff',
            fontSize: 16,
          },
        },
      ],
    };
  }

  ngAfterViewInit() {
    if (this.chartContainer) {
      this.myChart = echarts.init(this.chartContainer.nativeElement);

      this.myChart.setOption(this.options);
    }
  }
  onResized(e: ResizedEvent) {
    if (this.myChart) {
      this.myChart.resize();
    }
  }
}
