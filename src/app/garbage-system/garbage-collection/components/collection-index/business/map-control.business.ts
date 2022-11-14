import { EventEmitter, Injectable } from '@angular/core';
import { VideoModel } from 'src/app/common/components/video-player/video.model';
import { EventType } from 'src/app/enum/event-type.enum';
import { GarbageStationWindowIndex } from 'src/app/garbage-system/components/windows/garbage-station-window/garbage-station-window.component';
import { ICamera } from 'src/app/network/model/camera.interface';
import { Camera } from 'src/app/network/model/camera.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { GetPreviewUrlParams } from 'src/app/network/request/ai-sr-server/sr-server.params';
import { SRServerRequestService } from 'src/app/network/request/ai-sr-server/sr-server.service';
import { PatrolControlBusiness } from './patrol-control.business';
import { WindowBussiness } from './window.business';
import { VideoControlWindowBusiness } from './windows/video-control-window.business';

@Injectable()
export class MapControlBusiness {
  constructor(
    private patrol: PatrolControlBusiness,
    private video: VideoControlWindowBusiness,
    private window: WindowBussiness
  ) {}

  position: EventEmitter<GarbageVehicle> = new EventEmitter();

  async onpatrol() {
    this.patrol.show = true;
  }

  onvideoplay(camera: ICamera) {
    this.video.show = true;
    this.video.load(camera);
  }

  onposition(station: GarbageVehicle) {
    this.window.close();
    this.position.emit(station);
  }
}
