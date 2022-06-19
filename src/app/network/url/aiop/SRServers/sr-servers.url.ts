import { BaseAiopUrl } from "../../base.url";

export abstract class SRServersURL {
  static get basic(): string {
    return `${BaseAiopUrl}/SRServers`;
  }
  static item(id: string) {
    return `${this.basic}/${id}`;
  }
  static list() {
    return `${this.basic}`;
  }
  static sync(id: string): string {
    return `${this.basic}/${id}/Sync`;
  }
}