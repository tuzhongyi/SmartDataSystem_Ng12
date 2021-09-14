import { Injectable } from '@angular/core';
import { Division } from 'src/app/model/division.model';
import { HowellResponse } from 'src/app/model/howell-response.model';
import { PagedList } from 'src/app/model/page-list.model';
import { DivisionUrl } from '../../url/division.url';
import { DivisionsParams } from './division-request.params';
import { HowellAuthHttpService } from '../howell-auth-http.service';
import { ServiceHelper } from '../service-helper';
import { IBusiness } from 'src/app/business/Ibusiness';

@Injectable({
  providedIn: 'root',
})
export class DivisionRequestService implements IBusiness {
  constructor(private _howellHttpService: HowellAuthHttpService) {}

  async list(
    params: DivisionsParams = new DivisionsParams()
  ): Promise<PagedList<Division>> {
    debugger;
    params.AncestorId = '310109011000';
    params.DivisionType = 4;
    let response = await this._howellHttpService
      .post<DivisionsParams, HowellResponse<PagedList<Division>>>(
        DivisionUrl.list(),
        params
      )
      .toPromise();
    console.log('response', response);
    return ServiceHelper.ResponseProcess(response, Division);
  }
}
