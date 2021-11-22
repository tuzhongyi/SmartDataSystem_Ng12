import { InnerUrl } from "../../base.url";

export class RelationInnerUrl implements InnerUrl {
  constructor(private base: string) {}
  basic() {
    return `${this.base}/Members`;
  }
  sync() {
    return `${this.basic()}/Sync`;
  }
}
