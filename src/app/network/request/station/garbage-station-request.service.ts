/*
 * @Author: zzl
 * @Date: 2021-09-16 10:05:08
 * @Last Modified by:   zzl
 * @Last Modified time: 2021-09-16 10:05:08
 */
import { Injectable } from '@angular/core';
import { PagedList, Page } from 'src/app/model/page-list.model';
import { HowellAuthHttpService } from '../howell-auth-http.service';
import { StationParams } from './garbage-station-request.params';
import { IBusiness } from 'src/app/business/Ibusiness';
import { GarbageStation } from 'src/app/model/garbage-station.model';
import { GarbageStationUrl } from '../url/garbage/garbage-station.url';
import { RequestBase } from '../request-base';

@Injectable({
  providedIn: 'root',
})
export class StationRequestService
  extends RequestBase<GarbageStation>
  implements IBusiness<GarbageStation>
{
  constructor(private _howellHttpService: HowellAuthHttpService) {
    super(_howellHttpService, GarbageStation);
  }
  get(id: string): Promise<GarbageStation> {
    let url = GarbageStationUrl.item(id);
    return super.get(url);
  }
  update(data: GarbageStation): Promise<GarbageStation> {
    let url = GarbageStationUrl.basic();
    return super.put(url, data);
  }
  create(data: GarbageStation): Promise<GarbageStation> {
    let url = GarbageStationUrl.basic();
    return super.post(url, data);
  }
  delete(id: string): Promise<GarbageStation> {
    let url = GarbageStationUrl.item(id);
    return super.delete(url);
  }
  async list(
    params: StationParams = new StationParams()
  ): Promise<PagedList<GarbageStation>> {
    let url = GarbageStationUrl.list();
    return super.postList(url, params);
  }
}
