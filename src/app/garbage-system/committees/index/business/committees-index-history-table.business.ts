import { Injectable } from '@angular/core';
import {
  IllegalDropEventRecord,
  MixedIntoEventRecord,
} from 'src/app/network/model/event-record.model';
import { CommitteesHistoryTableTypes } from '../../histroy-table/committees-history-table.model';
import { CommitteesWindowBussiness } from './committees-window.business';

export class CommitteesIndexHistroyTableBussiness {
  constructor(private window: CommitteesWindowBussiness) {}

  Types = new CommitteesHistoryTableTypes();
  Type = this.Types.IllegalDrop;

  OnPictureClicked(record: IllegalDropEventRecord | MixedIntoEventRecord) {
    // this.window.picture.load(record);
    // this.window.picture.show = true;
  }
  OnVideoClicked(record: IllegalDropEventRecord | MixedIntoEventRecord) {
    // this.window.video.load(record);
    // this.window.video.show = true;
  }
}
