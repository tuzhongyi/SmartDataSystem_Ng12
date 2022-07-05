import { GetResourcesParams } from "../resources/resources-params";
export class GetEncodeDevicesParams extends GetResourcesParams {
  /**在线状态 */
  OnlineStatus?: number;
  /**型号 */
  Model?: string;
  /**序列号 */
  SerialNumber?: string;
  /**设备类型 */
  DeviceType?: string;
  /**IP地址 */
  IPAddress?: string;
}
