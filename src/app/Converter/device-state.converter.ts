import { DeviceStateCountModule } from '../view-model/device_state_count.model';

export interface DeviceStateConverter {
  toDeviceState<T>(
    data: T[],
    ...res: any[]
  ): DeviceStateCountModule[] | DeviceStateCountModule;
}
