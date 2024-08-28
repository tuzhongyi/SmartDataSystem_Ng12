import { Injectable } from '@angular/core';
import { VideoWindowViewModel } from 'src/app/common/components/video-control-window/video-control-window.model';

@Injectable()
export class AuditStatisticDataAbnormalCameraManagerVideoWindow extends VideoWindowViewModel {
  style = {
    width: '80%',
    height: '80%',
  };
  cameraId?: string;
}
