import { EventEmitter, Injectable } from '@angular/core';
import { EventType } from 'src/app/enum/event-type.enum';
import { Camera } from 'src/app/network/model/garbage-station/camera.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
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
  }

  onvideoplay(camera: Camera) {
    this.video.show = true;
    this.video.load(camera);
  }
  onIllegalDropClicked(station: GarbageStation) {
    this.window.record.clear();
    this.window.record.stationId = station.Id;
    this.window.record.type = EventType.IllegalDrop;
    this.window.record.show = true;
  }
  onMixedIntoClicked(station: GarbageStation) {
    this.window.record.clear();
    this.window.record.stationId = station.Id;
    this.window.record.type = EventType.MixedInto;
    this.window.record.show = true;
  }
  onGarbageCountClicked(station: GarbageStation) {
    this.window.station.index = GarbageStationWindowIndex.station;
    this.window.station.stationId = station.Id;
    this.window.station.show = true;
  }
  onGarbageRetentionClicked(station: GarbageStation) {
    this.window.drop.clear();
    this.window.drop.args.stationId = station.Id;
    this.window.drop.show = true;
  }
  onGarbageFullClicked(station: GarbageStation) {
    this.window.full.clear();
    this.window.full.args.stationId = station.Id;
    this.window.full.show = true;
  }

  onposition(station: GarbageStation) {
    this.window.close();
    this.position.emit(station);
  }
}
