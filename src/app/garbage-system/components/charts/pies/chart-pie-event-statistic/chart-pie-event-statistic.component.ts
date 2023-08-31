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
import * as echarts from 'echarts';
import { AEChartComponent } from '../../echart.abstract';
import {
  ChartPieOption,
  IChartPieData,
  IChartPieModel,
} from './chart-pie-event-statistic.option';

@Component({
  selector: 'chart-pie-event-statistic',
  templateUrl: './chart-pie-event-statistic.component.html',
  styleUrls: [
    '../../echart.less',
    './chart-pie-event-statistic.component.less',
  ],
})
export class ChartPieEventStatisticComponent
  extends AEChartComponent<IChartPieModel>
  implements OnInit, AfterViewInit
{
  @Input() load?: EventEmitter<IChartPieModel>;
  @Input() option: echarts.EChartsOption;
  @Output() optionChange: EventEmitter<echarts.EChartsOption> =
    new EventEmitter();
  @Output() inited: EventEmitter<echarts.EChartsOption> = new EventEmitter();
  constructor() {
    super();
    this.option = Object.assign({}, ChartPieOption);
  }

  @ViewChild('echart')
  element?: ElementRef;

  datas: IChartPieData[] = [];

  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((x) => {
        this.option = x.option;
        this.datas = x.data;
        if (this.option.series && Array.isArray(this.option.series)) {
          for (let i = 0; i < this.datas.length; i++) {
            const item = this.datas[i];
            let data = this.option.series[item.index].data as Array<any>;
            data[0].value = item.value;
            data[0].name = item.name;
          }
        }
        this.loadData();
      });
    }
  }
  ngAfterViewInit(): void {
    if (this.init()) {
      this.inited.emit(this.option);
    }
  }

  loadData() {
    if (this.echart) {
      console.log(this.option);
      this.echart.setOption(this.option);
    }
  }
}
