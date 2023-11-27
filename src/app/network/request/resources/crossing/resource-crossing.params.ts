import { PagedParams } from '../../IParams.interface';

export class GetResourceCrossingsParams extends PagedParams {
  /**	String[]	监控点ID列表	O	*/ ResourceIds?: string[];
  /**	String	监控点名称，支持LIKE	O	*/ Name?: string;
  /**	String	资源类型	O	*/ ResourceType?: string;
  /**	String	平台ID	O	*/ PlatformId?: string;
  /**	String[]	所属区域ID	O	*/ RegionIds?: string[];
  /**	Boolean	区域ID必须为NULL	O	*/ RegionIdNullable?: boolean;
  /**	Int32	"卡口类型
80-治安卡口，81-电子警察，82-其它卡口，"	O	*/ CrossingType?: number;
  /**	String[]	对应的摄像机ID	O	*/ CameraIds?: string[];
}
