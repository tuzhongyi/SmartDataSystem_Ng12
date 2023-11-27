import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuditGarbageStationTableArgs } from 'src/app/common/components/tables/audit-garbage-station-table/audit-garbage-station-table.model';
import { Language } from 'src/app/common/tools/language';
import { StationState } from 'src/app/enum/station-state.enum';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { PagedArgs } from 'src/app/network/model/model.interface';
import { AuditStatisticDataSelection } from '../audit-statistic-data/audit-statistic-data.selection';

@Component({
  selector: 'audit-statistic-data-station-manager',
  templateUrl: './audit-statistic-data-station-manager.component.html',
  styleUrls: ['./audit-statistic-data-station-manager.component.less'],
})
export class AuditStatisticDataStationManagerComponent implements OnInit {
  @Input() state?: StationState;
  @Input() drop?: boolean;
  @Output() image: EventEmitter<PagedArgs<GarbageStation>> = new EventEmitter();

  constructor() {}

  args = new AuditGarbageStationTableArgs();
  load = new EventEmitter<AuditGarbageStationTableArgs>();
  selection = new AuditStatisticDataSelection();
  StationState = StationState;
  Language = Language;
  ngOnInit(): void {
    this.args.state = this.state;
    this.args.drop = this.drop;
    this.selection.select.subscribe((x) => {
      this.args.divisionId = x?.Id;
    });
  }
  onsearch() {
    this.load.emit(this.args);
  }
  onimage(item: PagedArgs<GarbageStation>) {
    this.image.emit(item);
  }
}
