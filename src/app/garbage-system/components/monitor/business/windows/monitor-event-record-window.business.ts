import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { EventType } from 'src/app/enum/event-type.enum';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';
import { ImageControlModelArray } from 'src/app/view-model/image-control.model';
import { MonitorCardRecordEpisodeWindow } from './monitor-card-record-episode-window.business';
import { MonitorMediaWindowBusiness } from './monitor-media-window.business';

@Injectable()
export class MonitorRecordWindowBusiness extends WindowViewModel {
  constructor(
    private media: MonitorMediaWindowBusiness,
    private card: MonitorCardRecordEpisodeWindow
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

  async onimage(model: ImageControlModelArray) {
    this.media.single.camera = model.models;
    this.media.single.index = model.index;
    this.media.single.autoplay = model.autoplay;
    this.media.single.eventType = this.type;
    this.media.single.paged = model.page;
    this.media.single.show = true;
  }

  oncard(model: EventRecordViewModel) {
    this.card.record = model;
    this.card.show = true;
  }
}
