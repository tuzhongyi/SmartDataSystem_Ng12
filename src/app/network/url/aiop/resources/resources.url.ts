import { BaseAiopUrl } from '../../base.url';

export abstract class ResourcesURL {
  protected static get basic(): string {
    return `${BaseAiopUrl}/Resources`;
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
  static labels(id: string) {
    return `${this.basic}/${id}/Labels`
  }
  static singleLabel(resourceId: string, labelId: string) {
    return `${this.basic}/${resourceId}/Labels/${labelId}`
  }
}
