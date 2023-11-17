import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { UserRecord } from 'src/app/network/model/garbage-station/user-record.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetUserRecordListParams } from 'src/app/network/request/user/user-request.params';
import { UserRequestService } from 'src/app/network/request/user/user-request.service';
import { AIOPUserLogRecordTableArgs } from './aiop-user-log-record-table.model';

@Injectable()
export class AIOPUserLogRecordTableBusiness
  implements IBusiness<PagedList<UserRecord>>
{
  constructor(private service: UserRequestService) {}
  load(
    index: number,
    size: number,
    args: AIOPUserLogRecordTableArgs
  ): Promise<PagedList<UserRecord>> {
    return this.getData(index, size, args);
  }
  getData(
    index: number,
    size: number,
    args: AIOPUserLogRecordTableArgs
  ): Promise<PagedList<UserRecord>> {
    let params = new GetUserRecordListParams();
    params.PageIndex = index;
    params.PageSize = size;
    params.BeginTime = args.duration.begin;
    params.EndTime = args.duration.end;
    params.UserName = args.username;
    params.MessageTypes = args.types;
    params.Result = args.result;
    params.OperatedUserName = args.operated;
    return this.service.log.record.list(params);
  }
}
