import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { EChartsOption } from 'echarts';
import { GaugeChart } from 'echarts/charts';
import * as echarts from 'echarts/core';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { wait } from 'src/app/common/tools/tool';
import { Duration } from 'src/app/network/model/garbage-station/duration.model';
import { EventRecordDetailsChartBarD3Business } from './business/event-record-details-chart-bar-3d.business';
import { EventRecordDetailsChartBarD3Args } from './event-record-details-chart-bar-3d.model';
import { EventRecordDetailsChartBarD3Option } from './event-record-details-chart-bar-3d.option';
import { EventRecordDetailsChartBarD3Providers } from './event-record-details-chart-bar-3d.providers';

echarts.use([GaugeChart, UniversalTransition, CanvasRenderer]);

@Component({
  selector: 'event-record-details-chart-bar-3d',
  templateUrl: './event-record-details-chart-bar-3d.component.html',
  styleUrls: ['./event-record-details-chart-bar-3d.component.less'],
  providers: [...EventRecordDetailsChartBarD3Providers],
})
export class EventRecordDetailsChartBarD3Component
  implements OnInit, AfterViewInit
{
  @Input() args = new EventRecordDetailsChartBarD3Args();
  constructor(private business: EventRecordDetailsChartBarD3Business) {
    this.option = Object.assign({}, EventRecordDetailsChartBarD3Option);
  }

  ngOnInit(): void {
    this.loadAxis(this.args.duration);
    this.load();
  }
  ngAfterViewInit() {
    if (this.element) {
      this.echart = echarts.init(this.element.nativeElement);
      this.loadAxis(this.args.duration);
      this.echart.setOption(this.option);
    }
  }

  option: EChartsOption;
  private echart?: echarts.ECharts;
  @ViewChild('echart')
  element?: ElementRef;

  load() {
    this.business.load(this.args).then((datas) => {
      this.loadChartData(datas);
    });
  }

  loadChartData(datas: Array<number | null>) {
    (this.option.series as any).data = datas;
    wait(
      () => {
        return !!this.echart;
      },
      () => {
        if (this.echart) {
          this.echart.setOption(this.option);
        }
      }
    );
  }

  loadAxis(duration: Duration) {
    (this.option.xAxis as any).data = this.loadAxisX();
    (this.option.yAxis as any).data = this.loadAxisY(duration);
  }
  loadAxisX() {
    let times = [];
    for (let i = 0; i <= 24; i++) {
      let time = i.toString().padStart(2, '0');
      times.push(`${time}:00`);
    }
    return times;
  }
  loadAxisY(duration: Duration) {
    let time = duration.end.getTime() - duration.begin.getTime();
    let day = time / 1000 / 60 / 60 / 24;
    let datas = [];
    for (let i = 0; i < day; i++) {
      let today = new Date(duration.begin.getTime() + i * 24 * 60 * 60 * 1000);
      datas.push(`${today.getDate()}日`);
    }
    return datas;
  }
}
