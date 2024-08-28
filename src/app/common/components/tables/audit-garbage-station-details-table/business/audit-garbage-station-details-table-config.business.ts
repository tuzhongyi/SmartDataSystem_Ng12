import { Injectable } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { UserConfigType } from 'src/app/enum/user-config-type.enum';
import { UserRequestService } from 'src/app/network/request/user/user-request.service';
import { AuditGarbageStationDetailsTableConfig } from '../audit-garbage-station-details-table.model';

@Injectable()
export class AuditGarbageStationDetailsTableConfigBusiness
  implements IBusiness<AuditGarbageStationDetailsTableConfig>
{
  constructor(
    private service: UserRequestService,
    private local: LocalStorageService
  ) {}

  async load() {
    return this.getData();
  }

  async getData(...args: any): Promise<AuditGarbageStationDetailsTableConfig> {
    let str = await this.service.config.get(
      this.local.user.Id,
      UserConfigType.audit_station_config
    );
    if (str) {
      return plainToInstance(AuditGarbageStationDetailsTableConfig, str);
    }
    return new AuditGarbageStationDetailsTableConfig();
  }
}
