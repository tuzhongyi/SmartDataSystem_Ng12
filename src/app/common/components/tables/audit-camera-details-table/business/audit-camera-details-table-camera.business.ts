import { Injectable } from '@angular/core';
import { Camera } from 'src/app/network/model/garbage-station/camera.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetGarbageStationCamerasParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { AuditCameraDetailsTableArgs } from '../audit-camera-details-table.model';

@Injectable()
export class AuditCameraDetailsTableCameraBusiness {
  constructor(private service: GarbageStationRequestService) {}
  load(index: number, size: number, args: AuditCameraDetailsTableArgs) {
    let params = new GetGarbageStationCamerasParams();
    params.PageIndex = index;
    params.PageSize = size;
    params.Name = args.name;
    if (args.divisionId) {
      params.DivisionIds = [args.divisionId];
    }
    params.CameraUsage = args.usage;
    params.CameraType = args.type;
    params.Classification = args.classification;
    params.OnlineStatus = args.status.OnlineStatus;
    params.SceneChange = args.status.SceneChange;
    params.ImageQuality = args.status.ImageQuality;
    params.Brightness = args.status.Brightness;
    params.Aberration = args.status.Aberration;
    params.Disturbance = args.status.Disturbance;
    params.RecordState = args.status.RecordState;

    return this.service.camera.list(params);
  }

  async all(args: AuditCameraDetailsTableArgs) {
    let datas: Camera[] = [];
    let index = 1;
    let paged: PagedList<Camera>;
    do {
      paged = await this.load(index, 1000, args);
      datas = datas.concat(paged.Data);
      index++;
    } while (index <= paged.Page.PageCount);
    return datas;
  }
}
