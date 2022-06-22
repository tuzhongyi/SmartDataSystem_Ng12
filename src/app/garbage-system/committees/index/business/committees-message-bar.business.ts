import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { MessageBar } from 'src/app/common/tools/message-bar';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { Language } from 'src/app/common/tools/language';
import { IllegalDropEventRecord } from 'src/app/network/model/garbage-event-record.model';
import { User } from 'src/app/network/model/user.model';
import {
  CommitteesMessageBarNotifyViewModel,
  NotifyStatus,
} from '../../message-bar/message-bar.model';
import { CommitteesIndexService } from '../index.component.service';
import { CommitteesWindowBussiness } from './committees-window.business';

export class CommitteesMessageBarBussiness {
  user: User;
  constructor(private window: CommitteesWindowBussiness, user: User) {
    this.user = user;
    this.initForUser();

    window.mobile.bindedEvent.subscribe((x) => {
      if (this.user.MobileNo) {
        this.notify = undefined;
        MessageBar.response_success('手机号绑定成功。');
      } else {
        MessageBar.response_Error('手机号绑定失败。');
      }
    });
  }
  notify?: CommitteesMessageBarNotifyViewModel;

  subscribe(record: IllegalDropEventRecord) {
    this.notify = new CommitteesMessageBarNotifyViewModel();
    this.notify.status = NotifyStatus.normal;
    let date = formatDate(record.EventTime, 'HH:mm:ss', 'en');
    this.notify.text = `${date} ${record.Data.StationName} ${Language.EventType(
      record.EventType
    )}`;
  }

  onChangePasswordClick() {
    this.window.password.show = true;
  }

  onChangeMobileClick() {
    this.window.mobile.show = true;
  }

  async initForUser() {
    this.createNotify();
  }

  createNotify() {
    if (!this.user.MobileNo) {
      this.notify = new CommitteesMessageBarNotifyViewModel();
      this.notify.status = NotifyStatus.remind;
      this.notify.text = '提示：您还未绑定手机号码 点击这里绑定';
      this.notify.onClick = () => {
        this.window.mobile.show = true;
      };
    }
  }
}
