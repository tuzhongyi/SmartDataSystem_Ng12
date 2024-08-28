import { Injectable } from '@angular/core';
import { AuditGarbageStationDetailsTableConfig } from 'src/app/common/components/tables/audit-garbage-station-details-table/audit-garbage-station-details-table.model';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { UserConfigType } from 'src/app/enum/user-config-type.enum';
import { UserRequestService } from 'src/app/network/request/user/user-request.service';

@Injectable()
export class AuditListStationGarbageManagerConfigBusiness {
  constructor(
    private service: UserRequestService,
    private local: LocalStorageService
  ) {}

  async set(config: AuditGarbageStationDetailsTableConfig) {
    return new Promise<void>((resolve, reject) => {
      let plain = JSON.stringify(config);
      this.service.config
        .update(this.local.user.Id, UserConfigType.audit_station_config, plain)
        .then((fault) => {
          if (fault.FaultCode == 0) {
            resolve();
          } else {
            reject(new Error(`${fault.FaultCode}:${fault.FaultReason}`));
          }
        });
    });
  }

  clear() {
    return new Promise<void>((resolve, reject) => {
      this.service.config
        .update(this.local.user.Id, UserConfigType.audit_station_config, '{}')
        .then((fault) => {
          if (fault.FaultCode == 0) {
            resolve();
          } else {
            reject(new Error(`${fault.FaultCode}:${fault.FaultReason}`));
          }
        });
    });
  }
}
