import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { PageArgs } from '../../table.interface';

export class AIGarbageStationDeviceTableArgs extends PageArgs {
  asc?: string;
  desc?: string;
  name?: string;
  divisionId?: string;
  regionId?: string;
  state: {
    device?: OnlineStatus;
    gcha?: OnlineStatus;
    analysis?: OnlineStatus;
  } = {};
}

export enum AIGarbageDeviceState {
  door = 1,
  rfid = 2,
}
