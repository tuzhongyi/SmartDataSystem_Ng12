import { GetResourcesParams } from "../resources/resources-params";

export class GetCamerasParams extends GetResourcesParams {

  /**在线状态 */
  OnlineStatus?: number;
  /**摄像机类型 */
  CameraTypes?: number[];
  /**摄像机状态 */
  CameraState?: number;
  /** */
  IPAddress?: string;
  /**是否PTZ可控 */
  PTZControllable?: boolean;
  /**是否可存储的 */
  Storable?: boolean;
  /**AI模型ID列表 */
  AIModelIds?: string[];
  /**编码设备ID列表 */
  EncodeDeviceIds?: string[];

}