import { Injectable } from '@angular/core';
import { ImageControlModelArray } from 'src/app/view-model/image-control.model';

import { GarbageFullStationTableModel } from 'src/app/common/components/tables/garbage-full-station-table/garbage-full-station-table.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { GarbageFullEventRecord } from 'src/app/network/model/garbage-event-record.model';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';
import { IndexImageWindowBusiness } from './index-image-window.business';
import { IndexVideoWindowBusiness } from './index-video-window.business';

@Injectable()
export class IndexGarbageStationFullWindowBusiness extends WindowViewModel {
  constructor(
    private image: IndexImageWindowBusiness,
    private video: IndexVideoWindowBusiness
  ) {
    super();
  }
  style = {
    height: '83.5%',
    width: '90%',
    transform: 'translate(-50%, -44.5%)',
  };

  eventCount = 0;

  clear() {}

  onimage(
    model: ImageControlModelArray<
      GarbageFullStationTableModel | EventRecordViewModel
    >
  ) {
    this.image.array.manualcapture =
      model.data instanceof GarbageFullStationTableModel;
    this.image.array.index = model.index;
    if (model.models.length > 0) {
      this.image.array.stationId = model.models[0].stationId;
    }
    this.image.array.models = model.models;
    this.image.array.show = true;
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
    this.video.playback(id, DateTimeTool.beforeOrAfter(item.EventTime));
  }
}
