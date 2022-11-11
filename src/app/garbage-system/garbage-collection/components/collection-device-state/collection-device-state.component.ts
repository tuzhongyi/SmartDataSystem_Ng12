import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { EChartsOption } from 'echarts';
import { GaugeChart, GaugeSeriesOption } from 'echarts/charts';
// 按需引入 Echarts
import * as echarts from 'echarts/core';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { NgxEchartsDirective } from 'ngx-echarts';
import { EChartsTheme } from 'src/app/enum/echarts-theme.enum';
import { CollectionDeviceStateBusiness } from './collection-device-state.business';
import { CollectionVehicleConverter } from './collection-device-state.converter';
import { CollectionDeviceStateModel } from './collection-device-state.model';

echarts.use([GaugeChart, UniversalTransition, CanvasRenderer]);

type ECOption = echarts.ComposeOption<GaugeSeriesOption>;

@Component({
  selector: 'collection-device-state',
  templateUrl: './collection-device-state.component.html',
  styleUrls: ['./collection-device-state.component.less'],
  providers: [CollectionDeviceStateBusiness, CollectionVehicleConverter],
})
export class GarbageVehiclesDeviceStateComponent implements OnInit {
  title: string = '设备运行状态';
  model: CollectionDeviceStateModel | null = null;

  theme: EChartsTheme = EChartsTheme.adsame;

  gaugeOption: EChartsOption = {
    series: [
      {
        type: 'gauge',
        // 坐标轴数字
        axisLabel: {
          show: false,
        },
        // 坐标轴刻度
        axisTick: {
          show: false,
        },
        // 分割线
        splitLine: {
          show: false,
        },
        // 指针
        pointer: {
          show: false,
        },
        // 当前 value 详情
        detail: {
          show: false,
        },
        // 当前所有数据项的 name 值
        title: {
          offsetCenter: ['0%', '0%'],
          fontSize: 18,
        },
        progress: {
          show: true,
          width: 15,
        },
        // 坐标轴
        axisLine: {
          lineStyle: {
            width: 15,
            color: [[1, '#6B7199']],
            shadowColor: 'rgba(35, 95 ,164,1)',
            shadowBlur: 5,
          },
        },
        data: [],
      },
    ],
  };

  merge: EChartsOption = {};

  constructor(private _business: CollectionDeviceStateBusiness) {}

  ngOnInit() {
    this._init();
  }
  private async _init() {
    this.model = await this._business.init();

    this.merge = {
      series: [
        {
          data: [
            {
              value: this.model.onLineRatio,
              name: this.model.stateDes,
              title: {
                color: this.model.stateColor,
              },
              itemStyle: {
                /**
                 * x:1 右往左
                 * y:1  下往上
                 * x2:1 左往右
                 * y2:1 上往下
                 */
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: this.model.onLineRatio
                    ? 100 / this.model.onLineRatio
                    : 100,
                  y2: 0,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#ef6464', // 0% 处的颜色
                    },
                    {
                      offset: 0.5,
                      color: '#ffba00', // 50% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#21e452', // 100% 处的颜色
                    },
                  ],
                },
              },
            },
          ],
        },
      ],
    };
  }
}
