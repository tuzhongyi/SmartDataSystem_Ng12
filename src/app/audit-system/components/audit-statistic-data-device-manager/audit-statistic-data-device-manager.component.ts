import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeviceListTableArgs } from 'src/app/common/components/tables/device-list-table/device-list-table.model';
import { DeviceViewModel } from 'src/app/common/components/tables/device-list-table/device.model';
import { Language } from 'src/app/common/tools/language';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { AuditStatisticDataSelection } from '../audit-statistic-data/audit-statistic-data.selection';

@Component({
  selector: 'audit-statistic-data-device-manager',
  templateUrl: './audit-statistic-data-device-manager.component.html',
  styleUrls: ['./audit-statistic-data-device-manager.component.less'],
})
export class AuditStatisticDataDeviceManagerComponent implements OnInit {
  @Input() status?: OnlineStatus;
  @Output() image = new EventEmitter<DeviceViewModel>();

  constructor() {}

  args = new DeviceListTableArgs();
  load = new EventEmitter<DeviceListTableArgs>();
  selection = new AuditStatisticDataSelection();
  OnlineStatus = OnlineStatus;
  Language = Language;
  ngOnInit(): void {
    this.args.status = this.status;
    this.selection.select.subscribe((x) => {
      this.args.divisionId = x?.Id;
    });
  }

  onsearch() {
    this.load.emit(this.args);
  }
  onimage(item: DeviceViewModel) {
    this.image.emit(item);
  }
}
