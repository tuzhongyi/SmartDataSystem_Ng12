import { PagedParams } from '../../IParams.interface';

export class GetResourceCamerasParams extends PagedParams {
  /**	String[]	监控点ID列表	O	*/ ResourceIds?: string[];
  /**	String	监控点名称，支持LIKE	O	*/ Name?: string;
  /**	String	资源类型	O	*/ ResourceType?: string;
  /**	String	平台ID	O	*/ PlatformId?: string;
  /**	String[]	标签名称 Or	O	*/ Labels?: string[];
  /**	String[]	标签ID Or	O	*/ LabelIds?: string[];
  /**	String[]	标签名称 And	O	*/ AndLabels?: string[];
  /**	String[]	标签ID And	O	*/ AndLabelIds?: string[];
  /**	String[]	所属区域ID	O	*/ RegionIds?: string[];
  /**	Boolean	区域ID必须为NULL	O	*/ RegionIdNullable?: boolean;
  /**	Int32	在线状态	O	*/ OnlineStatus?: number;
  /**	Int32[]	摄像机类型	O	*/ CameraTypes?: number[];
  /**	Int32	摄像机状态	O	*/ CameraState?: number;
  /**	0	0	0	*/ 0: 0;
  /**	Boolean	是否PTZ可控	O	*/ PTZControllable?: boolean;
  /**	Boolean	是否可存储的	O	*/ Storable?: boolean;
  /**	String[]	AI模型ID列表	O	*/ AIModelIds?: string[];
  /**	String[]	编码设备ID列表	O	*/ EncodeDeviceIds?: string[];
  /**	String	设备类型，G3、G5	O	*/ DeviceType?: string;
}
