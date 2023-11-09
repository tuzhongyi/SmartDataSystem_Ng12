import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { ResultState } from 'src/app/enum/ai-garbage/result-state.enum';
import { Duration } from 'src/app/network/model/garbage-station/duration.model';
import { PageArgs } from '../../table.interface';

export class AIGarbageStationDeviceRecordCommandTableArgs extends PageArgs {
  asc?: string;
  desc?: string;
  name?: string;
  regionId?: string;
  duration: Duration = DateTimeTool.allDay(new Date());
  result?: ResultState;
  command?: string;

  searchType: SearchType = SearchType.station;
}

enum SearchType {
  station,
  region,
}
