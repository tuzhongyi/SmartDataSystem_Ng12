import { WindowViewModel } from 'src/app/common/components/window-control/window.model';

export class AIModelManagerWindow {
  details = new AIModelManagerDetailsWindow();
}

class AIModelManagerDetailsWindow extends WindowViewModel {
  clear() {
    this.id = '';
  }
  style = {
    width: '930px',
    height: 'auto',
  };
  id: string = '';
}
