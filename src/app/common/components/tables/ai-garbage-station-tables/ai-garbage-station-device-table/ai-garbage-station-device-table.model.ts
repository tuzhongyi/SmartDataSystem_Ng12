import { PageArgs } from '../../table.interface';

export class AIGarbageStationDeviceTableArgs extends PageArgs {
  asc?: string;
  desc?: string;
  name?: string;
  regionId?: string;
}

export enum AIGarbageDeviceState {
  door = 1,
  rfid = 2,
}
