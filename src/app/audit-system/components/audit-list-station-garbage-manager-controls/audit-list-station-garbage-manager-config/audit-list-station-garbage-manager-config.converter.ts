import { AuditGarbageStationDetailsTableConfig } from 'src/app/common/components/tables/audit-garbage-station-details-table/audit-garbage-station-details-table.model';
import { AuditListStationGarbageManagerConfigItem as ConfigItem } from './audit-list-station-garbage-manager-config.model';
export class AuditListStationGarbageManagerConfigConverter {
  convert(
    all: ConfigItem[],
    enabled: ConfigItem[]
  ): AuditGarbageStationDetailsTableConfig {
    let others = all.filter((x) => {
      return !enabled.includes(x);
    });

    let config = new AuditGarbageStationDetailsTableConfig();
    for (let i = 0; i < enabled.length; i++) {
      let item = enabled[i];
      config[item.key] = {
        enabled: true,
        index: i,
      };
    }

    for (let i = 0; i < others.length; i++) {
      const item = others[i];
      config[item.key] = item;
      config[item.key] = {
        enabled: false,
        index: -1,
      };
    }

    return config;
  }
}
