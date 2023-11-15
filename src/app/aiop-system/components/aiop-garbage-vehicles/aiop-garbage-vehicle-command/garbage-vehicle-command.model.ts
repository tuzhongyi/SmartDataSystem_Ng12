import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import {
  NBPowerOnParams,
  ResetRelayParams,
} from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.params';

export class GarbageVehicleCommandConfirmWindowModel extends WindowViewModel {
  clear(): void {
    this.model = undefined;
  }
  style = {
    width: '400px',
    height: '180px',
  };
  language: string = '';
  model?: ResetRelayParams | NBPowerOnParams;
}
