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
  IChartBarData,
  IChartBarModel,
} from './chart-bar-simple.option';

@Component({
  selector: 'chart-bar-simple',
  templateUrl: './chart-bar-simple.component.html',
  styleUrls: ['../../echart.less', './chart-bar-simple.component.less'],
})
export class ChartBarSimpleComponent
  extends AEChartComponent<IChartBarModel>
  implements OnInit, AfterViewInit
{
  @Input() load?: EventEmitter<IChartBarModel>;
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

  data?: IChartBarData;

  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((x) => {
        this.option = x.option;
        this.data = x.data;
        (this.option.xAxis as any).data = x.x;
        if (this.option.series && Array.isArray(this.option.series)) {
          this.option.series[0].name = this.data?.name;
          this.option.series[0].data = this.data?.value;
          // let max = this.data?.value.reduce((a, b) => {
          //   return a > b ? a : b;
          // });
          // (this.option.series[0] as any).label!.formatter = (params: any) => {
          //   return params.value;
          // };
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