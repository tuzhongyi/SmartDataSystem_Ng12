import { Injectable } from '@angular/core';
import {
  IllegalDropEventRecord,
  MixedIntoEventRecord,
} from 'src/app/network/model/event-record.model';
import { ImageControlModelArray } from 'src/app/view-model/image-control.model';
import { CommitteesHistoryTableTypes } from '../../histroy-table/committees-history-table.model';
import { CommitteesWindowBussiness } from './committees-window.business';

export class CommitteesIndexHistroyTableBussiness {
  constructor(private window: CommitteesWindowBussiness) {}

  Types = new CommitteesHistoryTableTypes();
  Type = this.Types.IllegalDrop;

  OnPictureClicked(model: ImageControlModelArray) {
    this.window.media.single.camera = model.models;
    this.window.media.single.index = model.index;
    this.window.media.single.autoplay = model.autoplay;
    this.window.media.single.show = true;
  }
  OnVideoClicked(model: ImageControlModelArray) {
    this.window.media.single.camera = model.models;
    this.window.media.single.index = model.index;
    this.window.media.single.autoplay = model.autoplay;
    this.window.media.single.show = true;
  }
}
