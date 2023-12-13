import { EventEmitter } from '@angular/core';
import {
  ImageVideoControlModel,
  ImageVideoControlOperation,
} from 'src/app/common/components/image-video-control/image-video-control.model';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { Camera } from 'src/app/network/model/garbage-station/camera.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';

export class PatrolControlModel {
  constructor(id: string) {
    this.id = id;
  }
  id: string;
  title: string = '';
  media!: ImageVideoControlModel[];
  status: PatrolControlStatus = new PatrolControlStatus();
}

export class PatrolControlStatus {
  online: OnlineStatus = OnlineStatus.Offline;
  stationState?: ControlClass<number>;
  illegalDrop: number = 0;
  mixedInto: number = 0;
}

export class CameraViewModel extends Camera {
  GarbageStation?: GarbageStation;
}

export class ControlClass<T> {
  constructor(value: T) {
    this.value = value;
  }
  value: T;
  language: string = '';
  class: string = '';
}

export class PatrolIntervalControl {
  times: number[] = [];
  time!: number;
  runing = false;
  handle?: NodeJS.Timer;
  trigger: EventEmitter<void> = new EventEmitter();
  run() {
    this.runing = true;
    this.handle = setInterval(() => {
      this.trigger.emit();
    }, this.time * 1000);
  }
  stop() {
    this.runing = false;
    if (this.handle) {
      clearInterval(this.handle);
    }
  }
}

export class PatrolControlConfig {
  title: boolean = true;
  interval: boolean = true;
  close: boolean = true;
  status: boolean = true;
  stop: boolean = true;
  autoplay: boolean = true;
  playback: boolean = false;
  operation: ImageVideoControlOperation = new ImageVideoControlOperation();
}

export enum PatrolControlInterval {
  s30 = 30,
  s60 = 60,
  s90 = 90,
  s120 = 120,
}
