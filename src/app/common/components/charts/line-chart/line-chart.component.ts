import { Component, Input, OnInit } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'howell-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.less'],
})
export class LineChartComponent implements OnInit {
  @Input() theme: string = 'adsame';
  @Input() options: EChartsOption = {};
  @Input() merge: EChartsOption = {};

  constructor() {}

  ngOnInit(): void {}
  onResized(e: ResizedEvent) {
    let w = e.newRect.width;
    if (this.merge) {
      this.merge.title = {
        textStyle: {
          width: w,
        },
      };
    }
  }
}
