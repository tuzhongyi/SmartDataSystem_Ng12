import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { Language } from 'src/app/common/tools/language';
import { Camera } from 'src/app/network/model/garbage-station/camera.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetCameraAbnormalsListParams } from 'src/app/network/request/garbage-station/camera/garbage-station-camera-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { AuditCameraDetailsTableConverter } from '../../audit-camera-details-table/audit-camera-details-table.converter';
import {
  AuditCameraDetailsTableItem,
  IAuditCameraDetailsTableArgs,
  IAuditCameraDetailsTableBusiness,
} from '../../audit-camera-details-table/audit-camera-details-table.model';
import { AuditCameraDetailsTableDownloadBusiness } from '../../audit-camera-details-table/business/audit-camera-details-table-download.business';
import { AuditCameraAbnormalTableArgs } from '../audit-camera-abnormal-table.model';
import { AuditCameraAbnormalTableConfigBusiness } from './audit-camera-abnormal-table-config.business';

@Injectable()
export class AuditCameraAbnormalTableBusiness
  implements IAuditCameraDetailsTableBusiness
{
  constructor(
    private service: GarbageStationRequestService,
    private converter: AuditCameraDetailsTableConverter,
    public config: AuditCameraAbnormalTableConfigBusiness,
    private _download: AuditCameraDetailsTableDownloadBusiness
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
  private getData(
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

  async all(args: AuditCameraAbnormalTableArgs) {
    let datas: Camera[] = [];
    let index = 1;
    let paged: PagedList<Camera>;
    do {
      paged = await this.getData(index, 1000, args);
      datas = datas.concat(paged.Data);
      index++;
    } while (index <= paged.Page.PageCount);
    return datas;
  }

  async download(args: IAuditCameraDetailsTableArgs) {
    let config = await this.config.load(args);
    let datas = await this.all(args);
    let models = datas.map((x) => {
      return this.converter.convert(x, config);
    });

    let title = `异常摄像机列表 ${formatDate(
      new Date(),
      Language.yyyyMMddHHmmss,
      'en'
    )}`;
    this._download.download(title, models, config);
  }
}
