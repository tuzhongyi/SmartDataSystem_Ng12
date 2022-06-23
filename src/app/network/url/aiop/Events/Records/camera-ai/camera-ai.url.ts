import { RecordsUrl } from "../records.url";

export abstract class CameraAIUrl extends RecordsUrl {
  protected static get basic(): string {
    return `${super.basic}/CameraAI`;

  }
  static list() {
    return `${this.basic}/List`
  }
  static create() {
    return this.basic;
  }
}