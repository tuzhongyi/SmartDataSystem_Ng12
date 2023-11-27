import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { AICamera } from 'src/app/network/model/garbage-station/ai-camera.model';
import { GetResourceCamerasParams } from 'src/app/network/request/resources/camera/resource-camera.params';
import { ResourceRequestService } from 'src/app/network/request/resources/resource.service';

@Injectable()
export class GarbageStationOperateAICameraBusiness
  implements IBusiness<AICamera[]>
{
  constructor(private service: ResourceRequestService) {}

  load(condition?: string) {
    let data = this.getData(condition);
    return data;
  }

  async getData(condition?: string): Promise<AICamera[]> {
    let params = new GetResourceCamerasParams();
    params.Name = condition;
    let paged = await this.service.camera.list(params);
    return paged.Data;
  }
}
