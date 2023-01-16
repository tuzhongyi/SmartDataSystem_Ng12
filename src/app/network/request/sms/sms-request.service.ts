import { Injectable } from '@angular/core';
import { SmsProtocolType } from 'src/app/enum/sms-protocol-type.enum';
import { AuthCode } from '../../model/auth-code.model';
import { HowellResponse } from '../../model/howell-response.model';
import { SmsUrl } from '../../url/sms/sms.url';
import { HowellAuthHttpService } from '../howell-auth-http.service';
import { ServiceHelper } from '../service-helper';

@Injectable({
  providedIn: 'root',
})
export class SmsRequestService {
  constructor(private requestService: HowellAuthHttpService) {}

  async getAuthCodes(PhoneNo: string) {
    let response = await this.requestService
      .getHowellResponse<AuthCode>(SmsUrl.authcodes(PhoneNo))
      .toPromise();
    return ServiceHelper.ResponseProcess(response, AuthCode);
  }
  async postAuthCodes(
    phoneNo: string,
    protocolType: SmsProtocolType = SmsProtocolType.aliyun
  ) {
    let response = await this.requestService
      .post<any, HowellResponse<AuthCode>>(
        SmsUrl.authcodes(phoneNo, protocolType)
      )
      .toPromise();
    return ServiceHelper.ResponseProcess(response, AuthCode);
  }
}
