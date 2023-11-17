import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonCheckboxListComponent } from 'src/app/common/components/common-checkbox-list/common-checkbox-list.component';
import { ICommonTree } from 'src/app/common/components/common-tree/common-tree.model';
import { Language } from 'src/app/common/tools/language';
import { UserLogRecordMessageType } from 'src/app/enum/user-log-record-message-type.enum';
import { IIdNameModel } from 'src/app/network/model/model.interface';

@Component({
  selector: 'aiop-user-log-record-message-type-list',
  templateUrl: './aiop-user-log-record-message-type-list.component.html',
  styleUrls: ['./aiop-user-log-record-message-type-list.component.less'],
})
export class AiopUserLogRecordMessageTypeListComponent
  extends CommonCheckboxListComponent
  implements OnInit, ICommonTree
{
  @Input() override selecteds: IIdNameModel[] = [];
  @Output() override selectedsChange: EventEmitter<IIdNameModel[]> =
    new EventEmitter();

  constructor() {
    super();
  }
  ngOnInit(): void {
    this.loadData();
  }

  getItem(type: UserLogRecordMessageType) {
    return {
      Id: type.toString(),
      Name: Language.MessageType(type),
    };
  }

  loadData() {
    this.datas = [
      this.getItem(UserLogRecordMessageType.Login),
      this.getItem(UserLogRecordMessageType.Logout),
      this.getItem(UserLogRecordMessageType.LoginFailed),
      this.getItem(UserLogRecordMessageType.CreateUser),
      this.getItem(UserLogRecordMessageType.DeleteUser),
      this.getItem(UserLogRecordMessageType.SetUser),
      this.getItem(UserLogRecordMessageType.CreateRole),
      this.getItem(UserLogRecordMessageType.DeleteRole),
      this.getItem(UserLogRecordMessageType.SetRole),
      this.getItem(UserLogRecordMessageType.ChangePassword),
    ];
  }
  tochange(item: IIdNameModel[]): void {
    this.selectedsChange.emit(item);
  }
}
