import { Method } from 'axios';
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

export class CustomPropertyArgs {
  method: Method = 'GET';
  url: string = '';
  body: string = '';
  type = 'text/json';
}
