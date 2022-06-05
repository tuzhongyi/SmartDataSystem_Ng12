import { Injectable } from '@angular/core';
import {
  ImageControlModelArray,
} from 'src/app/view-model/image-control.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { EventType } from 'src/app/enum/event-type.enum';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { CommitteesMediaWindowBusiness } from './committees-media-window.business';


@Injectable()
export class CommitteesRecordWindowBusiness extends WindowViewModel {
  constructor(
    private media: CommitteesMediaWindowBusiness,
    private stationService: GarbageStationRequestService
  ) {
    super();
    this.show = true;
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
    this.media.single.camera = model.models;
    this.media.single.index = model.index;
    this.media.single.autoplay = model.autoplay;
    this.media.single.show = true;
  }
}
