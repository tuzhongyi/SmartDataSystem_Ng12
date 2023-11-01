import { Duration } from 'src/app/network/model/garbage-station/duration.model';
import { GarbageDropEventRecord } from 'src/app/network/model/garbage-station/event-record/garbage-drop-event-record.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';

export class GarbageDropEventRecordModel extends GarbageDropEventRecord {
  GarbageStation!: Promise<GarbageStation>;
  Items: DapuqiaoMainSuperviseCompleteModel[] = [];

  Duration!: Duration;
}
export class DapuqiaoMainSuperviseCompleteModel {
  Time!: Date;
  Index!: number;
  Title!: string;
  Type!: DapuqiaoMainSuperviseCompleteModelType;
  urls: { id?: string; name?: string; url: string }[] = [];
  Minitues?: number;
  top = false;
  bottom = false;
  left = false;
  TitleColor!: string;
  infos: string[] = [];
}

export interface DapuqiaoMainSuperviseCompleteImageArgs {
  model: DapuqiaoMainSuperviseCompleteModel;
  index: number;
}

export enum DapuqiaoMainSuperviseCompleteModelType {
  event,
  feedback,
  supervise,
  handle,
}
