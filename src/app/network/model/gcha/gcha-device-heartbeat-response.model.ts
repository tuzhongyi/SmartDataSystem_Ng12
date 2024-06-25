import { Transform } from 'class-transformer';
import { IModel } from '../model.interface';
import { transformDateTime } from '../transform.model';
import { GCHADeviceCommand } from './gcha-device-command.model';

/**	DeviceHeartbeatResponse (设备心跳应答)	*/
export class GCHADeviceHeartbeatResponse implements IModel {
  /**
   * Int32
   * 心跳时间间隔，单位：秒
   * 此处间隔最大600，最小60秒
   * M
   **/
  HeartbeatInterval!: number;
  /**
   * DateTime
   * 系统时间：
   * 2020-09-23T10:01:51.539+08:00
   * M
   **/
  @Transform(transformDateTime)
  SystemTime!: Date;
  /**	DeviceCommand[]	下发命令列表	O	*/
  Commands?: GCHADeviceCommand[];
}
