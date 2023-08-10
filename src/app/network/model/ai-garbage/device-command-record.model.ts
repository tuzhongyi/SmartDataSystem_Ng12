import { Transform, Type } from 'class-transformer';
import { IIdModel } from '../model.interface';

import { PagedList } from '../page_list.model';
import { transformDateTime } from '../transform.model';

export class AIGarbageDeviceCommandRecord implements IIdModel {
  Id!: string;
  /**	String	命令ID	M	*/
  CommandId!: string;
  /**	String	命令名称	M	*/
  CommandName!: string;
  /**	String[]	命令参数	O	*/
  Arguments?: string[];
  /**	String	设备ID	M	*/
  DeviceId!: string;
  /**	String	设备名称	O	*/
  DeviceName?: string;
  /**	String	垃圾厢房ID	O	*/
  GarbageStationId?: string;
  /**	String	垃圾厢房名称	O	*/
  GarbageStationName?: string;
  /**	String	所属区域ID	O	*/
  RegionId?: string;
  /**	String	所属区域名称	O	*/
  RegionName?: string;
  /**	DateTime	执行时间	O	*/
  @Transform(transformDateTime)
  ExecutionTime?: Date;
  /**	Int32	执行结果：0-失败，1-成功	M	*/
  Result!: number;
  /**	String	错误原因	O	*/
  FailedReason?: string;
  /**	DateTime	创建时间	O	*/
  @Transform(transformDateTime)
  CreationTime?: Date;
}
export class PagedListAIGarbageDeviceCommandRecord extends PagedList<AIGarbageDeviceCommandRecord> {
  @Type(() => AIGarbageDeviceCommandRecord)
  Data!: AIGarbageDeviceCommandRecord[];
}
