import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { AIGarbageDevice } from 'src/app/network/model/ai-garbage/garbage-device.model';

export class AIGarbageStationDeviceWindow {
  details = new AIGarbageStationDeviceDetailsWindow();
  command = new AIGarbageStationDeviceCommandWindow();
  camera = new AIGarbageStationDeviceCameraWindow();
  drop = new AIGarbageStationDeviceDropWindow();
  schedule = new AIGarbageStationDeviceScheduleWindow();
  confirm = new AIGarbageStationDeviceConfirmWindow();
  clear() {
    this.details.clear();
    this.command.clear();
    this.camera.clear();
    this.drop.clear();
    this.schedule.clear();
    this.confirm.clear();
  }
  close() {
    this.details.show = false;
    this.command.show = false;
    this.camera.show = false;
    this.drop.show = false;
    this.schedule.show = false;
    this.confirm.show = false;
  }
}

class AIGarbageStationDeviceDetailsWindow extends WindowViewModel {
  clear(): void {
    this.model = undefined;
  }
  style = {
    width: '800px',
    height: '600px',
  };
  model?: AIGarbageDevice;
}
class AIGarbageStationDeviceCommandWindow extends WindowViewModel {
  clear(): void {
    this.model = undefined;
  }
  style = {
    width: '400px',
    height: 'auto',
  };
  model?: AIGarbageDevice;
}
class AIGarbageStationDeviceDropWindow extends WindowViewModel {
  clear(): void {
    this.model = undefined;
  }
  style = {
    width: '600px',
    height: 'auto',
  };
  model?: AIGarbageDevice;
}
class AIGarbageStationDeviceScheduleWindow extends WindowViewModel {
  clear(): void {
    this.model = undefined;
  }
  style = {
    width: '500px',
    height: '500px',
  };
  model?: AIGarbageDevice;
}
class AIGarbageStationDeviceCameraWindow extends WindowViewModel {
  clear(): void {
    this.model = undefined;
  }
  style = {
    width: '400px',
    height: 'auto',
  };
  language: string = '';
  model?: AIGarbageDevice;
}
class AIGarbageStationDeviceConfirmWindow extends WindowViewModel {
  clear(): void {
    this.models = [];
  }
  style = {
    width: '400px',
    height: '180px',
  };
  language: string = '';
  models?: AIGarbageDevice[];
}
