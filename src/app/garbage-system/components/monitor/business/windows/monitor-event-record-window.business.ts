import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { ImageControlCreater } from 'src/app/converter/image-control.creater';
import { EventType } from 'src/app/enum/event-type.enum';
import {
  GarbageFullEventData,
  GarbageFullEventRecord,
} from 'src/app/network/model/garbage-station/event-record/garbage-full-event-record.model';
import {
  IllegalDropEventData,
  IllegalDropEventRecord,
} from 'src/app/network/model/garbage-station/event-record/illegal-drop-event-record.model';
import {
  MixedIntoEventData,
  MixedIntoEventRecord,
} from 'src/app/network/model/garbage-station/event-record/mixed-into-event-record.model';
import { PagedArgs } from 'src/app/network/model/model.interface';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';
import { MediaMultipleWindowArgs } from '../../../windows/media-multiple-window/media-multiple-window.model';
import { MonitorCardRecordEpisodeWindow } from './monitor-card-record-episode-window.business';
import { MonitorImageWindowBusiness } from './monitor-image-window.business';
import { MonitorMediaWindowBusiness } from './monitor-media-window.business';
import { MonitorVideoWindowBusiness } from './monitor-video-window.business';

@Injectable()
export class MonitorRecordWindowBusiness extends WindowViewModel {
  constructor(
    private image: MonitorImageWindowBusiness,
    private card: MonitorCardRecordEpisodeWindow,
    private video: MonitorVideoWindowBusiness,
    private media: MonitorMediaWindowBusiness
  ) {
    super();
  }
  style = {
    height: '90%',
    width: '90%',
    transform: 'translate(-50%, -45%)',
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

  oncard(model: EventRecordViewModel) {
    this.card.record = model;
    this.card.show = true;
  }

  async onvideo(item: EventRecordViewModel) {
    if (item.ResourceId) {
      // if (item.EventType === EventType.MixedInto) {
      //   this.media.multiple.args = new MediaMultipleWindowArgs();
      //   this.media.multiple.args.stationId = item.Data.StationId;
      //   this.media.multiple.args.time = item.EventTime;
      //   this.media.multiple.date = item.EventTime;
      //   this.media.multiple.show = true;
      // } else
      {
        this.video.title = item.ResourceName ?? '';
        this.video.mask = true;
        this.video.playback(
          item.ResourceId,
          DateTimeTool.beforeOrAfter(item.EventTime)
        );
      }
    }
  }

  async onallvideo(item: EventRecordViewModel) {
    if (item.ResourceId) {
      if (item.EventType === EventType.MixedInto) {
        this.media.multiple.args = new MediaMultipleWindowArgs();
        this.media.multiple.args.stationId = item.Data.StationId;

        let second = item.EventTime.getSeconds() - 30;

        this.media.multiple.args.time = new Date(item.EventTime.getTime());
        this.media.multiple.args.time.setSeconds(second);
        this.media.multiple.date = new Date(item.EventTime.getTime());
        this.media.multiple.date.setSeconds(second);
        this.media.multiple.show = true;
      }
    }
  }
}
