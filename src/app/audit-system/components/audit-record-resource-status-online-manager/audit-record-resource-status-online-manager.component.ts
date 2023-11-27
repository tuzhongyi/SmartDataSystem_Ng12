import { Component, EventEmitter, OnInit } from '@angular/core';
import { AIOPRecordResourceStatusOnlineTableArgs } from 'src/app/common/components/tables/aiop-record-resource-status-online-table/aiop-record-resource-status-online-table.model';
import { Language } from 'src/app/common/tools/language';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { ResourceType } from 'src/app/enum/resource-type.enum';

@Component({
  selector: 'audit-record-resource-status-online-manager',
  templateUrl: './audit-record-resource-status-online-manager.component.html',
  styleUrls: [
    '../audit.less',
    './audit-record-resource-status-online-manager.component.less',
  ],
})
export class AuditRecordResourceStatusOnlineManagerComponent implements OnInit {
  args = new AIOPRecordResourceStatusOnlineTableArgs();
  load = new EventEmitter<AIOPRecordResourceStatusOnlineTableArgs>();
  ResourceType = ResourceType;
  OnlineStatus = OnlineStatus;
  Language = Language;
  constructor() {}

  ngOnInit(): void {}

  onsearch() {
    this.args.tofirst = true;
    this.load.emit(this.args);
  }
}
