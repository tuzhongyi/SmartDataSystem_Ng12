import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { AIGarbageRfidCard } from 'src/app/network/model/ai-garbage/rfid-card.model';

export class AIGarbageStationRfidCardWindow {
  details = new AIGarbageStationRfidCardDetailsWindow();
  confirm = new AIGarbageStationRfidCardConfirmWindow();
  clear() {
    this.details.clear();
    this.confirm.clear();
  }
  close() {
    this.details.show = false;
    this.confirm.show = false;
  }
}

class AIGarbageStationRfidCardDetailsWindow extends WindowViewModel {
  clear(): void {
    this.model = undefined;
  }
  style = {
    width: '800px',
    height: '720px',
  };
  model?: AIGarbageRfidCard;
}
class AIGarbageStationRfidCardConfirmWindow extends WindowViewModel {
  clear(): void {
    this.models = [];
  }
  style = {
    width: '400px',
    height: '180px',
  };
  language: string = '';
  models: AIGarbageRfidCard[] = [];
}
