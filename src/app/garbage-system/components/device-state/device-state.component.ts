import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { GaugeChart, GaugeSeriesOption } from 'echarts/charts';
// 按需引入 Echarts
import * as echarts from 'echarts/core';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { DeviceStateRatioType } from 'src/app/enum/device-state-count.enum';
import { IModel } from 'src/app/network/model/model.interface';
import {
  DeviceStateCountModel,
  IDeviceStateDes,
} from 'src/app/view-model/device-state-count.model';
import { DeviceStateBusiness } from './device-state.business';

echarts.use([GaugeChart, UniversalTransition, CanvasRenderer]);

type ECOption = echarts.ComposeOption<GaugeSeriesOption>;

@Component({
  selector: 'app-device-state',
  templateUrl: './device-state.component.html',
  styleUrls: ['./device-state.component.less'],
  providers: [DeviceStateBusiness],
})
export class DeviceStateComponent
  implements IComponent<IModel, DeviceStateCountModel>, OnInit, AfterViewInit
{
  @Input() inside = false;
  @Input() load?: EventEmitter<void>;
  @Output()
  Click: EventEmitter<IDeviceStateDes> = new EventEmitter();
  public title: string = '设备运行状态';
  public model: DeviceStateCountModel = new DeviceStateCountModel();

  public get stateRatioColor() {
    return this.stateColor.get(this.model.state);
  }

  private myChart?: echarts.ECharts;
  private option: ECOption = {};

  private stateColor = new Map([
    [DeviceStateRatioType.bad, '#ef6464'],
    [DeviceStateRatioType.mild, '#ffba00'],
    [DeviceStateRatioType.good, '#21e452'],
  ]);

  @ViewChild('chartContainer') chartContainer!: ElementRef<HTMLDivElement>;

  constructor(business: DeviceStateBusiness) {
    this.business = business;
  }
  business: IBusiness<IModel, DeviceStateCountModel>;

  ngOnInit(): void {
    if (this.load) {
      {
        this.load.subscribe((x) => {
          this.loadData();
        });
      }
      this.loadData();
    }

    this.option = {
      series: [
        {
          type: 'gauge',
          radius: '70%',
          center: ['50%', '50%'],
          progress: {
            show: true,
            width: 10,
            itemStyle: {},
          },
          axisLine: {
            show: true,
            lineStyle: {
              width: 10,
              color: [[1, '#6b7199']],
            },
          },
          axisLabel: {
            show: false,
            distance: 5,
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          title: {
            offsetCenter: ['0%', '0%'],
            color: 'auto',
            fontSize: 18,
            fontWeight: 400,
          },
          detail: {
            show: false,
          },
          pointer: {
            show: false,
          },
          data: [],
        },
      ],
    };
  }
  ngAfterViewInit() {
    // console.log('chartContainers', this.chartContainer);
    if (this.chartContainer) {
      this.myChart = echarts.init(this.chartContainer.nativeElement);
      this.myChart.setOption(this.option);
    }
  }
  async loadData() {
    this.model = await this.business.load();
    // this.model.onLineRatio = 30;
    this.myChart?.setOption({
      series: [
        {
          type: 'gauge',
          axisLabel: {
            color: this.stateRatioColor,
          },
          data: [
            {
              name: this.model.stateDes,
              value: this.model.onLineRatio,
              // itemStyle: {
              //   color: this.stateRatioColor,
              // },
              itemStyle: {
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
                      color: '#ffba00', // 100% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#21e452', // 100% 处的颜色
                    },
                  ],
                },
              },
              title: {
                color: this.stateRatioColor,
              },
            },
          ],
        },
      ],
    });
  }

  onResized(e: ResizedEvent) {
    if (this.myChart) {
      this.myChart.resize();
      let w = e.newRect.width;
      if (w < 101) {
        this.myChart.setOption({
          series: [
            {
              type: 'gauge',
              title: {
                show: false,
              },
            },
          ],
        });
      } else {
        this.myChart.setOption({
          series: [
            {
              type: 'gauge',
              title: {
                show: true,
              },
            },
          ],
        });
      }
    }
    // this.myCharts.forEach((myChart) => myChart.resize());
  }

  onclick(args: IDeviceStateDes) {
    this.Click.emit(args);
  }
}
