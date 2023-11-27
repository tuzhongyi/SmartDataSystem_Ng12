import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { VideoOperationType } from 'src/app/enum/video-operation-type.enum';
import { PageArgs } from '../table.interface';

export class AuditLogVideoTableArgs extends PageArgs {
  duration = DateTimeTool.allDay(new Date());
  type?: VideoOperationType;
  name?: string;
  searchType = AuditLogVideoTableSearchName.station;
  divisionId?: string;
  asc?: string;
  desc?: string;
}

export enum AuditLogVideoTableSearchName {
  user,
  station,
  camera,
}
