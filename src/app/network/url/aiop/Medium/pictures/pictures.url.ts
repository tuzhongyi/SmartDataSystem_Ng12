import { MediumUrl } from "../medium.url";

export abstract class PicturesUrl extends MediumUrl {

  protected static get basic(): string {
    return `${super.basic}/Pictures`;

  }
  static create() {
    return this.basic;
  }

  static item(id: string) {
    return `${this.basic}/${id}`;
  }
  static binary() {
    return `${this.basic}/Binary`;
  }
  static fromFile() {
    return `${this.basic}/FromFile`;
  }
  static data(id: string) {
    return `${this.basic}/${id}/Data`;
  }
  static jpg(id: string) {
    return `${this.basic}/${id}/.jpg`;
  }

}