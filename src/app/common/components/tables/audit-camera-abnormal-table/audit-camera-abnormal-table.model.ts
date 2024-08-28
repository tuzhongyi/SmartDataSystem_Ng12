import { CameraAbnormalType } from 'src/app/enum/camera-abnormal-type.enum';
import { IAuditGarbageStationDetailsTableArgs } from '../audit-garbage-station-details-table/audit-garbage-station-details-table.model';

export class AuditCameraAbnormalTableArgs
  implements IAuditGarbageStationDetailsTableArgs
{
  divisionId?: string;
  hour?: number;
  type?: CameraAbnormalType;
}
