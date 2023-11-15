import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { GarbageVehicle } from 'src/app/network/model/garbage-station/garbage-vehicle.model';

export class GarbageVehicleManagerWindow {
  details = new GarbageVehicleManagerDetailsWindow();
  params = new GarbageVehicleManagerParamsWindow();
  cameras = new GarbageVehicleManagerCamerasWindow();
  confirm = new GarbageVehicleManagerConfirmWindow();
  command = new GarbageVehicleManagerCommandWindow();
  clear() {
    this.details.clear();
    this.cameras.clear();
    this.confirm.clear();
    this.params.clear();
    this.command.clear();
  }
  close() {
    this.clear();
    this.show = false;
  }

  public set show(v: boolean) {
    this.details.show = v;
    this.cameras.show = v;
    this.confirm.show = v;
    this.params.show = v;
    this.command.show = v;
  }
}

class GarbageVehicleManagerDetailsWindow extends WindowViewModel {
  clear(): void {
    this.model = undefined;
  }
  style = {
    width: '800px',
    height: '600px',
  };
  model?: GarbageVehicle;
}
class GarbageVehicleManagerParamsWindow extends WindowViewModel {
  clear(): void {
    this.model = undefined;
  }
  style = {
    width: '400px',
    height: '500px',
  };
  model?: GarbageVehicle;
}
class GarbageVehicleManagerCamerasWindow extends WindowViewModel {
  clear(): void {
    this.model = undefined;
  }
  style = {
    width: '600px',
    height: 'auto',
  };
  language: string = '';
  model?: GarbageVehicle;
}
class GarbageVehicleManagerCommandWindow extends WindowViewModel {
  clear(): void {
    this.model = undefined;
  }
  style = {
    width: '400px',
    height: '500px',
  };
  model?: GarbageVehicle;
}
class GarbageVehicleManagerConfirmWindow extends WindowViewModel {
  clear(): void {}
  style = {
    width: '400px',
    height: '180px',
  };
  language: string = '';
}
