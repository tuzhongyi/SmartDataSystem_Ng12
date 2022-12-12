import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { LocaleCompare } from 'src/app/common/tools/locale-compare';
import { AICamera } from 'src/app/network/model/ai-camera.model';
import { GetCamerasParams } from 'src/app/network/request/ai-camera/ai-camera.params';
import { AICameraRequestService } from 'src/app/network/request/ai-camera/ai-camera.service';

@Injectable()
export class GarbageVehicleCameraBindingAICameraBusiness
  implements IBusiness<AICamera[]>
{
  constructor(private service: AICameraRequestService) {}

  async load(condition?: string) {
    let data = await this.getData(condition);
    data = data.sort((a, b) => {
      return LocaleCompare.compare(b.Name, a.Name);
    });
    return data;
  }

  async getData(condition?: string): Promise<AICamera[]> {
    let params = new GetCamerasParams();
    params.Name = condition;
    let paged = await this.service.list(params);
    return paged.Data;
  }
}
