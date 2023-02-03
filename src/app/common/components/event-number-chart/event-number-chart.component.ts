import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { Color, XAXisComponentOption, YAXisComponentOption } from 'echarts';
import {
  BarChart,
  BarSeriesOption,
  LineChart,
  LineSeriesOption,
} from 'echarts/charts';
import {
  TitleComponent,
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
} from 'echarts/components';
import * as echarts from 'echarts/core';

echarts.use([TitleComponent, TooltipComponent, BarChart, LineChart]);
type ECOption = echarts.ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | XAXisComponentOption
  | YAXisComponentOption
  | BarSeriesOption
  | LineSeriesOption
>;

import { ChartType } from 'src/app/enum/chart-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { EventNumberChartSearchInfo } from 'src/app/view-model/event-number-chart.model';
import { TimeService } from '../../tools/time';
import { EventNumberChartBusiness } from './event-number-chart.business';

@Component({
  selector: 'event-number-chart',
  templateUrl: './event-number-chart.component.html',
  styleUrls: ['./event-number-chart.component.less'],
  providers: [EventNumberChartBusiness],
})
export class EventNumberChartComponent implements OnInit, AfterViewInit {
  // 当前区划ID
  private _resourceId: string = '';
  @Input()
  set resourceId(id: string) {
    console.log('set resourceId');
    this._resourceId = id;
    this.searchInfo.ResourceId = id;
  }
  get resourceId() {
    return this._resourceId;
  }

  TimeUnit = TimeUnit;
  ChartType = ChartType;

  dateFormat: string = 'yyyy年MM月dd日';
  curDate = new Date();
  chartType = ChartType.bar;

  searchInfo: EventNumberChartSearchInfo = {
    CurrentTime: TimeService.beginTime(this.curDate),
    TimeUnit: TimeUnit.Day,
    ResourceId: this.resourceId,
  };

  myChart: echarts.ECharts | null = null;
  lineSeries: LineSeriesOption = {
    type: 'line',
    name: '单位(起)',
    data: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 74, 106, 124, 85, 86, 34, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0,
    ],
    areaStyle: {},
    label: {
      show: true,
    },
  };
  barSeries: BarSeriesOption = {
    type: 'bar',
    name: '单位(起)',
    data: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 74, 106, 124, 85, 86, 34, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0,
    ],
    barMinHeight: 5,
    label: {
      show: true,
      // color: '#7586e0',
      // fontSize: 16,
      // position: 'top',
    },
  };

  option: ECOption = {
    title: {
      text: '单位(起)',
      right: 0,
      textStyle: {
        color: '#7586e0',
        fontSize: 14,
      },
    },
    tooltip: {},
    xAxis: {
      mainType: 'xAxis',
      type: 'category',
      data: [
        '00:00',
        '01:00',
        '02:00',
        '03:00',
        '04:00',
        '05:00',
        '06:00',
        '07:00',
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
        '23:00',
        '24:00',
      ],
    },
    yAxis: {
      mainType: 'yAxis',
      type: 'value',
    },
    series: [],
  };

  @ViewChild('chartContainer') container!: ElementRef<HTMLDivElement>;

  constructor(private _business: EventNumberChartBusiness) {}

  ngOnInit(): void {
    this._init();
  }
  private _init() {
    this._business.init();
  }

  ngAfterViewInit(): void {
    if (this.container) {
      this.myChart = echarts.init(this.container.nativeElement, 'adsame');
      if (this.chartType == ChartType.line) {
        this.option.series = [this.lineSeries];
      } else if (this.chartType == ChartType.bar) {
        this.option.series = [this.barSeries];
      }
      this.myChart.setOption(this.option);
    }
  }
  changeChartType(type: ChartType) {
    if (type == ChartType.line) {
      this.option.series = [this.lineSeries];
    } else if (type == ChartType.bar) {
      this.option.series = [this.barSeries];
    }
    this.myChart?.setOption(this.option);
  }
  search() {}

  selectTreeNode(data: any) {
    console.log('sd');
  }
  exportCSV() {}
  exportXLSX() {}
  changeTimeUnit(unit: TimeUnit) {}
  onResized(e: ResizedEvent) {
    this.myChart?.resize();
  }
  private _updateSearchInfo() {}
}
