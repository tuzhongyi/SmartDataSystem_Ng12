import { Injectable } from '@angular/core';
import { Camera } from 'src/app/network/model/garbage-station/camera.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetCameraAbnormalsListParams } from 'src/app/network/request/garbage-station/camera/garbage-station-camera-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { AuditCameraDetailsTableConverter } from '../../audit-camera-details-table/audit-camera-details-table.converter';
import {
  AuditCameraDetailsTableItem,
  IAuditCameraDetailsTableBusiness,
} from '../../audit-camera-details-table/audit-camera-details-table.model';
import { AuditCameraAbnormalTableArgs } from '../audit-camera-abnormal-table.model';
import { AuditCameraAbnormalTableConfigBusiness } from './audit-camera-abnormal-table-config.business';

@Injectable()
export class AuditCameraAbnormalTableBusiness
  implements IAuditCameraDetailsTableBusiness
{
  constructor(
    private service: GarbageStationRequestService,
    private converter: AuditCameraDetailsTableConverter,
    public config: AuditCameraAbnormalTableConfigBusiness
  ) {}
  async load(
    index: number,
    size: number,
    args: AuditCameraAbnormalTableArgs
  ): Promise<PagedList<AuditCameraDetailsTableItem>> {
    let config = await this.config.load(args);
    let datas = await this.getData(index, size, args);
    let models = datas.Data.map((x) => {
      return this.converter.convert(x, config);
    });
    let paged = new PagedList<AuditCameraDetailsTableItem>();
    paged.Page = datas.Page;
    paged.Data = models;
    return paged;
  }
  getData(
    index: number,
    size: number,
    args: AuditCameraAbnormalTableArgs
  ): Promise<PagedList<Camera>> {
    let params = new GetCameraAbnormalsListParams();
    params.PageIndex = index;
    params.PageSize = size;
    params.DivisionId = args.divisionId;
    params.InHours = args.hour;
    params.AbnormalType = args.type;
    return this.service.camera.abnormal.list(params);
  }
}
