import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { AICamera } from 'src/app/network/model/ai-camera.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetCamerasParams } from 'src/app/network/request/ai-camera/ai-camera.params';
import { AICameraRequestService } from 'src/app/network/request/ai-camera/ai-camera.service';

@Injectable()
export class GarbageVehicleOperateAICameraBusiness
  implements IBusiness<AICamera[]>
{
  constructor(private service: AICameraRequestService) {}

  load(condition?: string) {
    let data = this.getData(condition);
    return data;
  }

  async getData(condition?: string): Promise<AICamera[]> {
    let params = new GetCamerasParams();
    params.Name = condition;
    let paged = await this.service.list(params);
    return paged.Data;
  }
}
