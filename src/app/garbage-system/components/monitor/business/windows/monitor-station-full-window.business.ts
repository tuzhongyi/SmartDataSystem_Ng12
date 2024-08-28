import { Injectable } from '@angular/core';

import { GarbageFullStationTableModel } from 'src/app/common/components/tables/garbage-full-station-table/garbage-full-station-table.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { DateTimeTool } from 'src/app/common/tools/date-time-tool/datetime.tool';
import { GarbageFullEventRecord } from 'src/app/network/model/garbage-station/event-record/garbage-full-event-record.model';
import { PagedArgs } from 'src/app/network/model/model.interface';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';
import { MediaMultipleStatisticWindowArgs } from '../../../windows/media-multiple-statistic-window/media-multiple-statistic-window.model';
import { MonitorImageWindowBusiness } from './monitor-image-window.business';
import { MonitorMediaWindowBusiness } from './monitor-media-window.business';
import { MonitorVideoWindowBusiness } from './monitor-video-window.business';

@Injectable()
export class MonitorGarbageStationFullWindowBusiness extends WindowViewModel {
  constructor(
    private image: MonitorImageWindowBusiness,
    private video: MonitorVideoWindowBusiness,
    private media: MonitorMediaWindowBusiness
  ) {
    super();
  }
  style = {
    height: '85%',
    width: '90%',
    transform: 'translate(-50%, -48%)',
  };

  eventCount = 0;

  async onimage(
    args: PagedArgs<GarbageFullStationTableModel | EventRecordViewModel>
  ) {
    this.image.open(args);
  }
  onvideo(item: EventRecordViewModel) {
    let record = item as GarbageFullEventRecord;
    let id = item.ResourceId ?? '';
    let name = item.ResourceName;
    if (record.Data.CameraImageUrls && record.Data.CameraImageUrls.length > 0) {
      id = record.Data.CameraImageUrls[0].CameraId;
      name = record.Data.CameraImageUrls[0].CameraName;
    }
    this.video.title = name ?? '';
    this.video.mask = true;
    this.video.playback(id, DateTimeTool.beforeOrAfter(item.EventTime));
  }

  async onallvideo(item: EventRecordViewModel) {
    if (item.ResourceId) {
      this.media.multiple.args = new MediaMultipleStatisticWindowArgs();
      this.media.multiple.args.stationId = item.Data.StationId;
      let second = item.EventTime.getSeconds() - 30;

      this.media.multiple.args.time = new Date(item.EventTime.getTime());
      this.media.multiple.args.time.setSeconds(second);

      this.media.multiple.show = true;
    }
  }
}
