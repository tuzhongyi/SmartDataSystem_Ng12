import { Injectable } from '@angular/core';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { LogsRequestService } from 'src/app/network/request/logs/logs.service';

@Injectable()
export class AuditLogVideoTableService {
  constructor(
    public log: LogsRequestService,
    public division: DivisionRequestService
  ) {}
}
