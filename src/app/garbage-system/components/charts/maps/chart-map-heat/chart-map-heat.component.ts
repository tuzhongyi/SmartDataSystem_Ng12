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
import { ChartMapHeatOption } from './chart-map-heat.option';

@Component({
  selector: 'chart-map-heat',
  templateUrl: './chart-map-heat.component.html',
  styleUrls: ['../../echart.less', './chart-map-heat.component.less'],
})
export class ChartMapHeatComponent
  extends AEChartComponent<echarts.EChartsOption>
  implements OnInit, AfterViewInit
{
  @Input('load') load?: EventEmitter<echarts.EChartsOption>;

  @Input() option: echarts.EChartsOption;
  @Output() inited: EventEmitter<echarts.EChartsOption> = new EventEmitter();

  constructor() {
    super();
    this.option = Object.assign({}, ChartMapHeatOption);
  }

  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((x) => {
        this.option = x;
        this.setOption();
      });
    }
  }

  ngAfterViewInit(): void {
    if (this.init()) {
      this.inited.emit(this.option);
    }
  }

  @ViewChild('echart') element?: ElementRef<HTMLDivElement>;

  setOption() {
    if (this.echart) {
      this.echart.setOption(this.option);
    }
  }
}
