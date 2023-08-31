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
} from './chart-pie-event-level.option';

@Component({
  selector: 'chart-pie-event-level',
  templateUrl: './chart-pie-event-level.component.html',
  styleUrls: ['../../echart.less', './chart-pie-event-level.component.less'],
})
export class ChartPieEventLevelComponent
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
          for (let i = 0; i < this.option.series.length; i++) {
            this.option.series[i].data = this.datas.map((x) => {
              return { name: x.name, value: x.value };
            });
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
