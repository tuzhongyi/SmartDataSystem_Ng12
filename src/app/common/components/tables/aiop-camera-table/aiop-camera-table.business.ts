import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { AICameraConverter } from 'src/app/converter/ai-camera.converter';
import { AICamera } from 'src/app/network/model/garbage-station/ai-camera.model';
import { GetCamerasParams } from 'src/app/network/request/ai-camera/ai-camera.params';
import { AICameraModel } from 'src/app/view-model/ai-camera.model';
import { AiopCameraTableArgs } from './aiop-camera-table.model';
import { AiopCameraTableService } from './aiop-camera-table.service';

@Injectable()
export class AiopCameraTableBusiness
  implements IBusiness<AICamera[], AICameraModel[]>
{
  constructor(
    private service: AiopCameraTableService,
    private converter: AICameraConverter
  ) {}

  async load(args: AiopCameraTableArgs) {
    let data = await this.getData(args);
    let devices = await this.service.device.all();
    let model = data.map((x) => {
      return this.converter.Convert(x, devices);
    });
    return model;
  }

  async getData(args: AiopCameraTableArgs): Promise<AICamera[]> {
    let params = new GetCamerasParams();
    params.Name = args.name;
    return this.service.camera.all(params);
  }
}
