import { IInnerUrl } from "../../base.url";

export class RelationUrl implements IInnerUrl {
  constructor(private base: string) {}
  basic() {
    return `${this.base}/Members`;
  }
  sync() {
    return `${this.basic()}/Sync`;
  }
}
