import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { AIGarbageDevice } from 'src/app/network/model/ai-garbage/garbage-device.model';
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

export class AIGarbageStationDeviceTableItem extends AIGarbageDevice {
  state: {
    camera?: AIGarbageDeviceCamerasState;
  } = {};
}

export enum AIGarbageDeviceCamerasState {
  online,
  offline,
  unknown,
  warn,
}

export enum AIGarbageDeviceState {
  door = 1,
  rfid = 2,
}
