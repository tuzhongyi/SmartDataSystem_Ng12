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
import { AEChartComponent } from '../../echart.abstract';
import {
  ChartPieOption,
  IChartLineEventLevelData,
  IChartLineEventLevelModel,
} from './chart-line-event-level.option';

@Component({
  selector: 'chart-line-event-level',
  templateUrl: './chart-line-event-level.component.html',
  styleUrls: ['../../echart.less', './chart-line-event-level.component.less'],
})
export class ChartLineEventLevelComponent
  extends AEChartComponent<IChartLineEventLevelModel>
  implements OnInit, AfterViewInit
{
  @Input() load?: EventEmitter<IChartLineEventLevelModel>;
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

  datas: IChartLineEventLevelData[] = [];

  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((x) => {
        this.option = x.option;
        this.datas = x.data.data;
        (this.option.xAxis as any).data = x.data.x;
        if (this.option.series && Array.isArray(this.option.series)) {
          for (let i = 0; i < this.datas.length; i++) {
            let data = this.datas[i];
            this.option.series[data.index].data = data.value;
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
