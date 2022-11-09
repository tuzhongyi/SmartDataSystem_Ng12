import { BasicUrl } from '../../base.url';

export abstract class MediumUrl {
  protected static get basic(): string {
    return `${BasicUrl.aiop}/Medium`;
  }
}
