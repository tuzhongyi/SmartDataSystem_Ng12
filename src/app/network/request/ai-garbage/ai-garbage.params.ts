import { CloseOpenState } from 'src/app/enum/ai-garbage/close-open-state.enum';
import { ResultState } from 'src/app/enum/ai-garbage/result-state.enum';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { PagedDurationParams, PagedParams } from '../IParams.interface';

export class GetAIGarbageStationDevicesParams extends PagedParams {
  /**	String[]	设备ID列表	O	*/
  DeviceIds?: string[];
  /**	String	设备名称，支持LIKE	O	*/
  DeviceName?: string;
  /**	String[]	垃圾厢房ID列表	O	*/
  GarbageStationIds?: string[];
  /**	String	垃圾厢房名称，支持LIKE	O	*/
  GarbageStationName?: string;
  /**	String[]	区域ID列表	O	*/
  RegionIds?: string[];
  /**	String	区域名称，支持LIKE	O	*/
  RegionName?: string;
  /**	String	设备型号	O	*/
  Model?: string;
  /**	Int32	"在线状态 0:正常、1:异常"	O	*/
  OnlineState?: OnlineStatus;
  /**	Int32	"排风扇开关状态0:关闭、1:打开"	O	*/
  ExhaustFan?: CloseOpenState;
  /**	Double	"气泵压强数值，单位：pa 小于的数值"	O	*/
  AirPumpPressure?: number;
  /**	Int32	气泵电源状态0:断电、1:上电	O	*/
  AirPumpPower?: CloseOpenState;
  /**	Int32	"RFID读卡器状态 0:正常、1:异常"	O	*/
  RfidReader?: ResultState;
  /**	Int32	"大门开关状态
0:关闭、1:打开"	O	*/
  GateState?: CloseOpenState;
  /**	Int32	"香氛喷洒开关状态 0:关闭、1:打开"	O	*/
  Spray?: CloseOpenState;
  /**	Double	"气体检测传感器数值大于的数值"	O	*/
  GasSensor?: number;
  /**	String	升序排列字段	O	*/
  Asc?: string;
  /**	String	降序排列字段	O	*/
  Desc?: string;
}
export class GetAIGarbageStationDeviceCommandRecordsParams extends PagedDurationParams {
  /**	String[]	命令ID列表	O	*/ CommandIds?: string[];
  /**	String	命令名称	O	*/ CommandName?: string;
  /**	String[]	设备ID列表	O	*/ DeviceIds?: string[];
  /**	String	设备名称，支持LIKE	O	*/ DeviceName?: string;
  /**	String[]	垃圾厢房ID列表	O	*/ GarbageStationIds?: string[];
  /**	String	垃圾厢房名称，支持LIKE	O	*/ GarbageStationName?: string;
  /**	String[]	区域ID列表	O	*/ RegionIds?: string[];
  /**	String	区域名称，支持LIKE	O	*/ RegionName?: string;
  /**	Int32	执行结果：0-失败，1-成功	O	*/ Result?: ResultState;
  /**	String	升序排列字段	O	*/ Asc?: string;
  /**	String	降序排列字段	O	*/ Desc?: string;
}
export class GetAIGarbageStationDeviceLogRecordsParams extends PagedDurationParams {
  /**	String[]	命令ID列表	O	*/ CommandIds?: string[];
  /**	String[]	设备ID列表	O	*/ DeviceIds?: string[];
  /**	String	设备名称，支持LIKE	O	*/ DeviceName?: string;
  /**	String[]	垃圾厢房ID列表	O	*/ GarbageStationIds?: string[];
  /**	String	垃圾厢房名称，支持LIKE	O	*/ GarbageStationName?: string;
  /**	String[]	区域ID列表	O	*/ RegionIds?: string[];
  /**	String	区域名称，支持LIKE	O	*/ RegionName?: string;
  /**	Int32	执行结果：0-失败，1-成功	O	*/ Result?: ResultState;
  /**	String	升序排列字段	O	*/ Asc?: string;
  /**	String	降序排列字段	O	*/ Desc?: string;
}
export class GetAIGarbageStationDeviceEventRecordsParams extends PagedDurationParams {
  /**	String[]	事件ID列表	O	*/ EventIds?: string[];
  /**	Int32[]	投放窗口编号列表	O	*/ DropWindowNos?: number[];
  /**	String[]	设备ID列表	O	*/ DeviceIds?: string[];
  /**	String	设备名称，支持LIKE	O	*/ DeviceName?: string;
  /**	String[]	垃圾厢房ID列表	O	*/ GarbageStationIds?: string[];
  /**	String	垃圾厢房名称，支持LIKE	O	*/ GarbageStationName?: string;
  /**	String[]	区域ID列表	O	*/ RegionIds?: string[];
  /**	String	区域名称，支持LIKE	O	*/ RegionName?: string;
  /**	Int32	事件类型	O	*/ EventType?: number;
  /**	String	升序排列字段	O	*/ Asc?: string;
  /**	String	降序排列字段	O	*/ Desc?: string;
}
export class GetAIGarbageStationRfidCardsParams extends PagedParams {
  /**	Int64[]	唯一卡号列表	O	*/ Ids?: number[];
  /**	String[]	所属区域ID列表	O	*/ RegionIds?: string[];
  /**	String	所属区域名称，支持LIKE	O	*/ RegionName?: string;
  /**	String[]	楼栋编号列表	O	*/ BuildingNos?: string[];
  /**	String[]	房屋编号列表	O	*/ RoomNos?: string[];
  /**	String	升序排列字段	O	*/ Asc?: string;
  /**	String	降序排列字段	O	*/ Desc?: string;
}
export class GetAIGarbageStationRfidCardRecordsParams extends PagedDurationParams {
  /**	String[]	事件ID列表	O	*/ Ids?: string[];
  /**	Int64[]	唯一卡号列表	O	*/ CardIds?: number[];
  /**	String[]	所属区域ID列表	O	*/ RegionIds?: string[];
  /**	String	所属区域名称，支持LIKE	O	*/ RegionName?: string;
  /**	String[]	设备ID列表	O	*/ DeviceIds?: string[];
  /**	String	设备名称，支持LIKE	O	*/ DeviceName?: string;
  /**	String[]	垃圾厢房ID列表	O	*/ GarbageStationIds?: string[];
  /**	String	垃圾厢房名称，支持LIKE	O	*/ GarbageStationName?: string;
  /**	String[]	楼栋编号列表	O	*/ BuildingNos?: string[];
  /**	String[]	房屋编号列表	O	*/ RoomNos?: string[];
  /**	String	升序排列字段	O	*/ Asc?: string;
  /**	String	降序排列字段	O	*/ Desc?: string;
  BuildingNo?: string;
  RoomNo?: string;
}
export class GetAIGarbageStationRegionsParams extends PagedParams {
  /**	String[]	所属区域ID列表	O	*/ RegionIds?: string[];
  /**	String	所属区域名称，支持LIKE	O	*/ RegionName?: string;
  /**	String[]	街道区划ID列表	O	*/ DivisionIds?: string[];
  /**	String	区划名称，支持LIKE	O	*/ DivisionName?: string;
  /**	String[]	垃圾厢房ID列表	O	*/ GarbageStationIds?: string[];
  /**	String	垃圾厢房名称，支持LIKE	O	*/ GarbageStationName?: string;
  /**	String	升序排列字段	O	*/ Asc?: string;
  /**	String	降序排列字段	O	*/ Desc?: string;
}
export class GetAIGarbageStationAbbrRegionsParams extends PagedParams {
  /**	String[]	所属区域ID列表	O	*/ RegionIds?: string[];
  /**	String	所属区域名称，支持LIKE	O	*/ RegionName?: string;
  /**	String[]	街道区划ID列表	O	*/ DivisionIds?: string[];
  /**	String	区划名称，支持LIKE	O	*/ DivisionName?: string;
  /**	String	升序排列字段	O	*/ Asc?: string;
  /**	String	降序排列字段	O	*/ Desc?: string;
}
