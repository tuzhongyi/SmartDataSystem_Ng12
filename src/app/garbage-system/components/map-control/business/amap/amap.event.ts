import { EventEmitter, Injectable } from '@angular/core';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { PointCount } from '../amap.model';
@Injectable()
export class AMapEvent {
  mapclick: EventEmitter<void> = new EventEmitter();
  menu = new AMapContextMenuEvent();
  point = new AMapPointEvent();
}

class AMapPointEvent {
  doubleclick: EventEmitter<GarbageStation> = new EventEmitter();
  count: EventEmitter<PointCount> = new EventEmitter();
}

class AMapContextMenuEvent {
  click: EventEmitter<void> = new EventEmitter();
  video: EventEmitter<GarbageStation> = new EventEmitter();
  information: EventEmitter<GarbageStation> = new EventEmitter();
  garbagedrop: EventEmitter<GarbageStation> = new EventEmitter();
  mixedinto: EventEmitter<GarbageStation> = new EventEmitter();
  illegaldrop: EventEmitter<GarbageStation> = new EventEmitter();
}
