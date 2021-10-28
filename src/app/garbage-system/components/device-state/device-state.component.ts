import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/global/service/store.service';
import { DeviceStateBusiness } from './device-state.business';

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
import { DivisionNumberStatistic } from 'src/app/network/model/division-number-statistic.model';
import { DeviceStateCountModule } from 'src/app/view-model/device-state-count.model';
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
  | SeriesOption
>;

@Component({
  selector: 'app-device-state',
  templateUrl: './device-state.component.html',
  styleUrls: ['./device-state.component.less'],
  providers: [DeviceStateBusiness],
})
export class DeviceStateComponent
  implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked
{
  public title: string = '设备运行状态';
  public deviceStateCountData: DeviceStateCountModule[] = [];

  // 在销毁组件时，取消订阅
  private subscription: Subscription | null = null;

  // 当前区划id
  private divisionId: string = '';

  private myCharts: Array<echarts.ECharts> = [];
  private options: ECOption = {};

  // 服务器数据
  private rawData: DivisionNumberStatistic[] = [];

  @ViewChildren('chartContainer') chartContainers?: QueryList<
    ElementRef<HTMLElement>
  >;

  constructor(
    private storeService: StoreService,
    private business: DeviceStateBusiness
  ) {}

  ngOnInit(): void {
    // 区划改变时触发
    this.subscription = this.storeService.statusChange.subscribe(() => {
      this.changeStatus();
    });
    this.changeStatus();

    this.options = {
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center',
          },
          silent: true,

          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
          ],
        },
      ],
    };
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
  ngAfterViewInit() {
    // if (this.chartContainer) {
    //   this.myChart = echarts.init(this.chartContainer.nativeElement);
    //   this.myChart.setOption(this.options, {
    //     notMerge: true,
    //   });
    // }
  }
  ngAfterViewChecked() {
    if (this.chartContainers) {
      for (let i = 0; i < this.chartContainers.length; i++) {
        // console.log(container);
        let chart = this.myCharts[i];
        if (!chart) {
          let container = this.chartContainers.get(i)!;
          chart = echarts.init(container.nativeElement);
          chart.setOption(this.options, { notMerge: true });

          this.myCharts[i] = chart;

          console.log('create echarts');
        }
      }
    }
  }
  changeStatus() {
    this.divisionId = this.storeService.divisionId;

    this.loadData();

    this.myCharts.forEach((myChart) => {
      myChart.clear();
      myChart.dispose();
    });
    this.myCharts = [];
  }
  async loadData() {
    let data = await this.business.statistic(this.divisionId);
    if (data) {
      this.rawData = data;
    }
    // console.log('rawData', this.rawData);
    this.deviceStateCountData = this.business.toDeviceState(this.rawData);

    // console.log(this.deviceStateCountData);
  }

  onResized(e: ResizedEvent) {
    // if (this.myChart) {
    //   this.myChart.resize();
    // }
    this.myCharts.forEach((myChart) => myChart.resize());
  }
}
