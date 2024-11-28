import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { GarbageStationAbnormalType } from 'src/app/enum/garbage-station-abnormal-type.enum';
import { AuditGarbageStationDetailsTableConfig } from '../../audit-garbage-station-details-table/audit-garbage-station-details-table.model';
import { AuditGarbageStationAbnormalTableArgs } from '../audit-garbage-station-abnormal-table.model';

@Injectable()
export class AuditGarbageStationAbnormalTableConfigBusiness
  implements IBusiness<AuditGarbageStationDetailsTableConfig>
{
  load(
    args: AuditGarbageStationAbnormalTableArgs
  ): Promise<AuditGarbageStationDetailsTableConfig> {
    return this.getData(args);
  }
  async getData(
    args: AuditGarbageStationAbnormalTableArgs
  ): Promise<AuditGarbageStationDetailsTableConfig> {
    let config = new AuditGarbageStationDetailsTableConfig();
    for (const key in config) {
      config[key].enabled = false;
    }
    let keys: (keyof AuditGarbageStationDetailsTableConfig)[] = [
      'DeviceAccessId',
      'Committees',
      'County',
    ];

    switch (args.type) {
      case GarbageStationAbnormalType.gcha:
        keys = [...keys, 'GCHA'];
        break;
      case GarbageStationAbnormalType.door:
        keys = [...keys, 'Device'];
        break;
      case GarbageStationAbnormalType.nb:
        keys = [...keys, 'NBState', 'NBHeartbeatTime'];
        break;
      case undefined:
        keys = [...keys, 'Device', 'GCHA', 'NBState', 'NBHeartbeatTime'];
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
