import { Injectable } from '@angular/core';
import { GarbageDropStationTableModel } from 'src/app/common/components/tables/garbage-drop-station-table/garbage-drop-station-table.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { ImageControlCreater } from 'src/app/converter/image-control.creater';
import { PagedArgs } from 'src/app/network/model/model.interface';
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

  async onimage(model: PagedArgs<GarbageDropStationTableModel>) {
    // this.media.single.camera = model.models;
    // this.media.single.index = model.index;
    // this.media.single.autoplay = model.autoplay;
    // this.media.single.operation.fullscreen = false;
    // this.media.single.show = true;

    this.image.array.index = model.page.PageIndex;
    let station = await model.data.GarbageStation;
    this.image.array.stationId = station.Id;
    this.image.array.manualcapture = true;
    if (station.Cameras) {
      this.image.array.models = station.Cameras.map(
        (x) => ImageControlCreater.Create(x)!
      );
    }
    this.image.array.show = true;
  }
}
