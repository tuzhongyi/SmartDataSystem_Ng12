import { BaseGarbageUrl } from '../base.url';
import { RelationUrl } from './inner/relation.url';

export class MemberUrl {
  static basic() {
    return `${BaseGarbageUrl}/Members`;
  }
  static item(id: string) {
    return `${this.basic()}/${id}`;
  }
  static list() {
    return `${this.basic()}/List`;
  }
  static excels() {
    return `${this.basic()}/Excels`;
  }

  private static _relation?: RelationUrl;
  public static get relation(): RelationUrl {
    if (!this._relation) {
      this._relation = new RelationUrl(this.basic());
    }
    return this._relation;
  }
}
