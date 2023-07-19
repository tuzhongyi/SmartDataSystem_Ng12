import { Injectable } from '@angular/core';
import { IndexPictureWindow } from './index-picture-window.business';
import { DeviceWindowBusiness } from './windows/device-window.business';
import { RecordWindowBusiness } from './windows/event-record-window.business';
import { IndexVideoPlayerWindow } from './windows/index-video-player-window.business';
import { MediaWindowBusiness } from './windows/media-window.business';
import { GarbageStationDropWindowBusiness } from './windows/station-drop-window.business';
import { GarbageStationFullWindowBusiness } from './windows/station-full-window.business';
import { GarbageStationInfoWindowBusiness } from './windows/station-info-window.business';

@Injectable()
export class WindowBussiness {
  constructor(
    public record: RecordWindowBusiness,
    public media: MediaWindowBusiness,
    public device: DeviceWindowBusiness,
    public full: GarbageStationFullWindowBusiness,
    public drop: GarbageStationDropWindowBusiness,
    public station: GarbageStationInfoWindowBusiness,
    public player: IndexVideoPlayerWindow,
    public picture: IndexPictureWindow
  ) {}
  close() {
    this.record.show = false;
    this.media.single.show = false;
    this.media.multiple.show = false;
    this.device.show = false;
    this.drop.show = false;
    this.full.show = false;
    this.station.show = false;
    this.player.show = false;
  }
}
