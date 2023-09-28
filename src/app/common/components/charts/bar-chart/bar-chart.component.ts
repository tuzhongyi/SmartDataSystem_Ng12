import { Component, Input, OnInit } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'howell-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.less'],
})
export class BarChartComponent implements OnInit {
  @Input() theme: string = '';
  @Input() options: EChartsOption = {};
  @Input() merge: EChartsOption = {};

  constructor() {}

  ngOnInit(): void {
    console.log('theme', this.theme);
    console.log('options', this.options);
    console.log('merge', this.merge);
  }
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
