import { DeviceStateCountModule } from '../view-model/device-state-count.model';

export interface IDeviceStateConverter {
  toDeviceState<T>(data: T[], ...res: any[]): DeviceStateCountModule[];
}
