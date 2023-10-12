import { Injectable } from '@angular/core';
import {
  GarbageDropStationTableModel,
  GarbageDropStationTableSourceModel,
} from 'src/app/common/components/tables/garbage-drop-station-table/garbage-drop-station-table.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { ImageControlCreater } from 'src/app/converter/image-control.creater';
import { PagedArgs } from 'src/app/network/model/model.interface';
import { CommitteesIndexImageWindowBusiness } from './committees-image-window.business';

@Injectable()
export class CommitteesGarbageStationDropWindowBusiness extends WindowViewModel {
  constructor(private image: CommitteesIndexImageWindowBusiness) {
    super();
  }
  source?: GarbageDropStationTableSourceModel;

  style = {
    height: '83.5%',
    width: '90%',
    transform: 'translate(-50%, -44.5%)',
  };

  async onimage(model: PagedArgs<GarbageDropStationTableModel>) {
    this.image.array.index = model.page.PageIndex;
    let station = await model.data.GarbageStation;
    this.image.array.stationId = station.Id;
    this.image.array.manualcapture = true;
    if (station.Cameras) {
      this.image.array.models = station.Cameras.map((x) =>
        ImageControlCreater.Create(x)
      );
    }
    this.image.array.show = true;
  }
}
