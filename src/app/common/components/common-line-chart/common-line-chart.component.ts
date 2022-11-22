import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'common-line-chart',
  templateUrl: './common-line-chart.component.html',
  styleUrls: ['./common-line-chart.component.less'],
})
export class CommonLineChartComponent implements OnInit {
  @Input() title: string = '';

  lineOption: EChartsOption = {
    title: {
      text: '',
    },
    legend: {
      left: '70%',
      textStyle: {
        color: 'inherit',
        fontSize: 15,
        fontWeight: 600,
      },
    },

    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
  };
  merge: EChartsOption = {
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line',
        name: '单位(吨)',
      },
    ],
  };

  constructor() {}

  ngOnInit(): void {}
}
