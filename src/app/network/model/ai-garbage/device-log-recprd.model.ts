import { Transform, Type } from 'class-transformer';
import { IdModel } from '../model.model';
import { PagedList } from '../page_list.model';
import { transformDateTime } from '../transform.model';

export class AIGarbageDeviceLogRecord extends IdModel {
  /**	String	对应的命令ID	M	*/
  CommandId!: string;
  /**	DateTime	日志开始时间	M	*/
  @Transform(transformDateTime)
  BeginTime!: Date;
  /**	DateTime	日志结束时间	M	*/
  @Transform(transformDateTime)
  EndTime!: Date;
  /**	String	文件名称	M	*/
  FileName!: string;
  /**	Int64	文件大小(字节)	O	*/
  FileSize?: number;
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
  /**	String	文件下载URL	O	*/
  Url?: string;
  /**	DateTime	上传时间	O	*/
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
export class PagedListAIGarbageDeviceLogRecord extends PagedList<AIGarbageDeviceLogRecord> {
  @Type(() => AIGarbageDeviceLogRecord)
  Data!: AIGarbageDeviceLogRecord[];
}
