import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { LocaleCompare } from 'src/app/common/tools/locale-compare';
import { AICameraConverter } from 'src/app/converter/ai-camera.converter';
import { GarbageVehicleCameraConverter } from 'src/app/converter/garbage-vehicle-camera.converter';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { AICamera } from 'src/app/network/model/ai-camera.model';
import { VehicleCamera } from 'src/app/network/model/vehicle-camera.model';
import { GetCamerasParams } from 'src/app/network/request/ai-camera/ai-camera.params';
import { AICameraRequestService } from 'src/app/network/request/ai-camera/ai-camera.service';

@Injectable()
export class GarbageVehicleCameraTableBusiness
  implements IBusiness<AICamera[], VehicleCamera[]>
{
  constructor(
    private service: AICameraRequestService,
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
    let params = new GetCamerasParams();
    params.Name = condition;
    let paged = await this.service.list(params);
    return paged.Data;
  }
}
