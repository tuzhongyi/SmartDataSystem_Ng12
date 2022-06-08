import { Injectable } from '@angular/core';
import { GarbageStationWindowIndex } from 'src/app/garbage-system/components/windows/garbage-station-window/garbage-station-window.component';
import { GarbageDropEventRecord } from 'src/app/network/model/event-record.model';
import { CommitteesWindowBussiness } from './committees-window.business';

@Injectable()
export class CommitteesIndexTaskTableBussiness {
  constructor(private window: CommitteesWindowBussiness) {}

  onItemClicked(record: GarbageDropEventRecord) {
    console.log('onItemClicked', record);
    this.window.station = undefined;
    this.window.stationInfo.index = GarbageStationWindowIndex.record;
    this.window.stationInfo.show = true;
  }
}
