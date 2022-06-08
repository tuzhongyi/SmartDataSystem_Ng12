import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/global/service/local-storage.service';
import { CommitteesIndexHistroyTableBussiness } from './business/committees-index-history-table.business';
import { CommitteesIndexStatisticBussiness } from './business/committees-index-statistic.business';
import { CommitteesIndexTaskTableBussiness } from './business/committees-index-task-table.business';
import { CommitteesMessageBarBussiness } from './business/committees-message-bar.business';
import { CommitteesWindowBussiness } from './business/committees-window.business';

@Injectable()
export class CommitteesIndexBusiness {
  constructor(window: CommitteesWindowBussiness, local: LocalStorageService) {
    this.statistic = new CommitteesIndexStatisticBussiness(window);
    this.taskTable = new CommitteesIndexTaskTableBussiness(window);
    this.historyTable = new CommitteesIndexHistroyTableBussiness(window);
    this.messageBar = new CommitteesMessageBarBussiness(window, local.user);
  }
  statistic: CommitteesIndexStatisticBussiness;
  taskTable: CommitteesIndexTaskTableBussiness;
  historyTable: CommitteesIndexHistroyTableBussiness;
  messageBar: CommitteesMessageBarBussiness;
}
