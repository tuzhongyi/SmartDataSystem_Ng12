import { WindowViewModel } from "src/app/common/components/window-control/window.model";

export class AIGarbageStationDeviceDropWindow {
  confirm = new AIGarbageStationDeviceDropWindowConfirmWindow();

  close() {
    this.confirm.show = false;
  }
}
class AIGarbageStationDeviceDropWindowConfirmWindow extends WindowViewModel {
  style = {
    height: "auto",
  };
}
