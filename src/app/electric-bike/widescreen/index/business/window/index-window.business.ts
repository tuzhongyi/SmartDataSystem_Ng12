import { Injectable } from '@angular/core';
import { DeviceWindowBusiness } from './device-window.business';
import { ElectricBikeIndexEventRecordWindowBusiness } from './event-record.business';
import { MediaWindowBusiness } from './media-window.business';
import { StationWindowBusiness } from './station-window.business';
import { VideoSingleWindowBusiness } from './video-single-window.business';

@Injectable()
export class WindowBussiness {
  constructor(
    public media: MediaWindowBusiness,
    public device: DeviceWindowBusiness,
    public record: ElectricBikeIndexEventRecordWindowBusiness,
    public station: StationWindowBusiness,
    public video: VideoSingleWindowBusiness
  ) {}
  close() {
    this.media.single.show = false;
    this.media.multiple.show = false;
    this.device.show = false;
    this.station.show = false;
    this.video.show = false;
  }
}