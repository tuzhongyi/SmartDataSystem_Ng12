import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { ImageControlCreater } from 'src/app/converter/image-control.creater';
import { StationState } from 'src/app/enum/station-state.enum';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { PagedArgs } from 'src/app/network/model/model.interface';
import { AuditStatisticDataImageWindow } from './audit-statistic-data-image.window';

@Injectable()
export class AuditStatisticDataStationWindow extends WindowViewModel {
  constructor(private image: AuditStatisticDataImageWindow) {
    super();
  }
  style = { width: '80%', height: '818px' };
  state?: StationState;
  drop?: boolean;

  onimage(args: PagedArgs<GarbageStation>) {
    this.image.manualcapture = true;

    this.image.index = args.page.PageIndex;

    this.image.stationId = args.data.Id;
    if (args.data.Cameras) {
      this.image.models = args.data.Cameras.map((x) =>
        ImageControlCreater.Create(x)
      );
    }

    this.image.show = true;
  }
}
