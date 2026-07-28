import { DateTimeTool } from 'src/app/common/tools/date-time-tool/datetime.tool';
import { EventType } from 'src/app/enum/event-type.enum';
import { Camera } from 'src/app/network/model/garbage-station/camera.model';
import { Duration } from 'src/app/network/model/garbage-station/duration.model';
import { CameraImageUrl } from 'src/app/network/model/url.model';
import {
  ISearchOptions,
  SearchOptionKey
} from 'src/app/view-model/search-options.model';

export class EventRecordFilter {
  constructor() {
    this.duration = DateTimeTool.allDay(new Date());
  }

  duration: Duration;

  type: EventType = EventType.None;
  divisionId?: string;
  stationId?: string;
  cameraId?: string;
  handle?: boolean;

  opts: ISearchOptions = {
    text: '',
    key: SearchOptionKey.name
  };

  reset() {
    this.duration = DateTimeTool.allDay(new Date());
    this.divisionId = undefined;
    this.stationId = undefined;
    this.cameraId = undefined;
    this.handle = undefined;
  }
}

export class CameraImageUrlModel extends CameraImageUrl {
  constructor(url: CameraImageUrl, stationId: string) {
    super();
    this.CameraId = url.CameraId;
    this.CameraName = url.CameraName;
    this.ImageUrl = url.ImageUrl;
    this.StationId = stationId;
    this.Objects = url.Objects;
    this.Rules = url.Rules;
  }
  StationId: string;
  Camera!: Promise<Camera>;
}
