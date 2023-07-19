import { Transform, Type } from 'class-transformer';
import { IdModel } from '../model.model';
import { PagedList } from '../page_list.model';
import { transformDateTime } from '../transform.model';

export enum AIGarbageDeviceEventType {
  PneumaticPumpPowerOff = 1,
  GasConcentrationAlarm = 2,
  GarbageFull = 3,
  RfidReaderFalut = 4,
  WindowStateFault = 5,
  Offline = 6,
  Online = 7,
  SpacyOpen = 8,
  SpacyClose = 9,
  FanOpen = 10,
  FanClose = 11,
}

export class AIGarbageDeviceEventRecord extends IdModel {
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
  /**	Int32	投放窗口编号	O	*/
  DropWindowNo?: number;
  /**	String	投放窗口名称	O	*/
  DropWindowName?: string;
  /**	Int32	事件类型1:气压泵电源断电2:排风打开后长时间有害气体浓度异常报警3:垃圾满溢4:RfidReader故障5:WindowState 故障6:Offline 离线7:Online 上线8:Spacy Open9:Spacy Close10:Fan Open11:Fan Close	M	*/
  EventType!: number;
  /**	DateTime	时间发生时间	M	*/
  @Transform(transformDateTime)
  EventTime!: Date;
  /**	String[]	图片ID	O	*/
  ImageIds?: string[];
  /**	String	事件描述	O	*/
  Description?: string;
  /**	DateTime	创建时间	O	*/
  @Transform(transformDateTime)
  CreationTime?: Date;
}
export class PagedListAIGarbageDeviceEventRecord extends PagedList<AIGarbageDeviceEventRecord> {
  @Type(() => AIGarbageDeviceEventRecord)
  Data!: AIGarbageDeviceEventRecord[];
}
