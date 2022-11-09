import { BasicUrl } from '../../base.url';

export abstract class AIModelsUrl {
  protected static get basic() {
    return `${BasicUrl.aiop}/AIModels`;
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
  static parse() {
    return `${this.basic}/Parse`;
  }
}
