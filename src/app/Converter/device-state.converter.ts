import { DeviceStateCountModule } from '../view-model/device-state-count.model';

export interface DeviceStateConverter {
  toDeviceState<T>(
    data: T[],
    ...res: any[]
  ): DeviceStateCountModule[] | DeviceStateCountModule;
}
