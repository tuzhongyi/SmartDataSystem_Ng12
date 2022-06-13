import {
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
import { Language } from 'src/app/global/tool/language';
import { StatisticSummaryViewModel } from '../../statistic-summary.model';
import { EChartPieOption } from './echart-pie.option';
import { StatisticSummaryEventRatioChartBusiness } from './statistic-summary-event-ratio-chart.business';
import { StatisticSummaryEventRatioChartConverter } from './statistic-summary-event-ratio-chart.converter';
import { StatisticSummaryEventRatioChartViewModel } from './statistic-summary-event-ratio-chart.model';
import * as echarts from 'echarts/core';

@Component({
  selector: 'app-statistic-summary-event-ratio-chart',
  templateUrl: './statistic-summary-event-ratio-chart.component.html',
  styleUrls: ['./statistic-summary-event-ratio-chart.component.css'],
  providers: [StatisticSummaryEventRatioChartBusiness],
})
export class StatisticSummaryEventRatioChartComponent
  implements
    OnInit,
    AfterViewInit,
    OnChanges,
    IComponent<
      StatisticSummaryViewModel[],
      StatisticSummaryEventRatioChartViewModel
    >
{
  Language = Language;

  @ViewChild('echarts')
  private echarts?: ElementRef<HTMLDivElement>;

  myChart: any;

  @Input()
  Data?: StatisticSummaryViewModel[];

  @Input()
  EventTrigger?: EventEmitter<void>;
  @Output()
  OnTriggerEvent: EventEmitter<StatisticSummaryEventRatioChartViewModel> = new EventEmitter();

  data?: StatisticSummaryEventRatioChartViewModel;

  constructor(business: StatisticSummaryEventRatioChartBusiness) {
    this.business = business;
  }
  business: IBusiness<
    StatisticSummaryViewModel[],
    StatisticSummaryEventRatioChartViewModel
  >;
  ngOnInit(): void {
    if (this.EventTrigger) {
      this.EventTrigger.subscribe((x) => {
        this.OnTriggerEvent.emit(this.data);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.onLoaded();
  }

  ngAfterViewInit(): void {
    if (this.echarts) {
      this.myChart = echarts.init(this.echarts.nativeElement, 'dark');
    }
    this.onLoaded();
  }
  async onLoaded() {
    if (this.Data) {
      this.data = await this.business.load(this.Data);
    }
    this.setOption();
  }

  setOption() {
    if (this.myChart) {
      this.myChart.resize();
      this.myChart.setOption(this.getOption(this.EChartOptionData), true);
    }
  }

  get EChartOptionData() {
    return [
      {
        value: this.data ? this.data.MixedInto : 0,
        name: Language.EventType(EventType.MixedInto),
      },
      {
        value: this.data ? this.data.GarbageFull : 0,
        name: Language.EventType(EventType.GarbageFull),
      },
      {
        value: this.data ? this.data.IllegalDrop : 0,
        name: Language.EventType(EventType.IllegalDrop),
      },
    ];
  }

  getOption(data: { value: number; name: string }[]) {
    for (let i = 0; i < this.option.series.length; i++) {
      const serie = this.option.series[i];
      serie.data = data;
    }
    return this.option;
  }

  option = EChartPieOption;
}
