import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { EventType } from 'src/app/enum/event-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { EventNumberStatistic } from 'src/app/network/model/event-number-statistic.model';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station-number-statistic-v2.model';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station-number-statistic.model';
import { StatisticSummaryViewModel } from '../statistic-summary.model';
import { StatisticSummaryEventRatioChartViewModel } from './event-ratio/statistic-summary-event-ratio-chart.model';
import { StatisticSummaryLineChartViewModel } from './line-chart/statistic-summary-line-chart.model';
import { StatisticSummaryStationEventChartViewModel } from './station-event/statistic-summary-station-event-chart.model';
import { StatisticSummaryTaskChartViewModel } from './task-statistic/statistic-summary-task-chart.model';

@Component({
  selector: 'app-statistic-summary-charts',
  templateUrl: './statistic-summary-charts.component.html',
  styleUrls: ['./statistic-summary-charts.component.css'],
})
export class StatisticSummaryChartsComponent implements AfterViewInit, OnInit {
  EventType = EventType;

  @Input()
  DivisonStatistic?: StatisticSummaryViewModel[];

  @Input()
  StationStatistic: GarbageStationNumberStatisticV2[] = [];

  @Input()
  DivisionHistory: EventNumberStatistic[] = [];

  @Input()
  EventTrigger?: EventEmitter<void>;

  @Output()
  OnTriggerEvent: EventEmitter<
    | StatisticSummaryTaskChartViewModel
    | StatisticSummaryEventRatioChartViewModel
    | StatisticSummaryLineChartViewModel
    | StatisticSummaryStationEventChartViewModel[]
  > = new EventEmitter();

  onTriggerEvent(
    data:
      | StatisticSummaryTaskChartViewModel
      | StatisticSummaryEventRatioChartViewModel
      | StatisticSummaryLineChartViewModel
      | StatisticSummaryStationEventChartViewModel[]
  ) {
    this.OnTriggerEvent.emit(data);
  }

  @Input()
  TimeUnit?: TimeUnit;

  constructor() {}
  ngAfterViewInit(): void {}
  ngOnInit() {}
}
