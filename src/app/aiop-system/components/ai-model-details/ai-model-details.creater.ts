import { Guid } from 'src/app/common/tools/guid';
import { CameraAIModel } from 'src/app/network/model/garbage-station/camera-ai.model';

export class AIModelDetailsCreater {
  static CameraAIModel() {
    let data = new CameraAIModel();
    data.Id = Guid.NewGuid().ToString('N');
    data.Label = 7;
    return data;
  }
}
