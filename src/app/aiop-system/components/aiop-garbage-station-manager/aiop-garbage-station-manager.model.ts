import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { GarbageStationModel } from 'src/app/view-model/garbage-station.model';

export class AIOPGarbageStationManagerWindow {
  details = new AIOPGarbageStationManagerDetailsWindow();
  confirm = new AIOPGarbageStationManagerConfirmWindow();
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
class AIOPGarbageStationManagerConfirmWindow extends WindowViewModel {
  get content() {
    return `是否删除 ${this.models.map((x) => x.Name).join(',')} ？`;
  }
  models: GarbageStationModel[] = [];
}
