import { AbstractUrl } from '../../../abstract.url';
import { ResourceCamerasAICountUrl } from './aicount/resource-camera-aicount.url';
import { ResourceCamerasAIModelsUrl } from './aimodel/resource-camera-aimodel.url';

export class ResourceAICamerasUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Cameras`);
  }

  aiModel(id: string) {
    return new ResourceCamerasAIModelsUrl(this.item(id));
  }
  aiCount() {
    return new ResourceCamerasAICountUrl(this.basic());
  }
}
