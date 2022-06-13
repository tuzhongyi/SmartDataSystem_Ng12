import { DatePipe } from '@angular/common';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { EventType } from 'src/app/enum/event-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { EventNumberStatistic } from 'src/app/network/model/event-number-statistic.model';
import { EChartLineOption } from './echart-line.option';
import { StatisticSummaryIllegalDropChartBusiness } from './statistic-summary-line-chart.business';
import { StatisticSummaryIllegalDropChartConverter } from './statistic-summary-line-chart.converter';
import { StatisticSummaryLineChartViewModel } from './statistic-summary-line-chart.model';
import * as echarts from 'echarts/core';

@Component({
  selector: 'app-statistic-summary-line-chart',
  templateUrl: './statistic-summary-line-chart.component.html',
  styleUrls: ['./statistic-summary-line-chart.component.css'],
  providers: [StatisticSummaryIllegalDropChartBusiness],
})
export class StatisticSummaryIllegalDropChartComponent
  implements
    AfterViewInit,
    OnChanges,
    IComponent<EventNumberStatistic[], StatisticSummaryLineChartViewModel>
{
  @ViewChild('echarts')
  private echarts?: ElementRef<HTMLDivElement>;

  myChart: any;

  @Input()
  Data?: EventNumberStatistic[];

  @Input()
  Type?: EventType;

  @Input()
  TimeUnit?: TimeUnit;
  @Input()
  EventTrigger?: EventEmitter<void>;
  @Output()
  OnTriggerEvent: EventEmitter<StatisticSummaryLineChartViewModel> = new EventEmitter();

  private data: StatisticSummaryLineChartViewModel =
    new StatisticSummaryLineChartViewModel();

  constructor(business: StatisticSummaryIllegalDropChartBusiness) {
    this.business = business;
  }
  business: IBusiness<
    EventNumberStatistic[],
    StatisticSummaryLineChartViewModel
  >;

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.TimeUnit) {
      this.onLoaded();
    }
  }
  ngOnInit(): void {
    if (this.EventTrigger) {
      this.EventTrigger.subscribe((x) => {
        this.OnTriggerEvent.emit(this.data);
      });
    }
  }

  ngAfterViewInit(): void {
    if (this.echarts) {
      this.myChart = echarts.init(this.echarts.nativeElement, 'dark');
      this.onLoaded();
    }
  }
  async onLoaded() {
    if (this.Data && this.TimeUnit) {
      this.data = await this.business.load(this.Data, this.Type, this.TimeUnit);
      this.option.title.text = this.data.title;
      this.setOption();
    }
  }

  setOption() {
    if (this.myChart) {
      this.myChart.resize();
      let option = this.getOption(this.data);

      this.myChart.setOption(option);
    }
  }

  getOption(viewModel: StatisticSummaryLineChartViewModel) {
    if (viewModel) {
      let max = Math.max(...viewModel.data);

      for (let i = 0; i < this.option.series.length; i++) {
        const serie = this.option.series[i];
        serie.data = viewModel.data;
        serie.label.formatter = (params) => {
          if (params.value === max) {
            return params.value;
          }
          if (params.dataIndex % 3 !== 0) {
            return '';
          }
          return params.value;
        };
      }
      this.option.xAxis.data = viewModel.xAxis;
      return this.option;
    }
    return undefined;
  }

  option = EChartLineOption;
}
