import { PagedParams } from '../IParams.interface';

export class GetDeviceRegistrationListParams extends PagedParams {
  /**	String[]	设备ID	O	*/
  DeviceIds?: string[];
  /**	String	设备名称，支持LIKE	O	*/
  DeviceName?: string;
  /**	String	协议类型	O	*/
  ProtocolType?: string;
  /**	String	供应商信息	O	*/
  Vendor?: string;
  /**	String	序列号：HW-GCHA01-00001	O	*/
  SerialNumber?: string;
  /**	String	接入Token	O	*/
  AccessToken?: string;
  /**	String[]	接入服务器ID	O	*/
  AccessServerId?: string[];
}
