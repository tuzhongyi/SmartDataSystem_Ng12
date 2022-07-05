import { DeviceType } from "../enum/device-type.enum";
import { OnlineStatus } from "../enum/online-status.enum";
import { ProtocolType } from "../enum/protocol-type.enum";
import { ResourceLabel } from "../network/model/resource-label.model";

export class EncodeDeviceManageModel {
  Id!: string;
  Name!: string;
  IPAddress!: string;
  ProtocolType!: string;
  OnlineStatus!: string;
  DeviceType!: string;
  Labels!: ResourceLabel[]
}