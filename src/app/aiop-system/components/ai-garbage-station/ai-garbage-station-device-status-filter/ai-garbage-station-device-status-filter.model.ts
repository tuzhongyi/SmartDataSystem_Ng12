import { OnlineStatus } from 'src/app/enum/online-status.enum';

export class AiGarbageStationDeviceStatusFilterModel {
  device?: OnlineStatus;
  gcha?: OnlineStatus;
  analysis?: OnlineStatus;
}
export enum AIGarbageStationDeviceStatusType {
  division = '1',
  analysis = '2',
  gcha = '3',
}
