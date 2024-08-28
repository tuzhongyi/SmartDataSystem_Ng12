import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { AIGarbageDeviceCommand } from 'src/app/network/model/ai-garbage/garbage-device-command.enum';

export class AIGarbageStationDeviceCommandWindow {
  confirm = new AIGarbageStationDeviceCommandConfirmWindow();
  close() {
    this.confirm.close();
  }
}

export class AIGarbageStationDeviceCommandConfirmWindow extends WindowViewModel {
  clear() {
    this.command = undefined;
  }
  command?: AIGarbageDeviceCommand;
  style = {
    width: '500px',
    height: 'auto',
  };
  close() {
    this.clear();
    this.show = false;
  }
}
