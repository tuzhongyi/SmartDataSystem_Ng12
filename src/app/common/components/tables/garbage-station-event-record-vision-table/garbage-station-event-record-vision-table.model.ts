import { GarbageDropEventRecord } from 'src/app/network/model/garbage-event-record.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';

export class GarbageStationEventRecordVisionTableArgs {}

export class GarbageStationEventRecordVisionModel extends GarbageDropEventRecord {
  Index!: number;
  GarbageStation!: Promise<GarbageStation>;
  Minutes?: number;
}
