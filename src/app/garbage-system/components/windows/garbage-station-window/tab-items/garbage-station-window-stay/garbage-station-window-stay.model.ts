import { GarbageStation } from 'src/app/network/model/garbage-station.model';

export class GarbageStationWindowStayModel {
  station!: GarbageStation;
  garde: string = '100';
  avgDropDuration: string = '-';
  maxDropDuration: string = '-';
  countDropDuration: string = '-';
  eventCount: number = 0;
}
