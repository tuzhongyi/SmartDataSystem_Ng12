import { EncodedDeviceType } from '../enum/device-type.enum';
import { ProtocolType } from '../enum/protocol-type.enum';
import { ResourceLabel } from '../network/model/garbage-station/resource-label.model';

export class EncodeDeviceManageModel {
  Id!: string;
  Name!: string;
  IPAddress!: string;
  ProtocolType!: ProtocolType;
  OnlineStatus!: string;
  DeviceType!: EncodedDeviceType;
  Labels!: ResourceLabel[];
}

export interface EncodeDeviceManageSearchInfo {
  condition: string;
  deviceName: string;
  ip: string;
  online: string;
  labelIds: Array<string>;
  filter: boolean;
}
