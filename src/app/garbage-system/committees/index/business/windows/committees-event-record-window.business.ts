import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { EventType } from 'src/app/enum/event-type.enum';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';
import { ImageControlModelArray } from 'src/app/view-model/image-control.model';
import { ImagePaged } from 'src/app/view-model/paged.model';
import { CommitteesIndexImageWindowBusiness } from './committees-image-window.business';
import { CommitteesMediaWindowBusiness } from './committees-media-window.business';
import { CommitteesVideoWindowBusiness } from './committees-video-window.business';

@Injectable()
export class CommitteesRecordWindowBusiness extends WindowViewModel {
  constructor(
    private media: CommitteesMediaWindowBusiness,
    private video: CommitteesVideoWindowBusiness,
    private image: CommitteesIndexImageWindowBusiness,
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

  async onimage(
    model:
      | ImageControlModelArray<EventRecordViewModel>
      | ImagePaged<EventRecordViewModel>
  ) {
    if (model instanceof ImagePaged) {
      this.image.page.page = model.Page;
      this.image.page.model = model.Image;
      this.image.page.show = true;
    } else if (model instanceof ImageControlModelArray) {
      this.image.array.models = model.models;
      this.image.array.index = model.index;
      if (model.models.length > 0) {
        this.image.array.current = model.models[0];
      }
      this.image.array.show = true;
    } else {
    }
  }
  onvideo(item: EventRecordViewModel) {
    if (item.ResourceId) {
      this.video.title = item.ResourceName ?? '';
      this.video.playback(
        item.ResourceId,
        DateTimeTool.beforeOrAfter(item.EventTime)
      );
    }
  }
}
