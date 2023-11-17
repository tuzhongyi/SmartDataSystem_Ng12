import { Component, EventEmitter, OnInit } from '@angular/core';
import { AIOPUserLogRecordTableArgs } from 'src/app/common/components/tables/aiop-user-log-record-table/aiop-user-log-record-table.model';
import { IIdNameModel } from 'src/app/network/model/model.interface';

@Component({
  selector: 'aiop-user-log-record-manager',
  templateUrl: './aiop-user-log-record-manager.component.html',
  styleUrls: ['./aiop-user-log-record-manager.component.less'],
})
export class AIOPUserLogRecordManagerComponent implements OnInit {
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
