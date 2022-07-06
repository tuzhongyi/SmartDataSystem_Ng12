import { ProtocolType } from "src/app/enum/protocol-type.enum";

/**协议类型 */
export class Protocol {
  /**协议名称 */
  Name!: string;
  /**协议类型 */
  ProtocolType!: ProtocolType;
  /**默认连接地址 */
  Url!: string;
  /**服务名称 */
  ServiceName!: string;
  /**默认用户名(可选) */
  Username?: string;
  /**默认密码(可选) */
  Password?: string;


}