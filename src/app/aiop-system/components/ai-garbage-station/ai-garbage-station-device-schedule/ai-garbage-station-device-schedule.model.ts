import { TimeModel } from 'src/app/common/components/time-control/time-control.model';

export enum AIGarbageStationDeviceScheduleType {
  fan,
  spray,
  door,
}

export class AIGarbageTimeSegmentModel {
  /**	Time	开始时间，00:00-23:59	M	*/
  StartTime!: TimeModel;
  /**	Time	结束时间，00:00-23:59	M	*/
  StopTime!: TimeModel;
}

export class AIGarbageDayTimeSegmentModel {
  Day: number = 0;
  Segments?: AIGarbageTimeSegmentModel[];
}

export class AIGarbageScheduleModel {
  ExhaustFanTimeSegments?: AIGarbageTimeSegmentModel[];
  SprayTimes?: TimeModel[];
  DoorOpenTimes?: AIGarbageDayTimeSegmentModel[];
}
