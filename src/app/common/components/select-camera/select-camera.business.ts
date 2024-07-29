import { Injectable } from '@angular/core';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { SelectCameraArgs } from './select-camera.model';

@Injectable()
export class SelectCameraBusiness {
  constructor(private service: GarbageStationRequestService) {}

  async load(args: SelectCameraArgs) {
    let datas = await this.loadData(args);
    return datas.sort((a, b) => {
      return a.Name.localeCompare(b.Name);
    });
  }

  async loadData(args: SelectCameraArgs) {
    let params = new GetGarbageStationsParams();
    params.DivisionId = args.divisionId;
    let stations = await this.service.all(params);
    let cameras = [];
    for (let i = 0; i < stations.length; i++) {
      const item = stations[i];
      if (!item.Cameras) continue;
      if (args.stationId) {
        if (item.Id == args.stationId) {
          cameras.push(...item.Cameras);
        }
      } else {
        cameras.push(...item.Cameras);
      }
    }
    return cameras;
  }
}
