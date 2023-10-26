import { DivisionType } from 'src/app/enum/division-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { Division } from 'src/app/network/model/garbage-station/division.model';

export class GarbageDropStationCountTableModel {
  [key: string]: any;
  Id: string = '';
  Name: string = '';
  EventCount: number = 0;
  TimeoutCount: number = 0;
  TimeoutRatio: number = 0;
  TimeinRatio: number = 0;
  Parent!: Promise<Division | undefined>;
}
export class GarbageDropStationCountTableArgs {
  date: Date = new Date();
  unit: TimeUnit = TimeUnit.Day;
  type: DivisionType = DivisionType.Committees;
  parentId?: string;
}
