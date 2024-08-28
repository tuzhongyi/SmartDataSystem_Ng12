import { Injectable } from '@angular/core';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetGarbageStationCamerasParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { AuditCameraDetailsTableConverter } from '../audit-camera-details-table.converter';
import {
  AuditCameraDetailsTableArgs,
  AuditCameraDetailsTableConfig,
  AuditCameraDetailsTableItem,
  IAuditCameraDetailsTableBusiness,
} from '../audit-camera-details-table.model';
import { AuditCameraDetailsTableConfigBusiness } from './audit-camera-details-table-config.business';

@Injectable()
export class AuditCameraDetailsTableBusiness
  implements IAuditCameraDetailsTableBusiness
{
  constructor(
    private service: GarbageStationRequestService,
    private converter: AuditCameraDetailsTableConverter,
    public config: AuditCameraDetailsTableConfigBusiness
  ) {}

  async load(
    index: number,
    size: number,
    args: AuditCameraDetailsTableArgs,
    config: AuditCameraDetailsTableConfig
  ) {
    let datas = await this.getData(index, size, args);
    let models = datas.Data.map((x) => {
      return this.converter.convert(x, config);
    });
    let paged = new PagedList<AuditCameraDetailsTableItem>();
    paged.Page = datas.Page;
    paged.Data = models;
    return paged;
  }

  getData(index: number, size: number, args: AuditCameraDetailsTableArgs) {
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
}
