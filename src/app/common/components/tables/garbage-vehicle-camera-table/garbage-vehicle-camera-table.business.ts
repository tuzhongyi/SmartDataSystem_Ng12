import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { LocaleCompare } from 'src/app/common/tools/locale-compare';
import { GarbageVehicleCameraConverter } from 'src/app/converter/garbage-vehicle-camera.converter';
import { AICamera } from 'src/app/network/model/garbage-station/ai-camera.model';
import { VehicleCamera } from 'src/app/network/model/garbage-station/vehicle-camera.model';
import { GetResourceCamerasParams } from 'src/app/network/request/resources/camera/resource-camera.params';
import { ResourceRequestService } from 'src/app/network/request/resources/resource.service';

@Injectable()
export class GarbageVehicleCameraTableBusiness
  implements IBusiness<AICamera[], VehicleCamera[]>
{
  constructor(
    private service: ResourceRequestService,
    private converter: GarbageVehicleCameraConverter
  ) {}

  async load(vehicleId: string, condition?: string) {
    let data = await this.getData(condition);
    let model = data.map((x) => {
      return this.converter.Convert(x, vehicleId);
    });
    model.sort((a, b) => {
      if (a.OnlineStatus != undefined && b.OnlineStatus != undefined) {
        return a.OnlineStatus - b.OnlineStatus;
      }
      return LocaleCompare.compare(a.Name, b.Name);
    });
    return model;
  }

  async getData(condition?: string): Promise<AICamera[]> {
    let params = new GetResourceCamerasParams();
    params.Name = condition;
    let paged = await this.service.camera.list(params);
    return paged.Data;
  }
}
