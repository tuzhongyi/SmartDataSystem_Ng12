import { Injectable } from '@angular/core';
import { IndexCardRecordEpisodeWindow } from './windows/index-card-record-episode-window.business';
import { IndexDeviceWindowBusiness } from './windows/index-device-window.business';
import { IndexRecordWindowBusiness } from './windows/index-event-record-window.business';
import { IndexImageArrayWindowBusiness } from './windows/index-image-array-window.business';
import { IndexImagePageWindowBusiness } from './windows/index-image-page-window.business';
import { IndexImageWindowBusiness } from './windows/index-image-window.business';
import { IndexMediaMultipleWindowBusiness } from './windows/index-media-multiple-window.business';
import { IndexMediaSingleWindowBusiness } from './windows/index-media-single-window.business';
import { IndexMediaVideoWindowBusiness } from './windows/index-media-video-window.business';
import { IndexMediaWindowBusiness } from './windows/index-media-window.business';
import { IndexGarbageStationDropWindowBusiness } from './windows/index-station-drop-window.business';
import { IndexGarbageStationFullWindowBusiness } from './windows/index-station-full-window.business';
import { IndexGarbageStationInfoWindowBusiness } from './windows/index-station-info-window.business';
import { IndexSuperviseCompleteWindowBusiness } from './windows/index-supervise-complete-window.business';
import { IndexSuperviseDetailWindowBusiness } from './windows/index-supervise-deatils-window.business';
import { IndexSuperviseTableWindowBusiness } from './windows/index-supervise-table-window.business';
import { IndexSuperviseWindowBusiness } from './windows/index-supervise-window.business';
import { IndexVideoWindowBusiness } from './windows/index-video-window.business';
import { IndexWeightWindowBusiness } from './windows/index-weight-window.business';

@Injectable()
export class IndexWindowBussiness {
  constructor(
    public record: IndexRecordWindowBusiness,
    public media: IndexMediaWindowBusiness,
    public device: IndexDeviceWindowBusiness,
    public full: IndexGarbageStationFullWindowBusiness,
    public drop: IndexGarbageStationDropWindowBusiness,
    public station: IndexGarbageStationInfoWindowBusiness,
    public card: IndexCardRecordEpisodeWindow,
    public image: IndexImageWindowBusiness,
    public video: IndexVideoWindowBusiness,
    public weight: IndexWeightWindowBusiness,
    public supervise: IndexSuperviseWindowBusiness
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
    this.supervise.table.show = false;
    this.supervise.detail.show = false;
  }
}

export const IndexWindowBusinesses = [
  IndexRecordWindowBusiness,

  IndexMediaWindowBusiness,
  IndexMediaSingleWindowBusiness,
  IndexMediaMultipleWindowBusiness,

  IndexImageWindowBusiness,
  IndexImagePageWindowBusiness,
  IndexImageArrayWindowBusiness,

  IndexVideoWindowBusiness,

  IndexMediaVideoWindowBusiness,
  IndexDeviceWindowBusiness,
  IndexGarbageStationFullWindowBusiness,
  IndexGarbageStationDropWindowBusiness,
  IndexGarbageStationInfoWindowBusiness,
  IndexCardRecordEpisodeWindow,
  IndexWeightWindowBusiness,

  IndexSuperviseTableWindowBusiness,
  IndexSuperviseDetailWindowBusiness,
  IndexSuperviseCompleteWindowBusiness,
  IndexSuperviseWindowBusiness,
];
