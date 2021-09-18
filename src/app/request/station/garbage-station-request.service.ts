/*
 * @Author: zzl
 * @Date: 2021-09-16 10:05:08
 * @Last Modified by:   zzl
 * @Last Modified time: 2021-09-16 10:05:08
 */
import { Injectable } from '@angular/core';
import { HowellResponse } from 'src/app/model/howell-response.model';
import { PagedList, Page } from 'src/app/model/page-list.model';
import { HowellAuthHttpService } from '../howell-auth-http.service';
import { ServiceHelper } from '../service-helper';
import { StationParams } from './garbage-station-request.params';
import { StationUrl } from 'src/app/url/station.url';
import { IBusiness } from 'src/app/business/Ibusiness';
import { plainToClass } from 'class-transformer';
import { GarbageStation } from 'src/app/model/garbage-station.model';

@Injectable({
  providedIn: 'root',
})
export class StationRequestService implements IBusiness<GarbageStation> {
  constructor(private _howellHttpService: HowellAuthHttpService) {}
  get(): Promise<GarbageStation> {
    throw new Error('Method not implemented.');
  }
  update(data: GarbageStation): Promise<GarbageStation> {
    throw new Error('Method not implemented.');
  }

  async list(
    params: StationParams = new StationParams()
  ): Promise<PagedList<GarbageStation>> {
    let response = await this._howellHttpService
      .post<StationParams, HowellResponse<PagedList<GarbageStation>>>(
        StationUrl.list(),
        params
      )
      .toPromise();

    return ServiceHelper.ResponseProcess(response, GarbageStation);
  }
}
