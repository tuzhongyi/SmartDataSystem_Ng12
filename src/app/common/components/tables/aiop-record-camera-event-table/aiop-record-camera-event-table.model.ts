import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { EventType } from 'src/app/enum/event-type.enum';
import { CameraAIEventRecord } from 'src/app/network/model/garbage-station/camera-ai-event-record.model';
import { Duration } from 'src/app/network/model/garbage-station/duration.model';
import { PageArgs } from '../table.interface';

export class AIOPRecordCameraEventTableArgs extends PageArgs {
  duration: Duration = DateTimeTool.allDay(new Date());
  name?: string;
  type?: EventType;
  modelId?: string;
}

export class AIOPRecordCameraEventTableItem extends CameraAIEventRecord {
  url!: Promise<string>;
}
