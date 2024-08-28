import { Injectable } from '@angular/core';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetGarbageStationAbnormalsListParams } from 'src/app/network/request/garbage-station/abnormal/garbage-station-abnormal-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { AuditGarbageStationDetailsTableConverter } from '../../audit-garbage-station-details-table/audit-garbage-station-details-table.converter';
import {
  AuditGarbageStationDetailsTableItem,
  IAuditGarbageStationDetailsTableBusiness,
} from '../../audit-garbage-station-details-table/audit-garbage-station-details-table.model';
import { AuditGarbageStationAbnormalTableArgs } from '../audit-garbage-station-abnormal-table.model';
import { AuditGarbageStationAbnormalTableConfigBusiness } from './audit-garbage-station-abnormal-table-config.business';

@Injectable()
export class AuditGarbageStationAbnormalTableBusiness
  implements IAuditGarbageStationDetailsTableBusiness
{
  constructor(
    private service: GarbageStationRequestService,
    private converter: AuditGarbageStationDetailsTableConverter,
    public config: AuditGarbageStationAbnormalTableConfigBusiness
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
  getData(
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
}
