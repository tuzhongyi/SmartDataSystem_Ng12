import { Injectable } from '@angular/core';
import { ImageControlModelArray } from 'src/app/view-model/image-control.model';

import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { GarbageFullEventRecord } from 'src/app/network/model/garbage-station/garbage-event-record.model';
import { SRServerRequestService } from 'src/app/network/request/ai-sr-server/sr-server.service';
import { MediaWindowBusiness } from './media-window.business';

@Injectable()
export class GarbageStationFullWindowBusiness extends WindowViewModel {
  constructor(
    private media: MediaWindowBusiness,
    private sr: SRServerRequestService
  ) {
    super();
  }
  style = {
    height: '83.5%',
    width: '90%',
    transform: 'translate(-50%, -44.5%)',
  };

  eventCount = 0;

  onimage(model: ImageControlModelArray) {
    this.media.single.camera = model.models;
    this.media.single.index = model.index;
    this.media.single.show = true;
  }
  onvideo(model: GarbageFullEventRecord) {
    if (model.ResourceId) {
      let duration = DateTimeTool.beforeOrAfter(model.Data.FullTime);
      this.sr.playback(model.ResourceId, {
        BeginTime: duration.begin,
        EndTime: duration.end,
      });
    }
  }
}
