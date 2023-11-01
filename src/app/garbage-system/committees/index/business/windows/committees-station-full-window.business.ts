import { Injectable } from '@angular/core';

import { GarbageFullStationTableModel } from 'src/app/common/components/tables/garbage-full-station-table/garbage-full-station-table.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { Flags } from 'src/app/common/tools/flags';
import { ImageControlCreater } from 'src/app/converter/image-control.creater';
import { CameraUsage } from 'src/app/enum/camera-usage.enum';
import { GarbageFullEventRecord } from 'src/app/network/model/garbage-station/event-record/garbage-full-event-record.model';
import { PagedArgs } from 'src/app/network/model/model.interface';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';
import { CommitteesIndexImageWindowBusiness } from './committees-image-window.business';
import { CommitteesVideoWindowBusiness } from './committees-video-window.business';

@Injectable()
export class CommitteesGarbageStationFullWindowBusiness extends WindowViewModel {
  constructor(
    private image: CommitteesIndexImageWindowBusiness,
    private video: CommitteesVideoWindowBusiness
  ) {
    super();
  }
  style = {
    height: '83.5%',
    width: '90%',
    transform: 'translate(-50%, -44.5%)',
  };

  eventCount = 0;

  async onimage(
    args: PagedArgs<GarbageFullStationTableModel | EventRecordViewModel>
  ) {
    this.image.array.manualcapture =
      args.data instanceof GarbageFullStationTableModel;
    this.image.array.index = args.page.PageIndex;

    if (args.data instanceof GarbageFullStationTableModel) {
      let station = await args.data.GarbageStation;
      this.image.array.stationId = station.Id;
      if (station.Cameras) {
        this.image.array.models = station.Cameras.filter((x) => {
          let flags = new Flags(x.CameraUsage);
          return flags.contains(CameraUsage.GarbageFull);
        }).map((x) => ImageControlCreater.Create(x));
      }
    } else if (args.data instanceof EventRecordViewModel) {
      let data = args.data as GarbageFullEventRecord;
      this.image.array.stationId = data.Data.StationId;
      this.image.array.models = ImageControlCreater.Create(data);
      this.image.array.show = true;
    } else {
    }
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
    this.video.mask = true;
    this.video.playback(id, DateTimeTool.beforeOrAfter(item.EventTime));
  }
}
