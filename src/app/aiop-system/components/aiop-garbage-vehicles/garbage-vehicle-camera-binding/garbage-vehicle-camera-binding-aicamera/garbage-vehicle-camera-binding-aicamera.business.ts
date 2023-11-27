import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { LocaleCompare } from 'src/app/common/tools/locale-compare';
import { AICamera } from 'src/app/network/model/garbage-station/ai-camera.model';
import { GetResourceCamerasParams } from 'src/app/network/request/resources/camera/resource-camera.params';
import { ResourceRequestService } from 'src/app/network/request/resources/resource.service';

@Injectable()
export class GarbageVehicleCameraBindingAICameraBusiness
  implements IBusiness<AICamera[]>
{
  constructor(private service: ResourceRequestService) {}

  async load(condition?: string) {
    let data = await this.getData(condition);
    data = data.sort((a, b) => {
      return LocaleCompare.compare(b.Name, a.Name);
    });
    return data;
  }

  async getData(condition?: string): Promise<AICamera[]> {
    let params = new GetResourceCamerasParams();
    params.Name = condition;
    let paged = await this.service.camera.list(params);
    return paged.Data;
  }
}
