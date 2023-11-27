import { Component, OnInit } from '@angular/core';
import { EventType } from 'src/app/enum/event-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { StatisticSummaryTaskChartEventArgs } from 'src/app/garbage-system/committees/summary/charts/task-statistic/statistic-summary-task-chart.model';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import {
  AuditStatisticEventWindow,
  AuditStatisticEventWindows,
} from './audit-statistic-event-windows/audit-statistic-event.windows';
import { AuditStatisticEventBusiness } from './audit-statistic-event.business';
import { AuditStatisticEventData } from './audit-statistic-event.model';
import { AuditStatisticEventSelection } from './audit-statistic-event.selection';
import { AuditStatisticEventService } from './audit-statistic-event.service';

@Component({
  selector: 'audit-statistic-event',
  templateUrl: './audit-statistic-event.component.html',
  styleUrls: ['./audit-statistic-event.component.less'],
  providers: [
    AuditStatisticEventService,
    AuditStatisticEventBusiness,
    ...AuditStatisticEventWindows,
  ],
})
export class AuditStatisticEventComponent implements OnInit {
  constructor(
    private business: AuditStatisticEventBusiness,
    public window: AuditStatisticEventWindow
  ) {}

  selection = new AuditStatisticEventSelection();
  data: AuditStatisticEventData = new AuditStatisticEventData();
  TimeUnit = TimeUnit;
  EventType = EventType;
  loading = false;
  ngOnInit(): void {
    this.init();
    this.selection.select.subscribe((x) => {
      this.loadData(x);
    });
  }

  init() {
    this.business.default().then((x) => {
      if (x) {
        this.selection.default = [x.Id];
        this.loadData(x);
      }
    });
  }

  loadData(division: Division) {
    this.loading = true;
    this.business.load(division).then((x) => {
      this.data = x;
      this.loading = false;
    });
  }

  ontask() {
    this.window.clear();
    this.window.task.divisionId = this.selection.selected?.Id;
    this.window.task.show = true;
  }
  ondrop(args?: StatisticSummaryTaskChartEventArgs) {
    this.window.clear();
    this.window.drop.divisionId = this.selection.selected?.Id;
    if (args) {
      this.window.drop.handle = args.handle;
      this.window.drop.timeout = args.timeout;
    }
    this.window.drop.show = true;
  }
  onrecord(type: EventType) {
    this.window.clear();
    this.window.record.divisionId = this.selection.selected?.Id;
    this.window.record.type = type;
    this.window.record.show = true;
  }
}
