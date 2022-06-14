import { BaseAiopUrl } from '../../base.url';
import { PictureInnerUrl } from './picture.url';

export abstract class MediumUrl {
  static basic() {
    return `${BaseAiopUrl}/Medium`;
  }

  private static _picture?: PictureInnerUrl;
  public static get picture(): PictureInnerUrl {
    if (!this._picture) {
      this._picture = new PictureInnerUrl(this.basic());
    }
    return this._picture;
  }
}
