import { Injectable } from '@angular/core';
import { CameraAIModel } from 'src/app/network/model/garbage-station/camera-ai.model';
import { AIModelRequestService } from 'src/app/network/request/ai-model/ai-model.service';

@Injectable()
export class AIModelDetailsBusiness {
  constructor(private service: AIModelRequestService) {}
  get(id: string) {
    return this.service.get(id);
  }
  parse(text: string) {
    let data = base64encode(text);
    return this.service.parse(data);
  }
  update(model: CameraAIModel) {
    return this.service.update(model);
  }
  create(model: CameraAIModel) {
    return this.service.create(model);
  }

  download(name: string, data: string) {
    let res = base64decode(data);
    let blob = new Blob([res]);
    const a = document.createElement('a');
    let url = URL.createObjectURL(blob);
    a.href = url;
    a.download = `${name}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
}
