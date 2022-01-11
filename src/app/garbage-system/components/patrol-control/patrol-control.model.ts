import { ImageVideoControlModel } from 'src/app/common/components/image-video-control/image-video-control.model';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { Flags } from 'src/app/common/tools/flags';
import { EventType } from 'src/app/enum/event-type.enum';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { StationState } from 'src/app/enum/station-state.enum';
import { Camera } from 'src/app/network/model/camera.model';
import {
  GarbageStation,
  GarbageStationType,
} from 'src/app/network/model/garbage-station.model';

export class PatrolControlModel {
  constructor(id: string) {
    this.id = id;
  }
  id: string;
  title: string = '';
  media?: ImageVideoControlModel[];
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
  times: SelectItem[] = [];
  time: number = 30;
  runing = false;
  handle?: NodeJS.Timer;
}
