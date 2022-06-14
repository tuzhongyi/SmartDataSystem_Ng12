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
import { classToPlain, plainToClass } from 'class-transformer';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station-number-statistic-v2.model';
import { EchartBarOption } from './echart-bar.option';
import { StatisticSummaryStationEventChartBusiness } from './statistic-summary-station-event-chart.business';
import { StatisticSummaryStationEventChartConverter } from './statistic-summary-station-event-chart.converter';
import { StatisticSummaryStationEventChartViewModel } from './statistic-summary-station-event-chart.model';
import * as echarts from 'echarts/core';

@Component({
  selector: 'app-statistic-summary-station-event-chart',
  templateUrl: './statistic-summary-station-event-chart.component.html',
  styleUrls: ['./statistic-summary-station-event-chart.component.css'],
  providers: [StatisticSummaryStationEventChartBusiness],
})
export class StatisticSummaryStationEventChartComponent
  implements
    OnInit,
    AfterViewInit,
    OnChanges,
    IComponent<
      GarbageStationNumberStatisticV2[],
      StatisticSummaryStationEventChartViewModel[]
    >
{
  @Input()
  EventTrigger?: EventEmitter<void>;
  @Output()
  OnTriggerEvent: EventEmitter<StatisticSummaryStationEventChartViewModel[]> =
    new EventEmitter();

  myChart: any;
  @ViewChild('echarts')
  private echarts?: ElementRef<HTMLDivElement>;

  @Input()
  Data?: GarbageStationNumberStatisticV2[];

  data?: StatisticSummaryStationEventChartViewModel[];

  constructor(business: StatisticSummaryStationEventChartBusiness) {
    this.business = business;
  }
  business: IBusiness<
    GarbageStationNumberStatisticV2[],
    StatisticSummaryStationEventChartViewModel[]
  >;
  ngOnInit(): void {
    if (this.EventTrigger) {
      this.EventTrigger.subscribe((x) => {
        console.log(this.data);
        this.OnTriggerEvent.emit(this.data);
      });
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.Data) {
      if (changes.Data.currentValue != changes.Data.previousValue) {
        console.log(changes);
        this.onLoaded();
      }
    }
  }
  async onLoaded() {
    if (this.Data && this.Data.length > 0) {
      this.data = await this.business.load(this.Data);

      this.option.dataset.source = this.data;
      this.option.xAxis.data = this.data.map(
        (x: { product: any }) => x.product
      );
      this.setOption();
    }
  }

  ngAfterViewInit(): void {
    if (this.echarts) {
      this.myChart = echarts.init(this.echarts.nativeElement, 'dark');
      this.onLoaded();
    }
  }

  setOption() {
    if (this.myChart) {
      this.myChart.resize();
      console.log(this.option);
      this.myChart.setOption(this.option, true);
    }
  }

  option = classToPlain(EchartBarOption);
}
