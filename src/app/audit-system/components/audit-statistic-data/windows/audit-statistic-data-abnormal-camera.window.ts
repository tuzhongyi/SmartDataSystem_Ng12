import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { CameraAbnormalType } from 'src/app/enum/camera-abnormal-type.enum';

@Injectable()
export class AuditStatisticDataAbnormalCameraWindow extends WindowViewModel {
  style = {
    width: '80%',
    height: '80%',
  };

  divisionId?: string;
  hour = 0;
  type?: CameraAbnormalType;
}
