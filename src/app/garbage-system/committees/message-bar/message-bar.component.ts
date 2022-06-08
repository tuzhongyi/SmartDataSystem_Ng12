import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Division } from 'src/app/network/model/division.model';
import {
  CommitteesMessageBarNotifyViewModel,
  NotifyStatus,
} from './message-bar.model';

@Component({
  selector: 'howell-message-bar',
  templateUrl: './message-bar.component.html',
  styleUrls: ['./message-bar.component.less'],
})
export class CommitteesMessageBarComponent implements OnInit {
  constructor() {}

  NotifyStatus = NotifyStatus;

  @Input()
  Committees?: Division;

  @Input()
  Notify?: CommitteesMessageBarNotifyViewModel;

  @Output()
  OnChangePasswordClick = new EventEmitter();
  @Output()
  OnChangeMobileClick = new EventEmitter();

  onChangePasswordClick() {
    this.OnChangePasswordClick.emit();
  }
  onChangeMobileClick() {
    this.OnChangeMobileClick.emit();
  }

  ngOnInit(): void {}

  notifyClick(event: Event) {
    if (this.Notify && this.Notify.onClick) {
      this.Notify.onClick();
    }
  }
}
