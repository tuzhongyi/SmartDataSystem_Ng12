import { BaseGarbageUrl } from '../base.url';
import { RelationInnerUrl } from './inner/relation.url';

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

  private static _relation?: RelationInnerUrl;
  public static get relation(): RelationInnerUrl {
    if (!this._relation) {
      this._relation = new RelationInnerUrl(this.basic());
    }
    return this._relation;
  }
}
