import { Injectable } from '@angular/core';
import {
  ImageControlModel,
  ImageControlModelArray,
} from 'src/app/common/components/image-control/image-control.model';
import { EventRecordViewModel } from 'src/app/common/components/tables/event-record-table/event-record.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { EventType } from 'src/app/enum/event-type.enum';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
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
    height: '83.5%',
    width: '90%',
    transform: 'translate(-50%, -44.5%)',
  };

  type: EventType = EventType.IllegalDrop;

  count = 0;

  divisionId?: string;
  stationId?: string;

  async onimage(model: ImageControlModelArray) {
    this.media.camera = model.models;
    this.media.index = model.index;
    this.media.autoplay = model.autoplay;
    this.media.show = true;
  }
}
