import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmDialogEnum } from 'src/app/enum/confim-dialog.enum';
import { ConfirmDialogModel } from 'src/app/view-model/confirm-dialog.model';


@Component({
  selector: 'howell-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.less']
})
export class ConfirmDialogComponent implements OnInit {

  @Input() dialogModel: ConfirmDialogModel = new ConfirmDialogModel('确认删除', '删除该项');

  @Output() dialogMsg = new EventEmitter<ConfirmDialogEnum>();

  constructor() { }

  ngOnInit(): void {
  }
  confirmClick() {
    this.dialogMsg.emit(ConfirmDialogEnum.confirm)
  }
  cancelClick() {
    this.dialogMsg.emit(ConfirmDialogEnum.cancel)

  }

}
