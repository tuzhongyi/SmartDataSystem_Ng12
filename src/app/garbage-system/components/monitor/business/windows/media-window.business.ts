import { EventEmitter, Injectable } from '@angular/core';
import { ImageControlModel } from 'src/app/common/components/image-control/image-control.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { Camera } from 'src/app/network/model/camera.model';
import { CameraImageUrl } from 'src/app/network/model/url.model';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';

@Injectable()
export class MediaWindowBusiness extends WindowViewModel {
  constructor(private stationService: GarbageStationRequestService) {
    super();
  }
  style = {
    width: '64%',
    height: '64%',
    top: '56%',
    padding: '10px 20px',
  };
  camera: Array<Camera | ImageControlModel> = [];
  index: number = -1;
  autoplay = false;

  closing: EventEmitter<void> = new EventEmitter();
  playing = false;

  onclosing() {
    try {
      if (this.playing) return;
      this.show = false;
    } finally {
      this.closing.emit();
    }
  }

  onplay() {
    this.playing = true;
  }
  onstop() {
    this.playing = false;
  }
}
