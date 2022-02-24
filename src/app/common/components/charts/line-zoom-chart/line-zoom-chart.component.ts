import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BasicChart } from '../chart.abstract';
import { option } from './line-zoom-chart.option';
import * as echarts from 'echarts/core';
import { wait } from 'src/app/common/tools/tool';
import { formatDate } from '@angular/common';
import { LineZoomChartModel, LineZoomOption } from './line-zoom-chart.model';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { IModel } from 'src/app/network/model/model.interface';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { LineZoomChartBusiness } from './line-zoom-chart.business';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
@Component({
  selector: 'howell-line-zoom-chart',
  templateUrl: './line-zoom-chart.component.html',
  styleUrls: ['./line-zoom-chart.component.less'],
  providers: [LineZoomChartBusiness],
})
export class LineZoomChartComponent
  implements AfterViewInit, IComponent<IModel, LineZoomChartModel>
{
  @Input()
  stationId?: string;
  @Input()
  date: Date = new Date();
  @Input()
  unit: TimeUnit = TimeUnit.Hour;
  @Input()
  business: IBusiness<IModel, LineZoomChartModel>;

  @ViewChild('echarts')
  echarts?: ElementRef<HTMLDivElement>;

  constructor(business: LineZoomChartBusiness) {
    this.business = business;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    wait(
      () => {
        if (this.echarts) {
          let div = this.echarts.nativeElement as HTMLDivElement;
          return div.offsetWidth > 0 && div.offsetHeight > 0;
        }
        return false;
      },
      async () => {
        if (this.echarts) {
          this.myChart = echarts.init(this.echarts.nativeElement, 'dark');
        }
        let data = await this.business.load(
          this.stationId,
          this.date,
          this.unit
        );
        this.setOption(data, option);
      }
    );
  }

  optionProcess(model: LineZoomChartModel, option: any) {
    let now = new Date();
    let begin = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9);
    let minutes = 12 * 60;
    let date = new Array();
    let data = new Array();
    for (let i = 0, offset = 0; i < minutes; i++) {
      let now = new Date(begin.getTime());
      now.setMinutes(i);
      date.push(formatDate(now, 'H:mm', 'en'));
      if (
        model.data[offset] &&
        model.data[offset].time.getTime() === now.getTime()
      ) {
        data.push(1);
        offset++;
      } else {
        data.push(0);
      }
    }

    option.xAxis.data = date;
    option.series[0].data = data;
    return option;
  }

  myChart?: echarts.ECharts;

  setOption(data: LineZoomChartModel, opt: any) {
    if (this.myChart) {
      this.myChart.resize();
      let option = this.optionProcess(data, opt);
      this.myChart.setOption(option);
    }
  }
}
