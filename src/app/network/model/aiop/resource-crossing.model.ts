import { ResourceCrossingType } from 'src/app/enum/resource-crossing-type.enum';
import { Resource } from '../garbage-station/resource.model';
import { ResourceLane } from './resource-lane.model';

export class ResourceCrossing extends Resource {
  /**	Int32	卡口类型 80-治安卡口，81-电子警察，82-其它卡口，	M */
  CrossingType!: ResourceCrossingType;
  /**	String	对应的摄像机ID	M */
  CameraId!: string;
  /**	Lane[]	车道	O */
  Lanes?: ResourceLane[];
}
