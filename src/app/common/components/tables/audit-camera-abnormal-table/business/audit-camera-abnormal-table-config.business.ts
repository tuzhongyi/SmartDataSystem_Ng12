import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';

import { CameraAbnormalType } from 'src/app/enum/camera-abnormal-type.enum';
import { AuditCameraDetailsTableConfig } from '../../audit-camera-details-table/audit-camera-details-table.model';
import { AuditCameraAbnormalTableArgs } from '../audit-camera-abnormal-table.model';

@Injectable()
export class AuditCameraAbnormalTableConfigBusiness
  implements IBusiness<AuditCameraDetailsTableConfig>
{
  load(
    args: AuditCameraAbnormalTableArgs
  ): Promise<AuditCameraDetailsTableConfig> {
    return this.getData(args);
  }
  async getData(
    args: AuditCameraAbnormalTableArgs
  ): Promise<AuditCameraDetailsTableConfig> {
    let config = new AuditCameraDetailsTableConfig();
    for (const key in config) {
      config[key].enabled = false;
    }
    let keys: (keyof AuditCameraDetailsTableConfig)[] = ['GarbageStation'];

    switch (args.type) {
      case CameraAbnormalType.offline:
        keys = [...keys, 'OnlineStatus', 'OfflineTime'];
        break;
      case CameraAbnormalType.abnormal:
        keys = [
          ...keys,
          'SceneChange',
          'ImageQuality',
          'Brightness',
          'Aberration',
          'Disturbance',
          'AbnormalTime',
        ];
        break;
      case CameraAbnormalType.record:
        keys = [...keys, 'RecordState', 'AbnormalTime'];
        break;
      case undefined:
        keys = [
          ...keys,
          'SceneChange',
          'ImageQuality',
          'Brightness',
          'Aberration',
          'Disturbance',
          'AbnormalTime',
          'RecordState',
          'AbnormalTime',
          'OnlineStatus',
          'OfflineTime',
        ];
        break;
    }

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      config[key].index = i;
      config[key].enabled = true;
    }

    return config;
  }
}
