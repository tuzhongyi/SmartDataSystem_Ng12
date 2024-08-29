import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { Language } from 'src/app/common/tools/language';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetGarbageStationAbnormalsListParams } from 'src/app/network/request/garbage-station/abnormal/garbage-station-abnormal-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { AuditGarbageStationDetailsTableConverter } from '../../audit-garbage-station-details-table/audit-garbage-station-details-table.converter';
import {
  AuditGarbageStationDetailsTableItem,
  IAuditGarbageStationDetailsTableBusiness,
} from '../../audit-garbage-station-details-table/audit-garbage-station-details-table.model';
import { AuditGarbageStationDetailsTableDownloadBusiness } from '../../audit-garbage-station-details-table/business/audit-garbage-station-details-table-download.business';
import { AuditGarbageStationAbnormalTableArgs } from '../audit-garbage-station-abnormal-table.model';
import { AuditGarbageStationAbnormalTableConfigBusiness } from './audit-garbage-station-abnormal-table-config.business';

@Injectable()
export class AuditGarbageStationAbnormalTableBusiness
  implements IAuditGarbageStationDetailsTableBusiness
{
  constructor(
    private service: GarbageStationRequestService,
    private converter: AuditGarbageStationDetailsTableConverter,
    public config: AuditGarbageStationAbnormalTableConfigBusiness,
    private _download: AuditGarbageStationDetailsTableDownloadBusiness
  ) {}
  async load(
    index: number,
    size: number,
    args: AuditGarbageStationAbnormalTableArgs
  ): Promise<PagedList<AuditGarbageStationDetailsTableItem>> {
    let config = await this.config.load(args);
    let datas = await this.getData(index, size, args);
    let models = datas.Data.map((x) => {
      return this.converter.convert(x, config);
    });
    let paged = new PagedList<AuditGarbageStationDetailsTableItem>();
    paged.Page = datas.Page;
    paged.Data = models;
    return paged;
  }
  private getData(
    index: number,
    size: number,
    args: AuditGarbageStationAbnormalTableArgs
  ): Promise<PagedList<GarbageStation>> {
    let params = new GetGarbageStationAbnormalsListParams();
    params.PageIndex = index;
    params.PageSize = size;
    params.DivisionId = args.divisionId;
    params.InHours = args.hour;
    params.AbnormalType = args.type;
    return this.service.abnormal.list(params);
  }

  private async all(
    args: AuditGarbageStationAbnormalTableArgs
  ): Promise<GarbageStation[]> {
    let datas: GarbageStation[] = [];
    let index = 1;
    let paged: PagedList<GarbageStation>;
    do {
      paged = await this.getData(index, 1000, args);
      datas = datas.concat(paged.Data);
      index++;
    } while (index <= paged.Page.PageCount);
    return datas;
  }

  async download(args: AuditGarbageStationAbnormalTableArgs) {
    let config = await this.config.load(args);
    let datas = await this.all(args);
    let models = datas.map((x) => {
      return this.converter.convert(x, config);
    });
    let title = `异常垃圾分类投放点列表 ${formatDate(
      new Date(),
      Language.yyyyMMddHHmmss,
      'en'
    )}`;
    this._download.download(title, models, config);
  }
}
