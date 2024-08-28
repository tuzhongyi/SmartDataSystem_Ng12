import { GarbageStationAbnormalType } from 'src/app/enum/garbage-station-abnormal-type.enum';
import { IAuditGarbageStationDetailsTableArgs } from '../audit-garbage-station-details-table/audit-garbage-station-details-table.model';

export class AuditGarbageStationAbnormalTableArgs
  implements IAuditGarbageStationDetailsTableArgs
{
  divisionId?: string;
  hour?: number;
  type?: GarbageStationAbnormalType;
}
