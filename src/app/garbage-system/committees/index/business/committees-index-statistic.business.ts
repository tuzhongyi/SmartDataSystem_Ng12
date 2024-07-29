import { Injectable } from '@angular/core';
import { EventType } from 'src/app/enum/event-type.enum';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { GarbageDropStationWindowIndex } from 'src/app/garbage-system/components/windows/garbage-drop-window/garbage-drop-window.model';
import { GarbageFullStationWindowIndex } from 'src/app/garbage-system/components/windows/garbage-full-window/garbage-full-window.model';
import { GarbageStationWindowIndex } from 'src/app/garbage-system/components/windows/garbage-station-window/garbage-station-window.component';
import { CommitteesWindowBussiness } from './committees-window.business';

@Injectable()
export class CommitteesIndexStatisticBussiness {
  constructor(private window: CommitteesWindowBussiness) {}

  OnAllDeviceCountClicked() {
    this.window.device.status = undefined;
    this.window.device.show = true;
  }

  OnOnlineDeviceCountClicked() {
    this.window.device.status = OnlineStatus.Online;
    this.window.device.show = true;
  }

  OnOfflineDeviceCountClicked() {
    this.window.device.status = OnlineStatus.Offline;
    this.window.device.show = true;
  }

  OnGarbageStationCountClicked() {
    this.window.station = undefined;
    this.window.stationInfo.index = GarbageStationWindowIndex.station;
    this.window.stationInfo.show = true;
  }

  OnGarbageDropEventCountClicked() {
    this.window.station = undefined;
    this.window.drop.index = GarbageDropStationWindowIndex.station;
    this.window.drop.show = true;
  }

  OnGarbageFullEventCountClicked() {
    this.window.station = undefined;
    this.window.full.index = GarbageFullStationWindowIndex.station;
    this.window.full.show = true;
  }
  OnIllegalDropEventCountClicked() {
    this.window.station = undefined;
    this.window.record.type = EventType.IllegalDrop;
    this.window.record.show = true;
    this.window.record.divisionId = undefined;
    this.window.record.stationId = undefined;
  }
  OnMixedIntoEventCountClicked() {
    this.window.station = undefined;
    this.window.record.type = EventType.MixedInto;
    this.window.record.show = true;

    this.window.record.divisionId = undefined;
    this.window.record.stationId = undefined;
  }
}
