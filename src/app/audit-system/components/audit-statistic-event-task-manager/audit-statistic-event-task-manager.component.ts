import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { GarbageDropRecordFilter } from 'src/app/common/components/tables/garbage-drop-record-table/garbage-drop-record.model';
import { AuditStatisticEventSelection } from '../audit-statistic-event/audit-statistic-event.selection';

@Component({
  selector: 'audit-statistic-event-task-manager',
  templateUrl: './audit-statistic-event-task-manager.component.html',
  styleUrls: ['./audit-statistic-event-task-manager.component.less'],
})
export class AuditStatisticEventTaskManagerComponent implements OnInit {
  @Input() divisionId?: string;
  constructor() {}

  selection = new AuditStatisticEventSelection();
  args = new GarbageDropRecordFilter();
  load = new EventEmitter<GarbageDropRecordFilter>();

  ngOnInit(): void {
    if (this.divisionId) {
      this.args.divisionId = this.divisionId;
      this.selection.default = [this.divisionId];
    }
    this.selection.select.subscribe((x) => {
      this.args.divisionId = x?.Id;
    });
  }

  onsearch() {
    this.load.emit(this.args);
  }
}
