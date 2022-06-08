import { Injectable } from '@angular/core';
import { CommitteesWindowBussiness } from './committees-window.business';

@Injectable()
export class CommitteesIndexStatisticBussiness {
  constructor(private window: CommitteesWindowBussiness) {}

  OnAllDeviceCountClicked() {
    // this.window.device.onlineStatus = undefined;
    // this.window.device.show = true;
  }

  OnOnlineDeviceCountClicked() {
    // this.window.device.onlineStatus = OnlineStatus.Online;
    // this.window.device.show = true;
  }

  OnOfflineDeviceCountClicked() {
    // this.window.device.onlineStatus = OnlineStatus.Offline;
    // this.window.device.show = true;
  }

  OnGarbageStationCountClicked() {
    // this.window.garbageStation = undefined;
    // this.window.station.index = GarbageStationSummaryViewPage.info;
    // this.window.station.show = true;
  }

  OnGarbageDropEventCountClicked() {
    // this.window.garbageStation = undefined;
    // this.window.station.index = GarbageStationSummaryViewPage.event;
    // this.window.station.show = true;
  }

  OnGarbageFullEventCountClicked() {
    // this.window.garbageStation = undefined;
    // this.window.record.eventType = EventType.GarbageFull;
    // this.window.fullStation.show = true;
  }
  OnIllegalDropEventCountClicked() {
    // this.window.garbageStation = undefined;
    // this.window.record.eventType = EventType.IllegalDrop;
    // this.window.record.show = true;
  }
  OnMixedIntoEventCountClicked() {
    // this.window.garbageStation = undefined;
    // this.window.record.eventType = EventType.MixedInto;
    // this.window.record.show = true;
  }
}
