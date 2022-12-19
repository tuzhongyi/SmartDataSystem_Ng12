import { EventEmitter, Injectable } from '@angular/core';

import { ICamera } from 'src/app/network/model/camera.interface';

import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { MapRouteBusiness } from './map-route.business';
import { PatrolControlBusiness } from './patrol-control.business';
import { WindowBussiness } from './window.business';
import { VideoControlWindowBusiness } from './windows/video-control-window.business';

@Injectable()
export class MapControlBusiness {
  constructor(
    private patrol: PatrolControlBusiness,
    private video: VideoControlWindowBusiness,
    private window: WindowBussiness,
    private route: MapRouteBusiness
  ) {}

  position: EventEmitter<GarbageVehicle> = new EventEmitter();

  async onpatrol() {
    this.patrol.show = true;
  }

  onvideoplay(camera: ICamera) {
    this.video.show = true;
    this.video.load(camera);
  }

  onposition(vehicle: GarbageVehicle) {
    console.log('position');
    this.window.close();
    this.position.emit(vehicle);
  }
  onroute(vehicle: GarbageVehicle) {
    console.log('route');

    this.route.vehicle = vehicle;
    this.route.show = true;
  }
}
