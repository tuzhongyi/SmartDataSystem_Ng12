import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { XAXisComponentOption, YAXisComponentOption } from 'echarts';
import { BarChart, BarSeriesOption, LineChart, LineSeriesOption } from 'echarts/charts';
import * as echarts from 'echarts/core';

echarts.use([
  BarChart,
  LineChart
])
type ECOption = echarts.ComposeOption<
  XAXisComponentOption |
  YAXisComponentOption |
  BarSeriesOption |
  LineSeriesOption
>



import { ChartType } from 'src/app/enum/chart-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { EventNumberChartSearchInfo } from 'src/app/view-model/event-number-chart.model';
import { Time } from '../../tools/time';

@Component({
  selector: 'event-number-chart',
  templateUrl: './event-number-chart.component.html',
  styleUrls: ['./event-number-chart.component.less']
})
export class EventNumberChartComponent implements OnInit, AfterViewInit {
  TimeUnit = TimeUnit;
  ChartType = ChartType;

  dateFormat: string = 'yyyy年MM月dd日';
  curDate = new Date();
  chartType = ChartType.bar;

  searchInfo: EventNumberChartSearchInfo = {
    CurrentTime: Time.beginTime(this.curDate),
    TimeUnit: TimeUnit.Day,
  }

  myChart: echarts.ECharts | null = null;
  lineSeries: LineSeriesOption = {
    type: 'line',
    name: 'Highest',
    data: [10, 11, 13, 11, 12, 12, 9],
  }
  barSeries: BarSeriesOption = {
    type: 'bar',
    name: 'Highest',
    data: [10, 11, 13, 11, 12, 12, 9],
  }


  option: ECOption = {
    xAxis: {
      mainType: "xAxis",
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      mainType: 'yAxis',
      type: "value"
    },
    series: [

    ]
  }
  @ViewChild('chartContainer') container!: ElementRef<HTMLDivElement>;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.container) {
      this.myChart = echarts.init(this.container.nativeElement);
      if (this.chartType == ChartType.line) {
        this.option.series = [this.lineSeries]

      } else if (this.chartType == ChartType.bar) {
        this.option.series = [this.barSeries]
      }
      this.myChart.setOption(this.option)
    }
  }
  changeChartType(type: ChartType) {
    if (type == ChartType.line) {
      this.option.series = [this.lineSeries]

    } else if (type == ChartType.bar) {
      this.option.series = [this.barSeries]
    }
    this.myChart?.setOption(this.option)
  }
  changeDate(date: Date) {
    this.curDate = date;
    // this._updateSearchInfo();
  }
  search() {

  }

  selectTreeNode(data: any) {
    console.log('sd')
  }
  exportCSV() {

  }
  exportXLSX() {

  }
  changeTimeUnit(unit: TimeUnit) {
  }
  onResized(e: ResizedEvent) {
    this.myChart?.resize();
  }
  private _updateSearchInfo() {

  }

}
