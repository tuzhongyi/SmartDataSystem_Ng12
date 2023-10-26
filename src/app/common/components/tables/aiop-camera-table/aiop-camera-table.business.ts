import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { AICameraConverter } from 'src/app/converter/ai-camera.converter';
import { AICamera } from 'src/app/network/model/garbage-station/ai-camera.model';
import { GetCamerasParams } from 'src/app/network/request/ai-camera/ai-camera.params';
import { AICameraRequestService } from 'src/app/network/request/ai-camera/ai-camera.service';
import { AICameraModel } from 'src/app/view-model/ai-camera.model';

@Injectable()
export class AiopCameraTableBusiness
  implements IBusiness<AICamera[], AICameraModel[]>
{
  constructor(
    private service: AICameraRequestService,
    private converter: AICameraConverter
  ) {}

  async load(condition?: string) {
    let data = await this.getData(condition);
    let model = data.map((x) => {
      return this.converter.Convert(x);
    });
    return model;
  }

  async getData(condition?: string): Promise<AICamera[]> {
    let params = new GetCamerasParams();
    params.Name = condition;
    let paged = await this.service.list(params);
    return paged.Data;
  }
}
