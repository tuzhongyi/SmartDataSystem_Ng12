import { OnlineStatus } from 'src/app/enum/online-status.enum';

export class AiGarbageStationDeviceStatusFilterModel {
  device?: OnlineStatus;
  gcha?: OnlineStatus;
  analysis?: OnlineStatus;
}
