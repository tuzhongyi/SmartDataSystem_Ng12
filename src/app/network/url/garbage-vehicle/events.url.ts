/*
 * @Author: pmx
 * @Date: 2022-11-03 14:46:16
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-06 14:56:39
 */
import { BaseGarbageVehicleUrl, InnerUrl } from '../base.url';

export abstract class GarbageVehicleEventUrl {
  static basic() {
    return `${BaseGarbageVehicleUrl}/Events `;
  }
  static get info() {
    return new InfoUrl(this.basic());
  }
  static get record() {
    return new RecordUrl(this.basic());
  }
}

class InfoUrl implements InnerUrl {
  constructor(private base: string) { }

  basic(): string {
    return `${this.base}/Infos`;
  }
  list() {
    return `${this.basic()}/List`;
  }
  item(id: string | number) {
    return `${this.basic()}/${id}`;
  }
}

class RecordUrl implements InnerUrl {
  garbageCollection = new GarbageCollectionUrl(this.basic());
  relayStateChange = new RelayStateChangeUrl(this.basic());
  vehicleOnline = new VehicleOnlineUrl(this.basic());
  cameraOnline = new CameraOnlineUrl(this.basic());

  constructor(private base: string) { }

  basic(): string {
    return `${this.base}/Records`;
  }
}

class GarbageCollectionUrl implements InnerUrl {
  constructor(private base: string) { }

  basic(): string {
    return `${this.base}/GarbageCollection`;
  }
  list() {
    return `${this.basic()}/List`;
  }
  item(id: string) {
    return `${this.basic()}/${id}`;
  }
}

class RelayStateChangeUrl implements InnerUrl {
  constructor(private base: string) { }

  basic(): string {
    return `${this.base}/RelayStateChange`;
  }
  list() {
    return `${this.basic()}/List`;
  }
  item(id: string) {
    return `${this.basic()}/${id}`;
  }
}

class VehicleOnlineUrl implements InnerUrl {
  constructor(private base: string) { }

  basic(): string {
    return `${this.base}/VehicleOnline`;
  }
  list() {
    return `${this.basic()}/List`;
  }
  item(id: string) {
    return `${this.basic()}/${id}`;
  }
}

class CameraOnlineUrl implements InnerUrl {
  constructor(private base: string) { }

  basic(): string {
    return `${this.base}/CameraOnline`;
  }
  list() {
    return `${this.basic()}/List`;
  }
  item(id: string) {
    return `${this.basic()}/${id}`;
  }
}
