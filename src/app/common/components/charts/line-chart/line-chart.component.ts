import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts/core';

@Component({
  selector: 'howell-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.less'],
})
export class LineChartComponent implements OnInit, OnChanges {
  @Input() theme: string = '';
  @Input() options: EChartsOption = {};
  @Input() merge: EChartsOption = {};

  constructor() {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    // console.log('changes', changes);
  }
  onResized(e: ResizedEvent) {
    let w = e.newRect.width;
    if (this.merge) {
      this.merge.title = {
        textStyle: {
          width: w,
        },
      }
    }
  }
}
