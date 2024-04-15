import { Injectable } from '@angular/core';
import {
  GarbageDropStationTableArgs,
  GarbageDropStationTableModel,
} from 'src/app/common/components/tables/garbage-drop-station-table/garbage-drop-station-table.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { PagedArgs } from 'src/app/network/model/model.interface';
import { GarbageDropStationWindowIndex } from '../../../windows/garbage-drop-station-window/garbage-drop-station-window.component';
import { MonitorImageWindowBusiness } from './monitor-image-window.business';

@Injectable()
export class MonitorGarbageStationDropWindowBusiness extends WindowViewModel {
  constructor(private image: MonitorImageWindowBusiness) {
    super();
  }
  args: GarbageDropStationTableArgs = {};

  index = GarbageDropStationWindowIndex.list;

  style = {
    height: '83.5%',
    width: '90%',
    transform: 'translate(-50%, -44.5%)',
  };

  async onimage(model: PagedArgs<GarbageDropStationTableModel>) {
    this.image.open(model);
  }
}
