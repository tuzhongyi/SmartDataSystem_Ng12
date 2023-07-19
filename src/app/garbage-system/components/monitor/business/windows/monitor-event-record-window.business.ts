import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { EventType } from 'src/app/enum/event-type.enum';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';
import { ImageControlModelArray } from 'src/app/view-model/image-control.model';
import { ImagePaged } from 'src/app/view-model/paged.model';
import { MonitorCardRecordEpisodeWindow } from './monitor-card-record-episode-window.business';
import { MonitorImageWindowBusiness } from './monitor-image-window.business';
import { MonitorVideoWindowBusiness } from './monitor-video-window.business';

@Injectable()
export class MonitorRecordWindowBusiness extends WindowViewModel {
  constructor(
    private image: MonitorImageWindowBusiness,
    private card: MonitorCardRecordEpisodeWindow,
    private video: MonitorVideoWindowBusiness
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

  async onimage(
    model:
      | ImageControlModelArray<EventRecordViewModel>
      | ImagePaged<EventRecordViewModel>
  ) {
    // this.media.single.camera = model.models;
    // this.media.single.index = model.index;
    // this.media.single.autoplay = model.autoplay;
    // this.media.single.eventType = this.type;
    // this.media.single.paged = model.page;
    // this.media.single.operation.fullscreen = false;
    // this.media.single.show = true;
    if (model instanceof ImagePaged) {
      this.image.page.page = model.Page;
      this.image.page.model = model.Image;
      this.image.page.show = true;
    } else if (model instanceof ImageControlModelArray) {
      this.image.array.index = model.index;
      this.image.array.manualcapture = false;
      if (model.models.length > 0) {
        this.image.array.stationId = model.models[0].stationId;
      }
      this.image.array.models = model.models;
      this.image.array.show = true;
    } else {
    }
  }

  oncard(model: EventRecordViewModel) {
    this.card.record = model;
    this.card.show = true;
  }

  async onvideo(item: EventRecordViewModel) {
    if (item.ResourceId) {
      this.video.playback(
        item.ResourceId,
        DateTimeTool.beforeOrAfter(item.EventTime)
      );
    }
  }
}
