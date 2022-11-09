import { SmsProtocolType } from 'src/app/enum/sms-protocol-type.enum';
import { AbstractUrl } from '../abstract.url';
import { BasicUrl } from '../base.url';
import { UserUrl } from '../garbage/user.url';

export class SmsUrl extends AbstractUrl {
  private static url = new SmsUrl(BasicUrl.sms);
  static authcodes(phoneNo: string, protocolType?: SmsProtocolType) {
    let type = '';
    if (protocolType) {
      type = `&ProtocolType=${protocolType}`;
    }
    return `${this.url}/AuthCodes?PhoneNo=${phoneNo}${type}`;
  }
}
