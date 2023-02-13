import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { EventType } from 'src/app/enum/event-type.enum';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { ImageControlModelArray } from 'src/app/view-model/image-control.model';
import { MediaWindowBusiness } from './media-window.business';

@Injectable()
export class RecordWindowBusiness extends WindowViewModel {
  constructor(
    private media: MediaWindowBusiness,
    private stationService: GarbageStationRequestService
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
}
