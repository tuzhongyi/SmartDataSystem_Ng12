import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { Camera } from 'src/app/network/model/garbage-station/camera.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';

export class AIOPGarbageStationDetailsWindow {
  confirm = new AIOPGarbageStationDetailsConfirmWindow();
  setting = new AIOPGarbageStationDetailsSettingWindow();
}

class AIOPGarbageStationDetailsConfirmWindow extends WindowViewModel {
  clear() {
    this.camera = undefined;
  }
  style = {
    height: 'auto',
  };
  camera?: Camera;
}
class AIOPGarbageStationDetailsSettingWindow extends WindowViewModel {
  clear() {
    this.model = undefined;
  }
  style = {
    width: '700px',
    height: '518px',
  };
  model?: GarbageStation;
}
