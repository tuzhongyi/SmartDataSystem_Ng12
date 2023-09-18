import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { Division } from 'src/app/network/model/division.model';
import { Duration } from 'src/app/network/model/duration.model';
import { GarbageDropEventRecord } from 'src/app/network/model/garbage-event-record.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';

export class DapuqiaoGarbageDropRecordTableArgs {
  duration: Duration = DateTimeTool.allDay(new Date());
  divisionId?: string;
  stationId?: string;
  level?: number;
  feedback?: boolean;
  handle?: boolean;
  supervised?: boolean;
}
export class GarbageDropEventRecordModel extends GarbageDropEventRecord {
  GarbageStation!: Promise<GarbageStation>;
  Committee!: Promise<Division>;
  County!: Promise<Division>;
  LevelTime?: Date;
  Level?: string;
  Minutes?: number;
  FeedbackUserName?: string;
  imgs: {
    id?: string;
    url: string;
    name?: string;
  }[] = [];
}
