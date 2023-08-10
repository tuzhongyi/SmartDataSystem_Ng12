import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { AIGarbageRegion } from 'src/app/network/model/ai-garbage/region.model';

export class AIGarbageStationRegionWindow {
  details = new AIGarbageStationRegionDetailsWindow();
  building = new AIGarbageStationRegionBuildingWindow();
  station = new AIGarbageStationRegionStationWindow();
  confirm = new AIGarbageStationRegionConfirmWindow();
  clear() {
    this.details.clear();
    this.building.clear();
    this.station.clear();

    this.confirm.clear();
  }
  close() {
    this.details.show = false;
    this.building.show = false;
    this.station.show = false;
    this.confirm.show = false;
  }
}

class AIGarbageStationRegionDetailsWindow extends WindowViewModel {
  clear(): void {
    this.model = undefined;
  }
  style = {
    width: '800px',
    height: '600px',
  };
  model?: AIGarbageRegion;
}
class AIGarbageStationRegionBuildingWindow extends WindowViewModel {
  clear(): void {
    this.model = undefined;
  }
  style = {
    width: '800px',
    height: '600px',
  };
  model?: AIGarbageRegion;
}
class AIGarbageStationRegionStationWindow extends WindowViewModel {
  clear(): void {
    this.model = undefined;
  }
  style = {
    width: '400px',
    height: 'auto',
  };
  model?: AIGarbageRegion;
}
class AIGarbageStationRegionConfirmWindow extends WindowViewModel {
  clear(): void {
    this.models = [];
  }
  style = {
    width: '400px',
    height: '180px',
  };
  language: string = '';
  models: AIGarbageRegion[] = [];
}
