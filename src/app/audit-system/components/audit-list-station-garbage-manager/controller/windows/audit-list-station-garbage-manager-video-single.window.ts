import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';

@Injectable()
export class AuditListStationGarbageManagerVideoSingleWindow extends WindowViewModel {
  style = {
    width: '64%',
    height: '64%',
    top: '56%',
  };

  cameraId?: string;
  title = '';
}
