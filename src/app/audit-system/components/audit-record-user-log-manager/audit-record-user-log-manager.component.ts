import { Component, EventEmitter, OnInit } from '@angular/core';
import { AIOPUserLogRecordTableArgs } from 'src/app/common/components/tables/aiop-user-log-record-table/aiop-user-log-record-table.model';
import { IIdNameModel } from 'src/app/network/model/model.interface';

@Component({
  selector: 'audit-record-user-log-manager',
  templateUrl: './audit-record-user-log-manager.component.html',
  styleUrls: ['./audit-record-user-log-manager.component.less'],
})
export class AuditRecordUserLogManagerComponent implements OnInit {
  args = new AIOPUserLogRecordTableArgs();
  load = new EventEmitter<AIOPUserLogRecordTableArgs>();

  private _types: IIdNameModel[] = [];
  public get types(): IIdNameModel[] {
    return this._types;
  }
  public set types(v: IIdNameModel[]) {
    this._types = v;
    this.args.types = v.map((x) => parseInt(x.Id));
  }

  constructor() {}

  ngOnInit(): void {}

  onsearch() {
    this.args.tofirst = true;
    this.load.emit(this.args);
  }
}
