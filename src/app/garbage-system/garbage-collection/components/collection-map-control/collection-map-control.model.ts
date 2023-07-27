import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';

export class MapControlWindow {
  confirm = new MapcontrolConfirmWindow();
  clear() {
    this.confirm.clear();
  }
  close() {
    this.confirm.show = false;
  }
}
class MapcontrolConfirmWindow extends WindowViewModel {
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
