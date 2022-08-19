import { Division } from 'src/app/network/model/division.model';

export class GarbageDropStationCountTableModel {
  [key: string]: any;
  Id: string = '';
  Name: string = '';
  EventCount: number = 0;
  TimeoutCount: number = 0;
  TimeoutRatio: number = 0;
  TimeinRatio: number = 0;
  Parent?: Division;
}
