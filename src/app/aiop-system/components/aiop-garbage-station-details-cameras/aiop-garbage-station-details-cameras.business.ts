import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { AICameraConverter } from 'src/app/converter/ai-camera.converter';
import { AICamera } from 'src/app/network/model/garbage-station/ai-camera.model';
import { Camera } from 'src/app/network/model/garbage-station/camera.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { GetResourceCamerasParams } from 'src/app/network/request/resources/camera/resource-camera.params';
import { AICameraModel } from 'src/app/view-model/ai-camera.model';
import { AIOPGarbageStationDetailsCamerasService } from './aiop-garbage-station-details-cameras.service';

@Injectable()
export class AIOPGarbageStationDetailsCamerasBusiness
  implements IBusiness<AICamera[], AICameraModel[]>
{
  constructor(
    private service: AIOPGarbageStationDetailsCamerasService,
    private aiConverter: AICameraConverter
  ) {}
  async load(ids?: string[]): Promise<AICameraModel[]> {
    let datas = await this.getData(ids);
    let model = datas.map((x) => this.aiConverter.Convert(x));
    return model;
  }
  async getData(ids?: string[]): Promise<AICamera[]> {
    let params = new GetResourceCamerasParams();
    params.ResourceIds = ids;
    let paged = await this.service.resource.camera.list(params);
    return paged.Data;
  }

  private createAICamera(stationId: string, ai: AICamera) {
    return new Promise<Camera>((resolve) => {
      this.service.station.camera
        .get(stationId, ai.Id)
        .then((camera) => {
          resolve(camera);
        })
        .catch((error) => {
          let camera = new Camera();
          camera.Id = ai.Id;
          camera.Name = ai.Name;
          camera.GarbageStationId = stationId;
          camera.UpdateTime = new Date();
          camera.CreateTime = new Date();
          this.service.station.camera.create(camera).then((x) => {
            resolve(x);
          });
        });
    });
  }

  private real(station: GarbageStation, ais: AICamera[]) {
    let real = [];
    if (station.Cameras) {
      for (let i = 0; i < ais.length; i++) {
        const camera = ais[i];
        let index = station.Cameras.findIndex((x) => x.Id === camera.Id);
        if (index >= 0) {
          continue;
        }
        real.push(camera);
      }
    }
    return real;
  }

  async create(station: GarbageStation, ai: AICamera[]) {
    let real = this.real(station, ai);
    if (real.length > 0) {
      let all = real.map((x) => this.createAICamera(station.Id, x));
      return Promise.all(all).then((cameras) => {
        if (!station.Cameras) {
          station.Cameras = [];
        }
        station.Cameras = station.Cameras.concat(cameras);
        return station;
      });
    }
    return station;
  }
  async remove(station: GarbageStation, cameraIds: string[]) {
    if (!station.Cameras) {
      return station;
    }
    for (let i = 0; i < cameraIds.length; i++) {
      const id = cameraIds[i];
      let index = station.Cameras.findIndex((x) => x.Id === id);
      if (index < 0) {
        continue;
      }
      station.Cameras.splice(index, 1);
    }
    return station;
  }
}
