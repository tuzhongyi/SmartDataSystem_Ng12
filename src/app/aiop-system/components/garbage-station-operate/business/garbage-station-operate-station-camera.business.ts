import { Injectable } from '@angular/core';
import {
  IBusiness,
  ICreate,
  IDelete,
} from 'src/app/common/interfaces/bussiness.interface';
import { Camera } from 'src/app/network/model/camera.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';

@Injectable()
export class GarbageStationOperateStationCameraBusiness
  implements IBusiness<Camera[]>, IDelete<Camera>, ICreate<Camera>
{
  constructor(private service: GarbageStationRequestService) {}
  create(camera: Camera): Promise<Camera> {
    return this.service.camera.create(camera);
  }
  delete(stationId: string, cameraId: string): Promise<Camera> {
    return this.service.camera.delete(stationId, cameraId);
  }

  async load(...args: any): Promise<Camera[]> {
    let data = await this.getData();
    return data;
  }
  async getData(...args: any): Promise<Camera[]> {
    let paged = await this.service.camera.list();
    return paged.Data;
  }
}
