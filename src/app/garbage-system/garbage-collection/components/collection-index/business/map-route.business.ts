import { Injectable } from '@angular/core';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';

@Injectable()
export class MapRouteBusiness {
  constructor() {}

  show: boolean = true;

  vehicle?: GarbageVehicle;

  close() {
    this.show = false;
  }
}
