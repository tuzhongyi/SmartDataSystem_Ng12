import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { ResourceType } from 'src/app/enum/resource-type.enum';
import { Duration } from 'src/app/network/model/garbage-station/duration.model';
import { PageArgs } from '../table.interface';

export class AIOPRecordResourceStatusOnlineTableArgs extends PageArgs {
  duration: Duration = DateTimeTool.allDay(new Date());
  status?: OnlineStatus;
  type?: ResourceType;
  name?: string;
  asc?: string;
  desc?: string;
}
