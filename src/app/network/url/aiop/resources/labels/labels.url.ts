import { ResourcesURL } from '../resources.url';

export abstract class ResourceLabelsUrl extends ResourcesURL {
  public static base(resourceId?: string) {
    let label = 'Labels';
    if (resourceId) {
      return `${super.item(resourceId)}/${label}`;
    } else {
      return `${super.basic}/${label}`;
    }
  }
  static item(id: string, resourceId?: string) {
    return `${this.base(resourceId)}/${id}`;
  }
  static list() {
    return `${this.base()}/List`;
  }
  static batch(id: string) {
    return `${this.base()}/${id}/Batch`;
  }
}
