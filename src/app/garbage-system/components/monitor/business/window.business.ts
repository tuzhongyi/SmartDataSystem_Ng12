import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window/window.model';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { Camera } from 'src/app/network/model/camera.model';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';

class DeviceWindowViewModel extends WindowViewModel {
  onlineStatus?: OnlineStatus;
}
class RecordWindowViewModel extends WindowViewModel {
  style = {
    height: '83%',
    transform: 'translate(-50%, -45%)',
  };

  constructor() {
    super();
    this.show = true;
  }
}
class VideoWindowViewModel extends WindowViewModel {
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

@Injectable()
export class WindowBussiness {
  constructor(private stationService: GarbageStationRequestService) {}
  device = new DeviceWindowViewModel();
  record = new RecordWindowViewModel();
  video = new VideoWindowViewModel(this.stationService);
}
