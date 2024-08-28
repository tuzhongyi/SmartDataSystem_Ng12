import { Injectable } from '@angular/core';
import { AuditCameraDetailsTableConfig } from 'src/app/common/components/tables/audit-camera-details-table/audit-camera-details-table.model';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { UserConfigType } from 'src/app/enum/user-config-type.enum';
import { UserRequestService } from 'src/app/network/request/user/user-request.service';

@Injectable()
export class AuditListCameraManagerConfigBusiness {
  constructor(
    private service: UserRequestService,
    private local: LocalStorageService
  ) {}

  async set(config: AuditCameraDetailsTableConfig) {
    return new Promise<void>((resolve, reject) => {
      let plain = JSON.stringify(config);
      this.service.config
        .update(this.local.user.Id, UserConfigType.audit_camera_config, plain)
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
        .update(this.local.user.Id, UserConfigType.audit_camera_config, '{}')
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
