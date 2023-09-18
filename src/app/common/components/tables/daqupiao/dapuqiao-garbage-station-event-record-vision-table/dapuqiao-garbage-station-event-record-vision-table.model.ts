import { GarbageDropEventRecord } from 'src/app/network/model/garbage-event-record.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';

export class DaPuQiaoGarbageStationEventRecordVisionTableArgs {}

export class DaPuQiaoGarbageStationEventRecordVisionModel extends GarbageDropEventRecord {
  Index!: number;
  GarbageStation!: Promise<GarbageStation>;
  Minutes?: number;
}
