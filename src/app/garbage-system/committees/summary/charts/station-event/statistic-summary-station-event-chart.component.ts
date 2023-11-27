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
import { instanceToPlain } from 'class-transformer';
import * as echarts from 'echarts/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { DivisionNumberStatisticV2 } from 'src/app/network/model/garbage-station/division-number-statistic-v2.model';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station/garbage-station-number-statistic-v2.model';
import { EchartBarOption } from '../../../../../common/interfaces/echarts/echart-bar.option';
import { StatisticSummaryStationEventChartBusiness } from './statistic-summary-station-event-chart.business';
import { StatisticSummaryStationEventChartViewModel } from './statistic-summary-station-event-chart.model';

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
  @Input() title = '投放点事件';
  @Input() Data?: (
    | GarbageStationNumberStatisticV2
    | DivisionNumberStatisticV2
  )[];
  @Input()
  EventTrigger?: EventEmitter<void>;
  @Output()
  OnTriggerEvent: EventEmitter<StatisticSummaryStationEventChartViewModel[]> =
    new EventEmitter();

  echart: any;
  @ViewChild('echarts')
  private echartElement?: ElementRef<HTMLDivElement>;

  data?: StatisticSummaryStationEventChartViewModel[];

  constructor(business: StatisticSummaryStationEventChartBusiness) {
    this.business = business;
  }
  business: IBusiness<
    GarbageStationNumberStatisticV2[],
    StatisticSummaryStationEventChartViewModel[]
  >;
  ngOnInit(): void {
    this.option.title.text = this.title;
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
    if (this.echartElement) {
      this.echart = echarts.init(this.echartElement.nativeElement, 'dark');
      this.onLoaded();
    }
  }

  setOption() {
    if (this.echart) {
      this.echart.resize();
      console.log(this.option);
      this.echart.setOption(this.option, true);
    }
  }

  option = instanceToPlain(EchartBarOption);
}
