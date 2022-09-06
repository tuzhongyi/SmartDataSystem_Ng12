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
import * as echarts from 'echarts/core';
import { GaugeChart, GaugeSeriesOption } from 'echarts/charts';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { IModel } from 'src/app/network/model/model.interface';
import { DeviceStatusModel } from './device-status.model';
import { DeviceStatusBusiness } from './device-status.business';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { StoreService } from 'src/app/common/service/store.service';
import { OnlineStatus } from 'src/app/enum/online-status.enum';

echarts.use([GaugeChart]);

type ECOption = echarts.ComposeOption<GaugeSeriesOption>;

@Component({
  selector: 'howell-device-status',
  templateUrl: './device-status.component.html',
  styleUrls: ['./device-status.component.less'],
  providers: [DeviceStatusBusiness],
})
export class DeviceStatusComponent
  implements IComponent<IModel, DeviceStatusModel>, OnInit, AfterViewInit
{
  @Input()
  business: IBusiness<IModel, DeviceStatusModel>;
  @Output()
  statusClick: EventEmitter<OnlineStatus | undefined> = new EventEmitter();

  constructor(business: DeviceStatusBusiness, private store: StoreService) {
    this.business = business;
  }
  OnlineStatus = OnlineStatus;
  data: DeviceStatusModel = new DeviceStatusModel();
  @ViewChild('chartContainer') chartContainer?: ElementRef<HTMLElement>;

  myChart: echarts.ECharts | null = null;
  option: ECOption = {
    grid: {
      top: '20%',
      bottom: '20%',
    },
    series: [
      {
        type: 'gauge',
        startAngle: 90,
        endAngle: 450,
        radius: '80%',
        progress: {
          show: true,
          width: 3,
          itemStyle: {
            borderWidth: 10,
            borderColor: '#3a93ff',
            color: '#3a93ff',
          },
        },
        // 坐标轴
        axisLine: {
          lineStyle: {
            width: 3,
            opacity: 0.5,
            color: [[1, '#cfd7ff']],
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        pointer: { show: false },

        title: {
          show: true,
          fontSize: 14,
          color: '#99aaff',
          offsetCenter: [0, '20%'],
        },
        detail: {
          show: true,
          offsetCenter: [0, '-10%'],
          formatter: (value?: string | any) => {
            return '{a|' + value + '}{b|%}';
          },
          rich: {
            a: {
              color: 'white',
              fontSize: 28,
              fontWeight: 'normal',
            },
            b: {
              fontSize: 12,
              color: '#cfd7ff',
              // verticalAlign: "bottom",
            },
          },
        },
        data: [
          {
            value: 70,
            name: '设备在线率',
          },
        ],
      },
    ],
  };

  ngOnInit(): void {
    this.store.statusChange.subscribe((x) => {
      this.loadData();
    });
  }
  ngAfterViewInit(): void {
    if (this.chartContainer) {
      this.myChart = echarts.init(this.chartContainer.nativeElement, 'light');
      this.loadData();
    }
  }
  onResized() {
    this.myChart?.resize();
  }

  async loadData() {
    this.data = await this.business.load();
    let series = (this.option.series as Array<any>)[0];
    series.data[0].value = this.data.ratio;
    if (this.myChart) {
      this.myChart.setOption(this.option);
    }
  }

  itemClicked(status?: OnlineStatus) {
    this.statusClick.emit(status);
  }
}
