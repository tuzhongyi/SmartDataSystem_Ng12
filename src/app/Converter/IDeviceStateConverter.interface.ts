import { DeviceStateCountModule } from '../view-model/device_state_count.model';

export interface IDeviceStateConverter {
  toDeviceState<T>(
    data: T[],
    ...res: any[]
  ): DeviceStateCountModule[] | DeviceStateCountModule;
}
