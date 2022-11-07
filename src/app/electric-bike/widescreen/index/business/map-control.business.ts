import { EventEmitter, Injectable } from '@angular/core';
import { Flags } from 'src/app/common/tools/flags';
import { EventType } from 'src/app/enum/event-type.enum';
import { StationState } from 'src/app/enum/station-state.enum';
import { MapControlConfig } from 'src/app/garbage-system/components/map-control/map-control.config';
import { Camera } from 'src/app/network/model/camera.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { MQTTEventService } from 'src/app/network/request/mqtt-event/mqtt-event.service';
import { WindowBussiness } from './window/index-window.business';
import { PatrolControlBusiness } from './patrol-control.business';
import { VideoControlWindowBusiness } from './video-control-window.business';

@Injectable()
export class MapControlBusiness {
  constructor(
    private patrol: PatrolControlBusiness,
    private video: VideoControlWindowBusiness,
    private window: WindowBussiness,
    private garbage: GarbageStationRequestService
  ) {
    this.config = new MapControlConfig();
    this.config.status = false;
    this.config.dropButton = false;
  }

  position: EventEmitter<GarbageStation> = new EventEmitter();
  load: EventEmitter<void> = new EventEmitter();
  config: MapControlConfig;
  async onpatrol() {
    this.patrol.show = true;
  }

  onvideoplay(camera: Camera) {
    this.video.show = true;
    this.video.load(camera);
  }
  async ondisarm(station: GarbageStation) {
    let flags = new Flags(station.StationState);
    if (flags.contains(StationState.Smoke)) {
      let result = await this.garbage.resetState(station.Id);
      if (result == 0) {
        this.load.emit();
      }
    }
  }
  onposition(station: GarbageStation) {
    this.window.close();
    this.position.emit(station);
  }
}
