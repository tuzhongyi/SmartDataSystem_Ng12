import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { EventRule } from 'src/app/network/model/event-rule';
import { CameraImageUrl } from 'src/app/network/model/url.model';
import { ICamera } from '../network/model/camera.interface';
import { EventDataObject } from '../network/model/event-data-object.model';

export interface ImageControlModelArgs<T extends ICamera | CameraImageUrl> {
  id: string;
  stationId?: string;
  name: string;
  src: Promise<string>;
  onerror: string;
  status: OnlineStatus;
  camera: T;
  eventTime?: Date;
  polygon?: EventDataObject[];
  rules?: EventRule[];
}

export class ImageControlModel<T extends ICamera | CameraImageUrl = any> {
  constructor(args?: ImageControlModelArgs<T>) {
    if (args) {
      this.id = args.id;
      this.stationId = args.stationId;
      this.name = args.name;
      this.src = args.src;
      this.onerror = args.onerror;
      this.status = args.status;
      this.camera = args.camera;
      if (args.eventTime) {
        this.eventTime = new Date(args.eventTime);
      }
      this.polygon = args.polygon;
      this.rules = args.rules;
    }
  }
  eventTime?: Date;
  stationId?: string;
  camera!: T;
  name!: string;
  src!: Promise<string>;
  id!: string;
  onerror!: string;
  status: OnlineStatus = OnlineStatus.Offline;
  index = 0;
  polygon?: EventDataObject[];
  rules?: EventRule[];
}

export class ImageControlModelArray<T = any> {
  constructor(models: ImageControlModel[], index: number, autoplay = false) {
    this.models = models;
    this.index = index;
    this.autoplay = autoplay;
  }
  data?: T;
  models: ImageControlModel[];
  autoplay: boolean;
  index: number;
}
