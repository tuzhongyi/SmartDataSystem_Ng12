import { Injectable } from '@angular/core';
import { GarbageDropStationWindowIndex } from 'src/app/garbage-system/components/windows/garbage-drop-window/garbage-drop-window.model';
import { GarbageDropEventRecord } from 'src/app/network/model/garbage-station/event-record/garbage-drop-event-record.model';
import { CommitteesWindowBussiness } from './committees-window.business';

@Injectable()
export class CommitteesIndexTaskTableBussiness {
  constructor(private window: CommitteesWindowBussiness) {}

  onItemClicked(record: GarbageDropEventRecord) {
    this.window.station = undefined;
    this.window.drop.index = GarbageDropStationWindowIndex.record;
    this.window.drop.show = true;
  }
}
