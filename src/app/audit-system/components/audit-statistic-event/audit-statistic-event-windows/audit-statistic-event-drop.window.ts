import { Injectable } from '@angular/core';
import { GarbageDropRecordViewModel } from 'src/app/common/components/tables/garbage-drop-record-table/garbage-drop-record.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { ImageControlCreater } from 'src/app/converter/image-control.creater';
import { ResourceType } from 'src/app/enum/resource-type.enum';
import { PagedArgs } from 'src/app/network/model/model.interface';
import { AuditStatisticEventImageWindow } from './audit-statistic-event-image.window';
import { AuditStatisticEventVideoWindow } from './audit-statistic-event-video.window';

@Injectable()
export class AuditStatisticEventDropWindow extends WindowViewModel {
  constructor(
    private image: AuditStatisticEventImageWindow,
    private video: AuditStatisticEventVideoWindow
  ) {
    super();
  }
  clear() {
    this.divisionId = undefined;
    this.handle = undefined;
    this.timeout = undefined;
  }
  style = { width: '98%', height: '818px' };
  divisionId?: string;
  handle?: boolean;
  timeout?: boolean;

  async onimage(args: PagedArgs<GarbageDropRecordViewModel>) {
    this.image.array.manualcapture = false;
    this.image.array.index = args.page.PageIndex;
    this.image.array.stationId = args.data.Data.StationId;
    this.image.array.models = ImageControlCreater.Create(args.data);
    this.image.array.show = true;
  }
  onvideo(item: GarbageDropRecordViewModel) {
    let id = item.ResourceId ?? '';
    let name = item.ResourceName;
    if (item.ResourceType === ResourceType.GarbageStation) {
      if (item.Data.HandleImageUrls && item.Data.HandleImageUrls.length > 0) {
        id = item.Data.HandleImageUrls[0].CameraId;
        name = item.Data.HandleImageUrls[0].CameraName;
      } else if (
        item.Data.TimeoutImageUrls &&
        item.Data.TimeoutImageUrls.length > 0
      ) {
        id = item.Data.TimeoutImageUrls[0].CameraId;
        name = item.Data.TimeoutImageUrls[0].CameraName;
      } else if (
        item.Data.DropImageUrls &&
        item.Data.DropImageUrls.length > 0
      ) {
        id = item.Data.DropImageUrls[0].CameraId;
        name = item.Data.DropImageUrls[0].CameraName;
      }
    }
    this.video.title = name ?? '';
    this.video.mask = true;
    this.video.playback(id, DateTimeTool.beforeOrAfter(item.EventTime));
  }
}
