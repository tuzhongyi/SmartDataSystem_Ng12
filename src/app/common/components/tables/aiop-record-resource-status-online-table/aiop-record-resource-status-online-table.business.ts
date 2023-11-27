import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { ResourceOnlineStatusRecord } from 'src/app/network/model/aiop/resource-online-status-record.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { ResourceRequestService } from 'src/app/network/request/resources/resource.service';
import { GetResourceOnlineStatusRecordsParams } from 'src/app/network/request/resources/status/resource-status.params';
import { AIOPRecordResourceStatusOnlineTableArgs } from './aiop-record-resource-status-online-table.model';

@Injectable()
export class AIOPRecordResourceStatusOnlineTableBusiness
  implements IBusiness<PagedList<ResourceOnlineStatusRecord>>
{
  constructor(private service: ResourceRequestService) {}
  load(
    index: number,
    size: number,
    args: AIOPRecordResourceStatusOnlineTableArgs
  ): Promise<PagedList<ResourceOnlineStatusRecord>> {
    return this.getData(index, size, args);
  }
  getData(
    index: number,
    size: number,
    args: AIOPRecordResourceStatusOnlineTableArgs
  ): Promise<PagedList<ResourceOnlineStatusRecord>> {
    let params = new GetResourceOnlineStatusRecordsParams();
    params.PageIndex = index;
    params.PageSize = size;
    params.BeginTime = args.duration.begin;
    params.EndTime = args.duration.end;
    params.ResourceType = args.type;
    params.ResourceName = args.name;
    params.OnlineStatus = args.status;
    params.Asc = args.asc;
    params.Desc = args.desc;
    return this.service.status.online.record.list(params);
  }
}
