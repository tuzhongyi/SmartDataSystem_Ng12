import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { ImageControlCreater } from 'src/app/converter/image-control.creater';
import { EventType } from 'src/app/enum/event-type.enum';
import {
  GarbageFullEventData,
  GarbageFullEventRecord,
  IllegalDropEventData,
  IllegalDropEventRecord,
  MixedIntoEventData,
  MixedIntoEventRecord,
} from 'src/app/network/model/garbage-station/garbage-event-record.model';
import { PagedArgs } from 'src/app/network/model/model.interface';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';
import { CommitteesIndexImageWindowBusiness } from './committees-image-window.business';
import { CommitteesVideoWindowBusiness } from './committees-video-window.business';

@Injectable()
export class CommitteesRecordWindowBusiness extends WindowViewModel {
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

  type: EventType = EventType.IllegalDrop;

  count = 0;

  divisionId?: string;
  stationId?: string;

  async onimage(args: PagedArgs<EventRecordViewModel>) {
    if (args.data.Data instanceof GarbageFullEventData) {
      this.image.array.index = args.page.PageIndex;
      this.image.array.manualcapture = false;
      this.image.array.stationId = args.data.Data.StationId;
      let data = args.data as GarbageFullEventRecord;
      this.image.array.models = ImageControlCreater.Create(data);
      this.image.array.show = true;
    } else if (args.data.Data instanceof IllegalDropEventData) {
      this.image.page.page = args.page;
      let data = args.data as IllegalDropEventRecord;
      this.image.page.model = ImageControlCreater.Create(data);

      this.image.page.show = true;
    } else if (args.data.Data instanceof MixedIntoEventData) {
      this.image.page.page = args.page;
      let data = args.data as MixedIntoEventRecord;
      this.image.page.model = ImageControlCreater.Create(data);
      this.image.page.show = true;
    } else {
    }
  }
  async onvideo(item: EventRecordViewModel) {
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
