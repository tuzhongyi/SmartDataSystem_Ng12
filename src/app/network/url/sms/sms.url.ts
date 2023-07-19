import { SmsProtocolType } from 'src/app/enum/sms-protocol-type.enum';
import { AbstractUrl } from '../abstract.url';
import { BaseUrl } from '../base.url';

export class SmsUrl extends AbstractUrl {
  private static url = new SmsUrl(BaseUrl.garbage.sms);
  static authcodes(phoneNo: string, protocolType?: SmsProtocolType) {
    let type = '';
    if (protocolType) {
      type = `&ProtocolType=${protocolType}`;
    }
    return `${this.url}/AuthCodes?PhoneNo=${phoneNo}${type}`;
  }
}
