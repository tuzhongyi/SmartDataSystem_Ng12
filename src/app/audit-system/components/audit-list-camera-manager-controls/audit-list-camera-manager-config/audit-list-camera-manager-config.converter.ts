import { AuditCameraDetailsTableConfig } from 'src/app/common/components/tables/audit-camera-details-table/audit-camera-details-table.model';
import { AuditListCameraManagerConfigItem as ConfigItem } from './audit-list-camera-manager-config.model';
export class AuditListCameraManagerConfigConverter {
  convert(
    all: ConfigItem[],
    enabled: ConfigItem[]
  ): AuditCameraDetailsTableConfig {
    let others = all.filter((x) => {
      return !enabled.includes(x);
    });

    let config = new AuditCameraDetailsTableConfig();
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
