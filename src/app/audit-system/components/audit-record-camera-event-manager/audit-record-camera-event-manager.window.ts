import { WindowViewModel } from 'src/app/common/components/window-control/window.model';

export class AuditRecordCameraEventManagerWindow {
  video = new AuditRecordCameraEventManagerVideoWindow();
  image = new AuditRecordCameraEventManagerImageWindow();
}

class AuditRecordCameraEventManagerVideoWindow extends WindowViewModel {
  clear() {
    this.cameraId = undefined;
  }
  cameraId?: string;
  time?: Date;
  title?: string;
}
class AuditRecordCameraEventManagerImageWindow extends WindowViewModel {
  clear() {}
  url?: Promise<string>;
  title?: string;
}
