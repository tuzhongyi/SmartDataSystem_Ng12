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
import 'echarts-gl';
import { AEChartComponent } from '../../echart.abstract';
import { ChartBar3DOption } from './chart-bar-3d.option';

@Component({
  selector: 'chart-bar-3d',
  templateUrl: './chart-bar-3d.component.html',
  styleUrls: ['../../echart.less', './chart-bar-3d.component.less'],
})
export class ChartBar3DComponent
  extends AEChartComponent<echarts.EChartsOption>
  implements OnInit, AfterViewInit
{
  @Input('load') load?: EventEmitter<echarts.EChartsOption>;

  @Input() option: echarts.EChartsOption;
  @Output() inited: EventEmitter<echarts.EChartsOption> = new EventEmitter();

  constructor() {
    super();
    this.option = Object.assign({}, ChartBar3DOption);
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
