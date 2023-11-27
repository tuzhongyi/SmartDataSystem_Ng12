import { OnlineStatus } from 'src/app/enum/online-status.enum';

export class AuditStatisticDataCountDeviceArgs {
  divisionId?: string;
}

export class AuditStatisticDataCountDeviceData {
  online = 0;
  offline = 0;
  all = 0;
}
export class AuditStatisticDataCountDeviceDetailsArgs {
  status?: OnlineStatus;
}
