/*
 * @Author: pmx 
 * @Date: 2022-11-03 14:46:13 
 * @Last Modified by:   pmx 
 * @Last Modified time: 2022-11-03 14:46:13 
 */
import { BaseGarbageVehicleUrl, InnerUrl } from '../base.url';

export abstract class GarbageVehicleUrl {
  static basic() {
    return `${BaseGarbageVehicleUrl}/GarbageVehicles`;
  }
  static item(id: string) {
    return `${this.basic()}/${id}`;
  }
  static list() {
    return `${this.basic()}/List`;
  }
  static excles() {
    return `${this.basic()}/Excels`;
  }
  static camera(id?: string) {
    let base: string = id ? this.item(id) : this.basic();
    return new CameraUrl(base);
  }
  static get route() {
    return new RouteUrl(this.basic());
  }

  static relay(id: string) {
    return new RelayUrl(this.item(id));
  }
}

class CameraUrl implements InnerUrl {
  constructor(private base: string) {}

  basic(): string {
    return `${this.base}/Cameras`;
  }
  item(id: string) {
    return `${this.basic()}/${id}`;
  }
  list() {
    return `${this.basic()}/List`;
  }
  excles() {
    return `${this.basic()}/Excels`;
  }
}
class RouteUrl implements InnerUrl {
  constructor(private base: string) {}

  basic() {
    return `${this.base}/Routes`;
  }

  list() {
    return `${this.basic()}/List`;
  }
}

class RelayUrl implements InnerUrl {
  constructor(private base: string) {}

  basic() {
    return `${this.base}/Relays`;
  }

  reset() {
    return `${this.basic()}/Reset`;
  }
}
