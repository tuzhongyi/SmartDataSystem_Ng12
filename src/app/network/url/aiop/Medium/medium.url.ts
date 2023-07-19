import { BaseUrl } from '../../base.url';

export abstract class MediumUrl {
  protected static get basic(): string {
    return `${BaseUrl.aiop_service}/Medium`;
  }
}
