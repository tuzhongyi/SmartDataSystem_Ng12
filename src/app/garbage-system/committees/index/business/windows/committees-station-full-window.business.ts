import { Injectable } from '@angular/core';
import { ImageControlModelArray } from 'src/app/view-model/image-control.model';

import { GarbageFullStationTableModel } from 'src/app/common/components/tables/garbage-full-station-table/garbage-full-station-table.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';
import { CommitteesIndexImageWindowBusiness } from './committees-image-window.business';
import { CommitteesVideoWindowBusiness } from './committees-video-window.business';

@Injectable()
export class CommitteesGarbageStationFullWindowBusiness extends WindowViewModel {
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

  eventCount = 0;

  onimage(
    model: ImageControlModelArray<
      GarbageFullStationTableModel | EventRecordViewModel
    >
  ) {
    this.image.array.models = model.models;
    this.image.array.index = model.index;
    if (model.models.length > 0) {
      this.image.array.current = model.models[0];
    }
    this.image.array.show = true;
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
