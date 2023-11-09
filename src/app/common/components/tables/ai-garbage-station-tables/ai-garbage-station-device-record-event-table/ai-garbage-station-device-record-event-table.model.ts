import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { AIGarbageDeviceEventType } from 'src/app/network/model/ai-garbage/device-event-record.model';
import { PageArgs } from '../../table.interface';

export class AIGarbageStationDeviceRecordEventTableArgs extends PageArgs {
  asc?: string;
  desc?: string;
  name?: string;
  regionId?: string;
  duration = DateTimeTool.allDay(new Date());
  eventType?: AIGarbageDeviceEventType;
  searchType: SearchType = SearchType.station;
}

enum SearchType {
  station,
  region,
}
