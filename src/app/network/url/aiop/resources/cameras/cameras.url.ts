import { ResourcesURL } from '../resources.url';

export abstract class ResourceAICamerasUrl extends ResourcesURL {
  protected static get basic() {
    return `${super.basic}/Cameras`;
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
  static AIModels(id: string) {
    return `${this.basic}/${id}/AIModels`;
  }
  static singleAIModel(cameraId: string, modelId: string) {
    return `${this.basic}/${cameraId}/AIModels/${modelId}`;
  }
  static copyTo(id: string) {
    return `${this.basic}/${id}/AIModels/CopyTo`;
  }
}
