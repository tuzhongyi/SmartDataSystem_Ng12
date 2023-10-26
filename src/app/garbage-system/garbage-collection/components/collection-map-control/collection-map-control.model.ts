import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { GarbageVehicle } from 'src/app/network/model/garbage-station/garbage-vehicle.model';

export class CollectionMapControlWindow {
  confirm = new CollectionMapControlConfirmWindow();
  clear() {
    this.confirm.clear();
  }
  close() {
    this.confirm.show = false;
  }
}
class CollectionMapControlConfirmWindow extends WindowViewModel {
  clear() {
    this.model = undefined;
  }
  style = {
    width: '400px',
    height: 'auto',
  };
  model?: GarbageVehicle;
  power: boolean = true;
}
