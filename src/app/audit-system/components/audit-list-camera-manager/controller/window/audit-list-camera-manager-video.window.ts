import { Injectable } from '@angular/core';
import { VideoWindowViewModel } from 'src/app/common/components/video-control-window/video-control-window.model';

@Injectable()
export class AuditListCameraManagerVideoWindow extends VideoWindowViewModel {
  constructor() {
    super();
  }
  style = {
    width: '64%',
    height: '64%',
    top: '56%',
  };

  cameraId?: string;
}
