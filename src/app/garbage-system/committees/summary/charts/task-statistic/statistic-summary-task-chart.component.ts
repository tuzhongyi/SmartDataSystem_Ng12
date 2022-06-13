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
import { classToPlain } from 'class-transformer';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { StatisticSummaryViewModel } from '../../statistic-summary.model';
import { StatisticSummaryTaskChartBusiness } from './statistic-summary-task-chart.business';
import { StatisticSummaryTaskChartConverter } from './statistic-summary-task-chart.converter';
import { StatisticSummaryTaskChartViewModel } from './statistic-summary-task-chart.model';
import { StatisticSummaryTaskChartOption } from './statistic-summary-task-chart.option';
import * as echarts from 'echarts/core';

@Component({
  selector: 'app-statistic-summary-task-chart',
  templateUrl: './statistic-summary-task-chart.component.html',
  styleUrls: ['./statistic-summary-task-chart.component.css'],
  providers: [StatisticSummaryTaskChartBusiness],
})
export class StatisticSummaryTaskChartComponent
  implements
    OnInit,
    OnChanges,
    AfterViewInit,
    IComponent<StatisticSummaryViewModel[], StatisticSummaryTaskChartViewModel>
{
  myChart: any;

  @Input()
  EventTrigger?: EventEmitter<void>;
  @Output()
  OnTriggerEvent: EventEmitter<StatisticSummaryTaskChartViewModel> = new EventEmitter();

  @Input()
  Data?: StatisticSummaryViewModel[];

  data: StatisticSummaryTaskChartViewModel =
    new StatisticSummaryTaskChartViewModel();

  @ViewChild('echarts')
  private echarts?: ElementRef<HTMLDivElement>;

  option = StatisticSummaryTaskChartOption;

  constructor(business: StatisticSummaryTaskChartBusiness) {
    this.business = business;
  }
  business: IBusiness<
    StatisticSummaryViewModel[],
    StatisticSummaryTaskChartViewModel
  >;

  ngOnChanges(changes: SimpleChanges): void {
    this.onLoaded();
  }
  ngAfterViewInit(): void {
    if (this.echarts) {
      this.myChart = echarts.init(this.echarts.nativeElement, 'dark');
      this.onLoaded();
    }
  }
  ngOnInit() {
    if (this.EventTrigger) {
      this.EventTrigger.subscribe((x) => {
        this.OnTriggerEvent.emit(this.data);
      });
    }
  }

  async onLoaded() {
    if (this.Data) {
      this.data = await this.business.load(this.Data);
      this.setOption();
    }
  }

  setOption() {
    if (this.data) {
      if (this.option.series.length > 0) {
        if (
          this.option.series[0].data &&
          this.option.series[0].data.length > 0
        ) {
          this.option.series[0].data[0].value = parseInt(
            this.data.taskRatio.toString()
          );
        }
      }
      if (this.option.series.length > 1) {
        if (
          this.option.series[1].data &&
          this.option.series[1].data.length > 0
        ) {
          this.option.series[1].data[0].value = parseInt(
            this.data.timeoutRatio.toString()
          );
        }
      }
    }
    if (this.myChart) {
      this.myChart.resize();
      this.myChart.setOption(this.option, true);
    }
  }
}
