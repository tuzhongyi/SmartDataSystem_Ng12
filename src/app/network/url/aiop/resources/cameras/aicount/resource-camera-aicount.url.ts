import { AbstractUrl } from '../../../../abstract.url';

export class ResourceCamerasAICountUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/AICounts`);
  }
}
