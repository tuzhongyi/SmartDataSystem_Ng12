import { Camera } from 'src/app/network/model/camera.model';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { Page } from 'src/app/network/model/page_list.model';
import { CameraImageUrl } from 'src/app/network/model/url.model';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { ImageControlModel } from '../../../../view-model/image-control.model';
import { SelectItem } from '../../select-control/select-control.model';
import { GarbageStationModel } from '../../../../view-model/garbage-station.model';

export class EventRecordFilter extends DurationParams {
  constructor() {
    super();
    let interval = DurationParams.allDay(new Date());
    this.BeginTime = interval.BeginTime;
    this.EndTime = interval.EndTime;
  }
  division?: SelectItem;
  station?: SelectItem;
  camera?: SelectItem;
  text?: string;
  community?: SelectItem;
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
  Camera!: Camera;
}
