import { AICamera } from '../network/model/garbage-station/ai-camera.model';
import { EncodeDevice } from '../network/model/garbage-station/encode-device';

export class AICameraModel extends AICamera {
  EncodeDevice!: Promise<EncodeDevice>;
}
