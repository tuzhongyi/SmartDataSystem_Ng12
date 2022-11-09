import { AbstractUrl } from '../abstract.url';
import { BasicUrl } from '../base.url';

export abstract class GarbageVehicleEventUrl {
  static basic() {
    return `${BasicUrl.garbage.vehicle}/Events`;
  }
  static get info() {
    return new InfoUrl(this.basic());
  }
  static get record() {
    return new RecordUrl(this.basic());
  }
}

class InfoUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Infos`);
  }
}

class RecordUrl extends AbstractUrl {
  garbageCollection = new GarbageCollectionUrl(this.basic());
  relayStateChange = new RelayStateChangeUrl(this.basic());
  vehicleOnline = new VehicleOnlineUrl(this.basic());
  cameraOnline = new CameraOnlineUrl(this.basic());

  constructor(base: string) {
    super(`${base}/Records`);
  }
}

class GarbageCollectionUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/GarbageCollection`);
  }
}

class RelayStateChangeUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/RelayStateChange`);
  }
}

class VehicleOnlineUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/VehicleOnline`);
  }
}

class CameraOnlineUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/CameraOnline`);
  }
}
