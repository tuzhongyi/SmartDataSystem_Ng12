import { WindowViewModel } from 'src/app/common/components/window-control/window.model';

export class AIGarbageStationDeviceSessionManagerWindow {
  message = {
    history: new MessageHistoryWindow(),
  };
  html?: Window;
}

class MessageHistoryWindow extends WindowViewModel {
  clear(): void {}
  style = {
    width: '80%',
    height: '80%',
  };
}
