import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { IAuditGarbageStationDetailsTableArgs } from '../audit-garbage-station-details-table/audit-garbage-station-details-table.model';
import { AuditGarbageStationAbnormalTableArgs } from './audit-garbage-station-abnormal-table.model';
import { AuditGarbageStationAbnormalTableProviders } from './audit-garbage-station-abnormal-table.provider';
import { AuditGarbageStationAbnormalTableBusiness } from './business/audit-garbage-station-abnormal-table.business';

@Component({
  selector: 'audit-garbage-station-abnormal-table',
  templateUrl: './audit-garbage-station-abnormal-table.component.html',
  styleUrls: ['./audit-garbage-station-abnormal-table.component.less'],
  providers: [...AuditGarbageStationAbnormalTableProviders],
})
export class AuditGarbageStationAbnormalTableComponent implements OnInit {
  @Input() args: IAuditGarbageStationDetailsTableArgs =
    new AuditGarbageStationAbnormalTableArgs();
  @Input() load?: EventEmitter<IAuditGarbageStationDetailsTableArgs>;
  @Input() download?: EventEmitter<IAuditGarbageStationDetailsTableArgs>;
  @Output() dropwindows = new EventEmitter<GarbageStation>();
  @Output() command = new EventEmitter<GarbageStation>();
  @Output() videomultiple = new EventEmitter<GarbageStation>();
  @Output() schedule = new EventEmitter<GarbageStation>();
  @Output() status = new EventEmitter<GarbageStation>();
  constructor(public business: AuditGarbageStationAbnormalTableBusiness) {}

  ngOnInit(): void {}

  ondropwindows(item: GarbageStation) {
    this.dropwindows.emit(item);
  }
  onschedule(data: GarbageStation) {
    this.schedule.emit(data);
  }
  onstatus(data: GarbageStation) {
    this.status.emit(data);
  }
  oncommand(data: GarbageStation) {
    this.command.emit(data);
  }
  onvideomultiple(data: GarbageStation) {
    this.videomultiple.emit(data);
  }
}
