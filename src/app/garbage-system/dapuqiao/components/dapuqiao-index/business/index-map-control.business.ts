import { EventEmitter, Injectable } from '@angular/core';
import { EventType } from 'src/app/enum/event-type.enum';

import { GarbageStationWindowIndex } from 'src/app/garbage-system/components/windows/garbage-station-window/garbage-station-window.component';
import { Camera } from 'src/app/network/model/garbage-station/camera.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';

import { IndexPatrolControlBusiness } from './index-patrol-control.business';
import { IndexWindowBussiness } from './index-window.business';
import { IndexVideoControlWindowBusiness } from './windows/index-video-control-window.business';

@Injectable()
export class IndexMapControlBusiness {
  constructor(
    private patrol: IndexPatrolControlBusiness,
    private video: IndexVideoControlWindowBusiness,
    private window: IndexWindowBussiness
  ) {}

  position: EventEmitter<GarbageStation> = new EventEmitter();

  async onpatrol() {
    this.patrol.show = true;
  }

  onvideoplay(camera: Camera) {
    this.video.show = true;
    this.video.load(camera);
  }
  onIllegalDropClicked(station: GarbageStation) {
    if (station) {
      this.window.record.stationId = station.Id;
    }

    this.window.record.type = EventType.IllegalDrop;
    this.window.record.show = true;
  }
  onMixedIntoClicked(station: GarbageStation) {
    if (station) {
      this.window.record.stationId = station.Id;
    }
    this.window.record.type = EventType.MixedInto;
    this.window.record.show = true;
  }
  onGarbageCountClicked(station: GarbageStation) {
    this.window.station.index = GarbageStationWindowIndex.station;
    this.window.station.show = true;
  }
  onGarbageRetentionClicked(station: GarbageStation) {
    this.window.drop.show = true;
  }
  onGarbageFullClicked(station: GarbageStation) {
    this.window.full.show = true;
  }

  onposition(station: GarbageStation) {
    this.window.close();
    this.position.emit(station);
  }
}
