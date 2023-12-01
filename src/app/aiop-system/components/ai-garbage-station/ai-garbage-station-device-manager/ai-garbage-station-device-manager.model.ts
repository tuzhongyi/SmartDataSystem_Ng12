import { VideoWindowViewModel } from 'src/app/common/components/video-control-window/video-control-window.model';
import { VideoModel } from 'src/app/common/components/video-player/video.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { AIGarbageDevice } from 'src/app/network/model/ai-garbage/garbage-device.model';

export class AIGarbageStationDeviceWindow {
  details = new AIGarbageStationDeviceDetailsWindow();
  command = new AIGarbageStationDeviceCommandWindow();
  camera = new AIGarbageStationDeviceCameraWindow();
  drop = new AIGarbageStationDeviceDropWindow();
  schedule = new AIGarbageStationDeviceScheduleWindow();
  confirm = new AIGarbageStationDeviceConfirmWindow();
  video = new AIGarbageStationDeviceVideoWindow();
  status = new AIGarbageStationDeviceStatusWindow();
  clear() {
    this.details.clear();
    this.command.clear();
    this.camera.clear();
    this.drop.clear();
    this.schedule.clear();
    this.confirm.clear();
    this.video.clear();
    this.status.clear();
  }
  close() {
    this.details.show = false;
    this.command.show = false;
    this.camera.show = false;
    this.drop.show = false;
    this.schedule.show = false;
    this.confirm.show = false;
    this.video.show = false;
    this.status.show = false;
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
    width: '520px',
    height: '500px',
  };
  model?: AIGarbageDevice;
}
class AIGarbageStationDeviceCameraWindow extends WindowViewModel {
  clear(): void {
    this.model = undefined;
  }
  style = {
    width: '500px',
    height: 'auto',
  };
  language: string = '';
  model?: AIGarbageDevice;
}
class AIGarbageStationDeviceConfirmWindow extends WindowViewModel {
  clear(): void {
    this.models = [];
    this.language = '';
  }
  style = {
    width: '400px',
    height: '180px',
  };
  language: string = '';
  models?: AIGarbageDevice[];
}
class AIGarbageStationDeviceVideoWindow extends VideoWindowViewModel {
  clear(): void {
    this.model = undefined;
  }
  style = {
    width: '64%',
    height: '64%',
  };
  model?: VideoModel;
}
class AIGarbageStationDeviceStatusWindow extends WindowViewModel {
  clear(): void {
    this.model = undefined;
  }
  style = {
    width: '400px',
    height: 'auto',
  };
  model?: AIGarbageDevice;
}
