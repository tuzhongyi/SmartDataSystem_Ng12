import { EventEmitter, Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { DateTimeTool } from 'src/app/common/tools/date-time-tool/datetime.tool';
import { EventType } from 'src/app/enum/event-type.enum';
import { PagedArgs } from 'src/app/network/model/model.interface';
import { Page, PagedList } from 'src/app/network/model/page_list.model';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';
import { MediaMultipleStatisticWindowArgs } from '../../../windows/media-multiple-statistic-window/media-multiple-statistic-window.model';
import { MonitorCardRecordEpisodeWindow } from './monitor-card-record-episode-window.business';
import { MonitorRecordHandleCompleteWindowBusiness } from './monitor-event-record-handle-complete-window.business';
import { MonitorImageWindowBusiness } from './monitor-image-window.business';
import { MonitorMediaWindowBusiness } from './monitor-media-window.business';
import { MonitorVideoWindowBusiness } from './monitor-video-window.business';

@Injectable()
export class MonitorRecordWindowBusiness extends WindowViewModel {
  constructor(
    private image: MonitorImageWindowBusiness,
    private card: MonitorCardRecordEpisodeWindow,
    private video: MonitorVideoWindowBusiness,
    private media: MonitorMediaWindowBusiness,
    private complete: MonitorRecordHandleCompleteWindowBusiness
  ) {
    super();
    this.image.getData.subscribe((x) => {
      this.data.get.emit(x);
    });
    this.complete.data.get.subscribe((x) => {
      this.data.get.emit(x);
    });
  }
  style = {
    height: '85%',
    width: '90%',
    transform: 'translate(-50%, -48%)',
  };

  type: EventType = EventType.IllegalDrop;

  count = 0;

  divisionId?: string;
  stationId?: string;

  data = {
    get: new EventEmitter<Page>(),
    got: (paged: PagedList<EventRecordViewModel>) => {
      if (this.image.show) {
        this.image.gotData(paged);
      }
      if (this.complete.show) {
        this.complete.data.got(paged);
      }
    },
  };

  async onimage(args: PagedArgs<EventRecordViewModel>) {
    this.image.open(args);
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
        this.media.multiple.args = new MediaMultipleStatisticWindowArgs();
        this.media.multiple.args.stationId = item.Data.StationId;

        let second = item.EventTime.getSeconds() - 30;

        this.media.multiple.args.time = new Date(item.EventTime.getTime());
        this.media.multiple.args.time.setSeconds(second);
        this.media.multiple.show = true;
      }
    }
  }
  clear() {
    this.stationId = undefined;
    this.divisionId = undefined;
  }
  oncomplete(item: PagedArgs<EventRecordViewModel>) {
    this.complete.paged.Data = item.data;
    this.complete.paged.Page = item.page;
    this.complete.show = true;
  }
}
