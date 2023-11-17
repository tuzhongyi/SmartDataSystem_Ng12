import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { UserLogRecordMessageType } from 'src/app/enum/user-log-record-message-type.enum';
import { Duration } from 'src/app/network/model/garbage-station/duration.model';
import { PageArgs } from '../table.interface';

export class AIOPUserLogRecordTableArgs extends PageArgs {
  duration: Duration = DateTimeTool.allDay(new Date());
  username?: string;
  types?: UserLogRecordMessageType[];
  result?: boolean;
  operated?: string;
}
