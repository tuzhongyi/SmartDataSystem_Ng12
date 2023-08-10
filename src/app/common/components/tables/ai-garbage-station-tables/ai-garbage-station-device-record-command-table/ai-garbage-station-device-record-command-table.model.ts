import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { ResultState } from 'src/app/enum/ai-garbage/result-state.enum';
import { Duration } from 'src/app/network/model/duration.model';

export class AIGarbageStationDeviceRecordCommandTableArgs {
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
