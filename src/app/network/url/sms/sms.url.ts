import { SmsProtocolType } from "src/app/enum/sms-protocol-type.enum";
import { BaseGarbageUrl, BaseSmsUrl } from "../base.url";


export class SmsUrl {
  static authcodes(phoneNo: string, protocolType?: SmsProtocolType) {
    let type = "";
    if (protocolType) {
      type = `&ProtocolType=${protocolType}`;
    }
    return `${BaseSmsUrl}/AuthCodes?PhoneNo=${phoneNo}${type}`;
  }
}