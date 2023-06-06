import { Injectable } from '@angular/core';
import { MonitorCardRecordEpisodeWindow } from './windows/monitor-card-record-episode-window.business';
import { MonitorDeviceWindowBusiness } from './windows/monitor-device-window.business';
import { MonitorRecordWindowBusiness } from './windows/monitor-event-record-window.business';
import { MonitorMediaMultipleWindowBusiness } from './windows/monitor-media-multiple-window.business';
import { MonitorMediaSingleWindowBusiness } from './windows/monitor-media-single-window.business';
import { MonitorMediaWindowBusiness } from './windows/monitor-media-window.business';
import { MonitorGarbageStationDropWindowBusiness } from './windows/monitor-station-drop-window.business';
import { MonitorGarbageStationFullWindowBusiness } from './windows/monitor-station-full-window.business';
import { MonitorGarbageStationInfoWindowBusiness } from './windows/monitor-station-info-window.business';

@Injectable()
export class MonitorWindowBussiness {
  constructor(
    public record: MonitorRecordWindowBusiness,
    public media: MonitorMediaWindowBusiness,
    public device: MonitorDeviceWindowBusiness,
    public full: MonitorGarbageStationFullWindowBusiness,
    public drop: MonitorGarbageStationDropWindowBusiness,
    public station: MonitorGarbageStationInfoWindowBusiness,
    public card: MonitorCardRecordEpisodeWindow
  ) {}
  close() {
    this.record.show = false;
    this.media.single.show = false;
    this.media.multiple.show = false;
    this.device.show = false;
    this.drop.show = false;
    this.full.show = false;
    this.station.show = false;
    this.card.show = false;
  }
}

export const WindowBusinesses = [
  MonitorRecordWindowBusiness,
  MonitorMediaWindowBusiness,
  MonitorMediaSingleWindowBusiness,
  MonitorMediaMultipleWindowBusiness,
  MonitorDeviceWindowBusiness,
  MonitorGarbageStationFullWindowBusiness,
  MonitorGarbageStationDropWindowBusiness,
  MonitorGarbageStationInfoWindowBusiness,
  MonitorCardRecordEpisodeWindow,
];
