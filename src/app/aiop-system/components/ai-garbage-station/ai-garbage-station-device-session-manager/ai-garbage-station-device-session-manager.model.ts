import { LocalDevice } from 'src/app/network/model/html2tcp/local-device.model';

export class AIGarbageStationDeviceSessionModel {}

export class LocalDeviceSelection {
  datas: LocalDevice[] = [];
  selected?: LocalDevice;

  clear() {
    this.datas = [];
    this.selected = undefined;
  }
}
