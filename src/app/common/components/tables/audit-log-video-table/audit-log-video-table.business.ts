import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { VideoOperationLog } from 'src/app/network/model/garbage-station/log-operation-video.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';
import { GetOperationLogsParams } from 'src/app/network/request/logs/logs.params';
import {
  AuditLogVideoTableArgs,
  AuditLogVideoTableSearchName,
} from './audit-log-video-table.model';
import { AuditLogVideoTableService } from './audit-log-video-table.service';

@Injectable()
export class AuditLogVideoTableBusiness
  implements IBusiness<PagedList<VideoOperationLog>>
{
  constructor(private service: AuditLogVideoTableService) {}
  load(
    index: number,
    size: number,
    args: AuditLogVideoTableArgs
  ): Promise<PagedList<VideoOperationLog>> {
    return this.getData(index, size, args);
  }
  async getData(
    index: number,
    size: number,
    args: AuditLogVideoTableArgs
  ): Promise<PagedList<VideoOperationLog>> {
    let params = new GetOperationLogsParams();
    params.PageIndex = index;
    params.PageSize = size;
    params.BeginTime = args.duration.begin;
    params.EndTime = args.duration.end;
    params.Asc = args.asc;
    params.Desc = args.desc;
    if (args.name) {
      switch (args.searchType) {
        case AuditLogVideoTableSearchName.camera:
          params.CameraName = args.name;
          break;
        case AuditLogVideoTableSearchName.station:
          params.GarbageStationName = args.name;
          break;
        case AuditLogVideoTableSearchName.user:
          params.CameraName = args.name;
          break;
        default:
          break;
      }
    }
    if (args.divisionId) {
      let divisions = await this.divisions(args.divisionId);
      params.DivisionIds = divisions.map((x) => x.Id);
    }
    if (args.type !== undefined) {
      params.OperationTypes = [args.type];
    }
    return this.service.log.operation.list(params);
  }

  async divisions(divisionId: string) {
    let params = new GetDivisionsParams();
    params.AncestorId = divisionId;
    let paged = await this.service.division.cache.list(params);
    return paged.Data;
  }
}
