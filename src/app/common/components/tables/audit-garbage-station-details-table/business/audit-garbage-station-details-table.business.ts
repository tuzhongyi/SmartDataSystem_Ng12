import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { Language } from 'src/app/common/tools/language';
import { PagedList } from 'src/app/network/model/page_list.model';
import { AuditGarbageStationDetailsTableConverter } from '../audit-garbage-station-details-table.converter';
import {
  AuditGarbageStationDetailsTableArgs,
  AuditGarbageStationDetailsTableConfig,
  AuditGarbageStationDetailsTableItem,
  IAuditGarbageStationDetailsTableBusiness,
} from '../audit-garbage-station-details-table.model';
import { AuditGarbageStationDetailsTableConfigBusiness } from './audit-garbage-station-details-table-config.business';
import { AuditGarbageStationDetailsTableDownloadBusiness } from './audit-garbage-station-details-table-download.business';
import { AuditGarbageStationDetailsTableStationBusiness } from './audit-garbage-station-details-table-station.business';

@Injectable()
export class AuditGarbageStationDetailsTableBusiness
  implements IAuditGarbageStationDetailsTableBusiness
{
  constructor(
    private converter: AuditGarbageStationDetailsTableConverter,
    public config: AuditGarbageStationDetailsTableConfigBusiness,
    download: AuditGarbageStationDetailsTableDownloadBusiness,
    station: AuditGarbageStationDetailsTableStationBusiness
  ) {
    this.service = {
      station,
      download,
    };
  }
  service: {
    station: AuditGarbageStationDetailsTableStationBusiness;
    download: AuditGarbageStationDetailsTableDownloadBusiness;
  };

  async load(
    index: number,
    size: number,
    args: AuditGarbageStationDetailsTableArgs,
    config: AuditGarbageStationDetailsTableConfig
  ) {
    let datas = await this.service.station.load(index, size, args);
    let models = datas.Data.map((x) => {
      return this.converter.convert(x, config);
    });
    let paged = new PagedList<AuditGarbageStationDetailsTableItem>();
    paged.Page = datas.Page;
    paged.Data = models;
    return paged;
  }

  async download(
    args: AuditGarbageStationDetailsTableArgs,
    config: AuditGarbageStationDetailsTableConfig
  ) {
    let datas = await this.service.station.all(args);
    let models = datas.map((x) => {
      return this.converter.convert(x, config);
    });
    let title = `垃圾分类投放点列表 ${formatDate(
      new Date(),
      Language.yyyyMMddHHmmss,
      'en'
    )}`;
    this.service.download.download(title, models, config);
  }
}
