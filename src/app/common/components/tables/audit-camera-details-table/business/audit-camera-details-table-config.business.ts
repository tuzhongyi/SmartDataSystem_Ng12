import { Injectable } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { UserConfigType } from 'src/app/enum/user-config-type.enum';
import { UserRequestService } from 'src/app/network/request/user/user-request.service';
import { AuditCameraDetailsTableConfig } from '../audit-camera-details-table.model';

@Injectable()
export class AuditCameraDetailsTableConfigBusiness
  implements IBusiness<AuditCameraDetailsTableConfig>
{
  constructor(
    private service: UserRequestService,
    private local: LocalStorageService
  ) {}

  async load(...args: any) {
    return this.getData();
  }

  async getData(...args: any): Promise<AuditCameraDetailsTableConfig> {
    let str = await this.service.config.get(
      this.local.user.Id,
      UserConfigType.audit_camera_config
    );
    if (str) {
      return plainToInstance(AuditCameraDetailsTableConfig, str);
    }
    return new AuditCameraDetailsTableConfig();
  }
}
