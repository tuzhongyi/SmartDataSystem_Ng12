import { GarbageDropEventRecord } from 'src/app/network/model/garbage-station/event-record/garbage-drop-event-record.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { PageArgs } from '../../table.interface';

export class DaPuQiaoGarbageStationEventRecordVisionTableArgs extends PageArgs {}

export class DaPuQiaoGarbageStationEventRecordVisionModel extends GarbageDropEventRecord {
  Index!: number;
  GarbageStation!: Promise<GarbageStation>;
  Minutes?: number;
}
