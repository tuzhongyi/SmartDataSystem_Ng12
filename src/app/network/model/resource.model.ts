import { ResourceType } from "src/app/enum/resource-type.enum";
import { GisPoint } from "./gis-point.model";
import { PlatformAssociation } from "./platform-association.model";
import { ResourceLabel } from "./resource-label.model";

export class Resource {
  /**唯一标识符 */
  Id!: string;
  /**资源名称 */
  Name!: string;
  /**
  * 资源类型：
  * Camera：监控点
  * EncodeDevice：编码设备
  * IoTSensor：物联网传感器
  */
  ResourceType!: ResourceType;
  /**描述(可选) */
  Description?: string;
  /**创建时间 */
  CreateTime!: Date | string;
  /**更新事件 */
  UpdateTime!: Date | string;
  /**区域路径(可选) */
  RegionPath?: string;
  /**区域路径名称(可选) */
  RegionPathName?: string;
  /**GIS坐标(可选) */
  GisPoint?: GisPoint;
  /**资源标签，用于分类和检索资源(可选) */
  Labels?: ResourceLabel[];
  /**所属地图元素ID(可选) */
  MapElementId?: string;
  /**所属区域ID */
  RegionId?: string;
  /**平台接入信息(可选) */
  PlatformAssociation?: PlatformAssociation;
}