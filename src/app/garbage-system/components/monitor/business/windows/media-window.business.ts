import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { Camera } from 'src/app/network/model/camera.model';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';

@Injectable()
export class MediaWindowBusiness extends WindowViewModel {
  constructor(private stationService: GarbageStationRequestService) {
    super();
  }
  style = {
    width: '64%',
    height: '64%',
  };
  camera?: Camera;
  test() {
    let promise = this.stationService.cache.all();
    promise.then(async (all) => {
      this.show = true;
      if (all[0].Cameras) {
        this.camera = all[0].Cameras[0];
      }
    });
  }
}
