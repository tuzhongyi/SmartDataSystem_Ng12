import { AbstractUrl } from 'src/app/network/url/abstract.url';

export class ResourceCamerasAIModelsUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/AIModels`);
  }

  copyTo() {
    return `${this.basic()}/CopyTo`;
  }
}
