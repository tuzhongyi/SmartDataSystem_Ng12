import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { Language } from 'src/app/common/tools/language';
import { PagedList } from 'src/app/network/model/page_list.model';
import { AuditCameraDetailsTableConverter } from '../audit-camera-details-table.converter';
import {
  AuditCameraDetailsTableArgs,
  AuditCameraDetailsTableConfig,
  AuditCameraDetailsTableItem,
  IAuditCameraDetailsTableBusiness,
} from '../audit-camera-details-table.model';
import { AuditCameraDetailsTableCameraBusiness } from './audit-camera-details-table-camera.business';
import { AuditCameraDetailsTableConfigBusiness } from './audit-camera-details-table-config.business';
import { AuditCameraDetailsTableDownloadBusiness } from './audit-camera-details-table-download.business';

@Injectable()
export class AuditCameraDetailsTableBusiness
  implements IAuditCameraDetailsTableBusiness
{
  constructor(
    private converter: AuditCameraDetailsTableConverter,
    public config: AuditCameraDetailsTableConfigBusiness,
    camera: AuditCameraDetailsTableCameraBusiness,
    download: AuditCameraDetailsTableDownloadBusiness
  ) {
    this.service = {
      camera,
      download,
    };
  }

  service: {
    camera: AuditCameraDetailsTableCameraBusiness;
    download: AuditCameraDetailsTableDownloadBusiness;
  };

  async load(
    index: number,
    size: number,
    args: AuditCameraDetailsTableArgs,
    config: AuditCameraDetailsTableConfig
  ) {
    let datas = await this.service.camera.load(index, size, args);
    let models = datas.Data.map((x) => {
      return this.converter.convert(x, config);
    });
    let paged = new PagedList<AuditCameraDetailsTableItem>();
    paged.Page = datas.Page;
    paged.Data = models;
    return paged;
  }

  async download(
    args: AuditCameraDetailsTableArgs,
    config: AuditCameraDetailsTableConfig
  ) {
    let datas = await this.service.camera.all(args);
    let models = datas.map((x) => {
      return this.converter.convert(x, config);
    });
    let title = `摄像机列表 ${formatDate(
      new Date(),
      Language.yyyyMMddHHmmss,
      'en'
    )}`;
    this.service.download.download(title, models, config);
  }
}
