import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { ImageControlCreater } from 'src/app/converter/image-control.creater';
import { EventType } from 'src/app/enum/event-type.enum';
import { SewageEventRecord } from 'src/app/network/model/garbage-station/event-record/sewage-event-record.model';
import { PagedArgs } from 'src/app/network/model/model.interface';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';
import { AuditStatisticEventImageWindow } from './audit-statistic-event-image.window';
import { AuditStatisticEventVideoWindow } from './audit-statistic-event-video.window';

@Injectable()
export class AuditStatisticEventRecordWindow extends WindowViewModel {
  constructor(
    private image: AuditStatisticEventImageWindow,
    private video: AuditStatisticEventVideoWindow
  ) {
    super();
  }
  clear() {
    this.divisionId = undefined;
  }
  style = { width: '80%', height: '818px' };
  divisionId?: string;
  type = EventType.IllegalDrop;

  onimage(model: PagedArgs<EventRecordViewModel>) {
    this.image.page.page = model.page;
    let data = model.data as SewageEventRecord;
    this.image.page.model = ImageControlCreater.Create(data);
    this.image.page.show = true;
  }
  onvideo(item: EventRecordViewModel) {
    if (item.ResourceId) {
      this.video.title = item.ResourceName ?? '';
      this.video.mask = true;
      this.video.playback(
        item.ResourceId,
        DateTimeTool.beforeOrAfter(item.EventTime)
      );
    }
  }
}
