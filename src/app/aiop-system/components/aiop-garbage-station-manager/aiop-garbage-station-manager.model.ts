import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { GarbageStationModel } from 'src/app/view-model/garbage-station.model';

export class AIOPGarbageStationManagerWindow {
  details = new AIOPGarbageStationManagerDetailsWindow();
  clean() {
    this.details.clear();
  }
  close() {
    this.details.show = false;
  }
}

class AIOPGarbageStationManagerDetailsWindow extends WindowViewModel {
  clear() {
    this.model = undefined;
  }

  style = {
    width: '700px',
    height: 'auto',
  };

  model?: GarbageStationModel;
}
