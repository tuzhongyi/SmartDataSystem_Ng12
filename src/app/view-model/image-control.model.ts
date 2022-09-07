import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { Camera } from 'src/app/network/model/camera.model';
import { EventDataObject } from 'src/app/network/model/garbage-event-record.model';
import { EventRule } from 'src/app/network/model/event-rule';
import { CameraImageUrl } from 'src/app/network/model/url.model';

export class ImageControlModel<T = Camera | CameraImageUrl> {
  constructor(
    id: string,
    stationId: string,
    name: string,
    src: string,
    onerror: string,
    status: OnlineStatus = OnlineStatus.Offline,
    camera: T,
    eventTime?: Date,
    polygon?: EventDataObject[],
    rules?: EventRule[]
  ) {
    this.id = id;
    this.stationId = stationId;
    this.name = name;
    this.src = src;
    this.onerror = onerror;
    this.status = status;
    this.camera = camera;
    if (eventTime) {
      this.eventTime = new Date(eventTime);
    }
    this.polygon = polygon;
    this.rules = rules;
  }
  eventTime?: Date;
  stationId: string;
  camera: T;
  name: string;
  src: string;
  id: string;
  onerror: string;
  status: OnlineStatus = OnlineStatus.Offline;
  index = 0;
  polygon?: EventDataObject[];
  rules?: EventRule[];
}

export class ImageControlModelArray {
  constructor(models: ImageControlModel[], index: number, autoplay = false) {
    this.models = models;
    this.index = index;
    this.autoplay = autoplay;
  }
  models: ImageControlModel[];
  resourceId?: string;
  autoplay: boolean;
  index: number;
}
