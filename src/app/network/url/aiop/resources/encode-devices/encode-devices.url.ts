import { ResourcesURL } from "../resources.url";

export abstract class EncodeDevicesUrl extends ResourcesURL {
  protected static get basic() {
    return `${super.basic}/EncodeDevices`;
  }
  static create() {
    return this.basic;
  }
  static item(id: string) {
    return `${this.basic}/${id}`;
  }
  static list() {
    return `${this.basic}/List`;
  }
}