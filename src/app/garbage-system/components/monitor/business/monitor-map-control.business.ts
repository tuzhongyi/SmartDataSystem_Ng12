import { EventEmitter, Injectable } from '@angular/core';
import { EventType } from 'src/app/enum/event-type.enum';
import { Camera } from 'src/app/network/model/garbage-station/camera.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { StatisticCardHelper } from '../../statistic-card-group/statistic-card-group.helper';
import { GarbageStationWindowIndex } from '../../windows/garbage-station-window/garbage-station-window.component';
import { MonitorPatrolControlBusiness } from './monitor-patrol-control.business';
import { MonitorStatisticCardBussiness } from './monitor-statistic-card.bussiness';
import { MonitorWindowBussiness } from './window.business';
import { MonitorVideoControlWindowBusiness } from './windows/monitor-video-control-window.business';

@Injectable()
export class MonitorMapControlBusiness {
  constructor(
    private patrol: MonitorPatrolControlBusiness,
    private video: MonitorVideoControlWindowBusiness,
    private window: MonitorWindowBussiness,
    private cards: MonitorStatisticCardBussiness
  ) {}

  position: EventEmitter<GarbageStation> = new EventEmitter();
  fullscreen = false;

  async onpatrol() {
    this.patrol.show = true;
    this.patrol.fullscreen = false;
  }
  onfullscreen(fullscreen: boolean) {
    this.fullscreen = fullscreen;
    this.cards.types = StatisticCardHelper.fullscreen(this.fullscreen);
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
