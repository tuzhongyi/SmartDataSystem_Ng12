import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { Duration } from 'src/app/network/model/duration.model';

export class CardRecordTableArgs {
  constructor() {
    this.duration = DateTimeTool.allDay(new Date());
  }
  stationId?: string;
  name?: string;
  duration: Duration;
  asc?: string;
  desc?: string;
}
