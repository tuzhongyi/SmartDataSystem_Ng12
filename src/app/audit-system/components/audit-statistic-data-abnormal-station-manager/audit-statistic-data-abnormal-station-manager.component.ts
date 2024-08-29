import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuditGarbageStationAbnormalTableArgs } from 'src/app/common/components/tables/audit-garbage-station-abnormal-table/audit-garbage-station-abnormal-table.model';
import { Language } from 'src/app/common/tools/language';
import { isEmpty } from 'src/app/common/tools/tool';
import { GarbageStationAbnormalType } from 'src/app/enum/garbage-station-abnormal-type.enum';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { AuditStatisticDataAbnormalStationManagerProviders } from './audit-statistic-data-abnormal-station-manager.provider';
import { AuditStatisticDataAbnormalStationManagerController } from './controllers/audit-statistic-data-abnormal-station-manager.controller';
import { AuditStatisticDataAbnormalStationManagerWindow } from './windows/audit-statistic-data-abnormal-station-manager.window';

@Component({
  selector: 'audit-statistic-data-abnormal-station-manager',
  templateUrl: './audit-statistic-data-abnormal-station-manager.component.html',
  styleUrls: ['./audit-statistic-data-abnormal-station-manager.component.less'],
  providers: [...AuditStatisticDataAbnormalStationManagerProviders],
})
export class AuditStatisticDataAbnormalStationManagerComponent
  implements OnInit
{
  @Input() divisionId?: string;
  @Input() hour?: number;
  @Input() type?: GarbageStationAbnormalType;

  @Output() dropwindows = new EventEmitter<GarbageStation>();

  constructor(
    public controller: AuditStatisticDataAbnormalStationManagerController,
    public window: AuditStatisticDataAbnormalStationManagerWindow
  ) {}

  args = new AuditGarbageStationAbnormalTableArgs();
  load = new EventEmitter<AuditGarbageStationAbnormalTableArgs>();
  download = new EventEmitter<AuditGarbageStationAbnormalTableArgs>();

  GarbageStationAbnormalType = GarbageStationAbnormalType;
  Language = Language;

  ngOnInit(): void {
    this.args.divisionId = this.divisionId;
    this.args.hour = this.hour;
    this.args.type = this.type;
    this.controller.division.select.subscribe((x) => {
      this.args.divisionId = x?.Id;
    });
  }

  onsearch() {
    this.load.emit(this.args);
  }
  ondownload() {
    this.download.emit(this.args);
  }
  ondropwindows(data: GarbageStation) {
    this.dropwindows.emit(data);
  }
  onschedule(data: GarbageStation) {
    if (data.GarbageDeviceData) {
      this.window.schedule.model = data;
      this.window.schedule.show = true;
    }
  }
  onconstruction(data: GarbageStation) {
    if (data.ConstructionData) {
      this.window.construction.model = data;
      this.window.construction.show = true;
    }
  }
  onstatus(data: GarbageStation) {
    if (
      !isEmpty(data.GarbageDeviceData) ||
      !isEmpty(data.ConstructionData) ||
      !isEmpty(data.NBState)
    ) {
      this.window.status.model = data;
      this.window.status.show = true;
    }
  }
  oncommand(data: GarbageStation) {
    if (data.GarbageDeviceData) {
      this.window.command.model = data;
      this.window.command.show = true;
    }
  }
  onvideomultiple(data: GarbageStation) {
    this.window.video.open(data);
  }
}
