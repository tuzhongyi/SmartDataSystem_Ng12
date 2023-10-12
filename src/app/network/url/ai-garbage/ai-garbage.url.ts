import { AbstractUrl } from '../abstract.url';
import { BaseUrl } from '../base.url';

class AIGarbageDevicesUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/GarbageDevices`);
  }
  excel() {
    return `${this.basic()}/Excels`;
  }
  command(command: string) {
    return `${this.basic()}/${command}/Commands`;
  }
  records = new AIGarbageDevicesRecordsUrl(this.basic());
}

class AIGarbageDevicesRecordsUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Records`);
  }

  commands = new AIGarbageDevicesRecordsCommandsUrl(this.basic());
  logs = new AIGarbageDevicesRecordsLogsUrl(this.basic());
  events = new AIGarbageDevicesRecordsEventsUrl(this.basic());
}

class AIGarbageDevicesRecordsCommandsUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Commands`);
  }
}
class AIGarbageDevicesRecordsLogsUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Logs`);
  }
}
class AIGarbageDevicesRecordsEventsUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Events`);
  }
}
class AIGarbageRfidUrl {
  constructor(private basic: string) {}
  private get base() {
    return `${this.basic}Rfid`;
  }
  cards = new AIGarbageRfidCardsUrl(this.base);
}
class AIGarbageRfidCardsUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Cards`);
  }
  records = new AIGarbageRfidCardsRecordsUrl(this.basic());
  excel() {
    return `${this.basic()}/Excels`;
  }
}
class AIGarbageRfidCardsRecordsUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Records`);
  }
}
class AIGarbageRegionsUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Regions`);
  }
  abbr() {
    return `${this.basic()}/AbbrList`;
  }
  excel() {
    return `${this.basic()}/Excels`;
  }

  garbagestations = new AIGarbageRegionsGarbageStationsUrl(this.basic());
}
class AIGarbageRegionsGarbageStationsUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/GarbageStations`);
  }
}
export class AIGarbageUrl {
  static garbageDevices = new AIGarbageDevicesUrl(BaseUrl.ai_garbage);
  static rfid = new AIGarbageRfidUrl(BaseUrl.ai_garbage);
  static regions = new AIGarbageRegionsUrl(BaseUrl.ai_garbage);
}
