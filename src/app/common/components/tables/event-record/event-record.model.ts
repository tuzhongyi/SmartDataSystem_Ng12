import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { EventType } from 'src/app/enum/event-type.enum';
import { Camera } from 'src/app/network/model/garbage-station/camera.model';
import { Duration } from 'src/app/network/model/garbage-station/duration.model';
import { IIdNameModel } from 'src/app/network/model/model.interface';
import { CameraImageUrl } from 'src/app/network/model/url.model';
import {
  SearchOptionKey,
  SearchOptions,
} from 'src/app/view-model/search-options.model';
import { SelectItem } from '../../select-control/select-control.model';

export class EventRecordFilter {
  constructor() {
    this.duration = DateTimeTool.allDay(new Date());
  }

  duration: Duration;

  type: EventType = EventType.None;
  divisionId?: string;
  stationId?: string;
  cameraId?: string;

  private _division?: IIdNameModel;
  public get division(): IIdNameModel | undefined {
    return this._division;
  }
  public set division(v: IIdNameModel | undefined) {
    this._division = v;
    if (v) {
      this.divisionId = v.Id;
    } else {
      this.divisionId = v;
    }
  }
  private _station?: SelectItem;
  public get station(): SelectItem | undefined {
    return this._station;
  }
  public set station(v: SelectItem | undefined) {
    this._station = v;
    if (v) {
      this.stationId = v.Id;
    } else {
      this.stationId = v;
    }
  }
  private _camera?: SelectItem;
  public get camera(): SelectItem | undefined {
    return this._camera;
  }
  public set camera(v: SelectItem | undefined) {
    this._camera = v;
    if (v) {
      this.cameraId = v.Id;
    } else {
      this.cameraId = v;
    }
  }

  opts: SearchOptions = {
    text: '',
    propertyName: SearchOptionKey.name,
  };
  community?: SelectItem;

  reset() {
    this.duration = DateTimeTool.allDay(new Date());
    this.division = undefined;
    this.station = undefined;
    this.camera = undefined;
  }
}

export class CameraImageUrlModel extends CameraImageUrl {
  constructor(url: CameraImageUrl, stationId: string) {
    super();
    this.CameraId = url.CameraId;
    this.CameraName = url.CameraName;
    this.ImageUrl = url.ImageUrl;
    this.StationId = stationId;
  }
  StationId: string;
  Camera!: Promise<Camera>;
}
