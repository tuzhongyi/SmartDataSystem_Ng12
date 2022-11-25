import { AICamera } from '../network/model/ai-camera.model';
import { EncodeDevice } from '../network/model/encode-device';

export class AICameraModel extends AICamera {
  EncodeDevice!: Promise<EncodeDevice>;
}
