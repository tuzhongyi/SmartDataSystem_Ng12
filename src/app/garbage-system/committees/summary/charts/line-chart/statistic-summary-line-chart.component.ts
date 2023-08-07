import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as echarts from 'echarts/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { EChartLineOption } from 'src/app/common/interfaces/echarts/echart-line.option';
import { EventType } from 'src/app/enum/event-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { EventNumberStatistic } from 'src/app/network/model/event-number-statistic.model';
import { StatisticSummaryIllegalDropChartBusiness } from './statistic-summary-line-chart.business';
import { StatisticSummaryLineChartViewModel } from './statistic-summary-line-chart.model';

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
  private echartElement?: ElementRef<HTMLDivElement>;

  echarts: any;

  @Input()
  Data?: EventNumberStatistic[];

  @Input()
  Type?: EventType;

  @Input()
  TimeUnit?: TimeUnit;
  @Input()
  EventTrigger?: EventEmitter<void>;
  @Output()
  OnTriggerEvent: EventEmitter<StatisticSummaryLineChartViewModel> =
    new EventEmitter();

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
    if (this.echartElement) {
      this.echarts = echarts.init(this.echartElement.nativeElement, 'dark');
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
    if (this.echarts) {
      this.echarts.resize();
      let option = this.getOption(this.data);

      this.echarts.setOption(option);
    }
  }

  getOption(viewModel: StatisticSummaryLineChartViewModel) {
    if (viewModel) {
      let max = Math.max(...viewModel.data);

      for (let i = 0; i < this.option.series.length; i++) {
        const serie = this.option.series[i] as any;
        serie.data = viewModel.data;
        serie.label.formatter = (params: any) => {
          if (params.value === max) {
            return params.value;
          }
          if (params.dataIndex % 3 !== 0) {
            return '';
          }
          return params.value;
        };
      }
      (this.option.xAxis as any).data = viewModel.xAxis;
      return this.option;
    }
    return undefined;
  }

  option = EChartLineOption;
}
