import { ResourcesURL } from "../resources.url";

export abstract class LabelsUrl extends ResourcesURL {
  protected static get basic() {
    return `${super.basic}/Labels`;
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