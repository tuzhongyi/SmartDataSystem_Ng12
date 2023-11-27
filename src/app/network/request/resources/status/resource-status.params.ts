import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { ResourceType } from 'src/app/enum/resource-type.enum';
import { PagedDurationParams } from '../../IParams.interface';

export class GetResourceOnlineStatusRecordsParams extends PagedDurationParams {
  /**	Int32	状态：0-正常，1-离线	O	*/ OnlineStatus?: OnlineStatus;
  /**	String[]	资源ID	O	*/ ResourceIds?: string[];
  /**	String	资源名称，支持LIKE	O	*/ ResourceName?: string;
  /**	String	"资源类型：
Camera：监控点
EncodeDevice：编码设备
IoTSensor：物联网传感器"	O	*/ ResourceType?: ResourceType;
  /**	String	升序字段	O	*/ Asc?: string;
  /**	String	降序字段	O	*/ Desc?: string;
}
