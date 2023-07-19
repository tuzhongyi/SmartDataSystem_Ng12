import { Injectable } from '@angular/core';
import { GarbageFullStationTableModel } from 'src/app/common/components/tables/garbage-full-station-table/garbage-full-station-table.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';
import { ImageControlModelArray } from 'src/app/view-model/image-control.model';
import { GarbageDropStationWindowIndex } from '../../../windows/garbage-drop-station-window/garbage-drop-station-window.component';
import { MonitorImageWindowBusiness } from './monitor-image-window.business';

@Injectable()
export class MonitorGarbageStationDropWindowBusiness extends WindowViewModel {
  constructor(private image: MonitorImageWindowBusiness) {
    super();
  }
  divisionId?: string;

  index = GarbageDropStationWindowIndex.list;

  style = {
    height: '83.5%',
    width: '90%',
    transform: 'translate(-50%, -44.5%)',
  };

  onimage(
    model: ImageControlModelArray<
      GarbageFullStationTableModel | EventRecordViewModel
    >
  ) {
    // this.media.single.camera = model.models;
    // this.media.single.index = model.index;
    // this.media.single.autoplay = model.autoplay;
    // this.media.single.operation.fullscreen = false;
    // this.media.single.show = true;

    this.image.array.index = model.index;

    if (model.models.length > 0) {
      this.image.array.stationId = model.models[0].stationId;
    }
    this.image.array.manualcapture = true;
    this.image.array.models = model.models;
    this.image.array.show = true;
  }
}
