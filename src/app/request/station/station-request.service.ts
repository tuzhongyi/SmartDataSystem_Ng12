import { Injectable } from '@angular/core';
import { Station } from 'src/app/model/station.model';
import { HowellResponse } from 'src/app/model/howell-response.model';
import { PagedList } from 'src/app/model/page-list.model';
import { HowellAuthHttpService } from '../howell-auth-http.service';
import { ServiceHelper } from '../service-helper';
import { StationParams } from './station-request.params';
import { StationUrl } from 'src/app/url/station.url';
import { IBusiness } from 'src/app/business/Ibusiness';

@Injectable({
  providedIn: 'root',
})
export class StationRequestService implements IBusiness {
  constructor(private _howellHttpService: HowellAuthHttpService) {}

  async list(params: StationParams = new StationParams()) {
    let response = await this._howellHttpService
      .post<StationParams, HowellResponse<PagedList<Station>>>(
        StationUrl.list(),
        params
      )
      .toPromise();
    return ServiceHelper.ResponseProcess(response, Station);
  }
}
