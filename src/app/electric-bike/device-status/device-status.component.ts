import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as echarts from 'echarts/core';
import { GaugeChart, GaugeSeriesOption } from 'echarts/charts';

echarts.use([GaugeChart]);

type ECOption = echarts.ComposeOption<GaugeSeriesOption>;

@Component({
  selector: 'howell-device-status',
  templateUrl: './device-status.component.html',
  styleUrls: ['./device-status.component.less'],
})
export class DeviceStatusComponent implements OnInit, AfterViewInit {
  @ViewChild('chartContainer') chartContainer?: ElementRef<HTMLElement>;

  myChart: echarts.ECharts | null = null;
  option: ECOption = {
    series: [
      {
        type: 'gauge',
        startAngle: 90,
        endAngle: 450,
        radius: '70%',
        progress: {
          show: true,
          width: 7,
          itemStyle: {
            borderWidth: 3,
            borderColor: '#3a93ff',
            color: '#3a93ff',
          },
        },
        // 坐标轴
        axisLine: {
          lineStyle: {
            width: 5,
            opacity: 0.5,
            color: [[1, '#4b5899']],
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

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.chartContainer) {
      this.myChart = echarts.init(this.chartContainer.nativeElement, 'light');
      this.myChart.setOption(this.option);
    }
  }
  onResized() {
    console.log('erewr');
    this.myChart?.resize();
  }
}
