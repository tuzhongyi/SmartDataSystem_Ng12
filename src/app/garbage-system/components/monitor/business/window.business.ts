import { Injectable } from '@angular/core';
import { MonitorCardRecordEpisodeWindow } from './windows/monitor-card-record-episode-window.business';
import { MonitorDeviceWindowBusiness } from './windows/monitor-device-window.business';
import { MonitorRecordWindowBusiness } from './windows/monitor-event-record-window.business';
import { MonitorImageArrayWindowBusiness } from './windows/monitor-image-array-window.business';
import { MonitorImagePageWindowBusiness } from './windows/monitor-image-page-window.business';
import { MonitorImageWindowBusiness } from './windows/monitor-image-window.business';
import { MonitorMediaMultipleWindowBusiness } from './windows/monitor-media-multiple-window.business';
import { MonitorMediaSingleWindowBusiness } from './windows/monitor-media-single-window.business';
import { MonitorMediaVideoWindowBusiness } from './windows/monitor-media-video-window.business';
import { MonitorMediaWindowBusiness } from './windows/monitor-media-window.business';
import { MonitorGarbageStationDropWindowBusiness } from './windows/monitor-station-drop-window.business';
import { MonitorGarbageStationFullWindowBusiness } from './windows/monitor-station-full-window.business';
import { MonitorGarbageStationInfoWindowBusiness } from './windows/monitor-station-info-window.business';
import { MonitorVideoWindowBusiness } from './windows/monitor-video-window.business';
import { MonitorWeightWindowBusiness } from './windows/monitor-weight-window.business';

@Injectable()
export class MonitorWindowBussiness {
  constructor(
    public record: MonitorRecordWindowBusiness,
    public media: MonitorMediaWindowBusiness,
    public device: MonitorDeviceWindowBusiness,
    public full: MonitorGarbageStationFullWindowBusiness,
    public drop: MonitorGarbageStationDropWindowBusiness,
    public station: MonitorGarbageStationInfoWindowBusiness,
    public card: MonitorCardRecordEpisodeWindow,
    public image: MonitorImageWindowBusiness,
    public video: MonitorVideoWindowBusiness,
    public weight: MonitorWeightWindowBusiness
  ) {}
  close() {
    this.record.show = false;
    this.media.single.show = false;
    this.media.multiple.show = false;
    this.media.video.show = false;
    this.image.page.show = false;
    this.image.array.show = false;
    this.video.show = false;
    this.device.show = false;
    this.drop.show = false;
    this.full.show = false;
    this.station.show = false;
    this.card.show = false;
    this.weight.show = false;
  }
}

export const WindowBusinesses = [
  MonitorRecordWindowBusiness,

  MonitorMediaWindowBusiness,
  MonitorMediaSingleWindowBusiness,
  MonitorMediaMultipleWindowBusiness,

  MonitorImageWindowBusiness,
  MonitorImagePageWindowBusiness,
  MonitorImageArrayWindowBusiness,

  MonitorVideoWindowBusiness,

  MonitorMediaVideoWindowBusiness,
  MonitorDeviceWindowBusiness,
  MonitorGarbageStationFullWindowBusiness,
  MonitorGarbageStationDropWindowBusiness,
  MonitorGarbageStationInfoWindowBusiness,
  MonitorCardRecordEpisodeWindow,
  MonitorWeightWindowBusiness,
];
