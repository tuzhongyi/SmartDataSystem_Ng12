import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { ResourceType } from 'src/app/enum/resource-type.enum';
import { PagedParams } from '../../IParams.interface';

export class GetResourceEncodeDevicesParams extends PagedParams {
  /**	String[]	编码设备ID列表	O	*/ ResourceIds?: string[];
  /**	String	编码设备名称，支持LIKE	O	*/ Name?: string;
  /**	String	资源类型	O	*/ ResourceType?: ResourceType;
  /**	String	平台ID	O	*/ PlatformId?: string;
  /**	String[]	标签名称 Or	O	*/ Labels?: string[];
  /**	String[]	标签ID Or	O	*/ LabelIds?: string[];
  /**	String[]	标签名称 And	O	*/ AndLabels?: string[];
  /**	String[]	标签ID And	O	*/ AndLabelIds?: string[];
  /**	String[]	所属区域ID	O	*/ RegionIds?: string[];
  /**	Boolean	区域ID必须为NULL	O	*/ RegionIdNullable?: boolean;
  /**	Int32	在线状态	O	*/ OnlineStatus?: OnlineStatus;
  /**	String	型号，支持LIKE	O	*/ Model?: string;
  /**	String	序列号，支持LIKE	O	*/ SerialNumber?: string;
  /**	String	设备类型	O	*/ DeviceType?: string;
  /**	String	IP地址，支持LIKE	O	*/ IPAddress?: string;
}
