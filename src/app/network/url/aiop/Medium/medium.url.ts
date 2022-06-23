import { BaseAiopUrl } from '../../base.url';
export abstract class MediumUrl {

  protected static get basic(): string {
    return `${BaseAiopUrl}/Medium`;

  }
}