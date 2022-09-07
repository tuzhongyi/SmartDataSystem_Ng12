import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogEnum } from 'src/app/enum/dialog.enum';
import { ConfirmDialogModel } from 'src/app/view-model/confirm-dialog.model';


@Component({
  selector: 'howell-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.less']
})
export class ConfirmDialogComponent implements OnInit {

  @Input() dialogModel: ConfirmDialogModel = new ConfirmDialogModel('确认删除', '删除该项');

  @Output() dialogMsgEvent = new EventEmitter<DialogEnum>();

  constructor() { }

  ngOnInit(): void {
  }
  confirmClick() {
    this.dialogMsgEvent.emit(DialogEnum.confirm)
  }
  cancelClick() {
    this.dialogMsgEvent.emit(DialogEnum.cancel)

  }

}
