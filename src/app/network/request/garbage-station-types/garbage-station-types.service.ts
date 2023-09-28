import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GarbageStationType } from '../../model/garbage-station.model';
import { GarbageStationTypesUrls } from '../../url/aiop/garbage-management/garbage-stations/types/garbage-station-types.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../base-request-howell.service';
import { HowellAuthHttpService } from '../howell-auth-http.service';

@Injectable({
  providedIn: 'root',
})
export class GarbageStationTypesService {
  private basic: HowellBaseRequestService;
  private type: HowellBaseTypeRequestService<GarbageStationType>;

  constructor(http: HowellAuthHttpService, router: Router) {
    this.basic = new HowellBaseRequestService(http, router);
    this.type = this.basic.type(GarbageStationType);
  }
  list(): Promise<GarbageStationType[]> {
    return this.type.getArray(GarbageStationTypesUrls.list());
  }
  create(type: GarbageStationType): Promise<GarbageStationType> {
    return this.type.post(GarbageStationTypesUrls.create());
  }

  get(id: string): Promise<GarbageStationType> {
    return this.type.get(GarbageStationTypesUrls.item(id));
  }
  update(type: GarbageStationType): Promise<GarbageStationType> {
    return this.type.put(
      GarbageStationTypesUrls.item(type.Type.toString()),
      type
    );
  }
  delete(type: number): Promise<GarbageStationType> {
    return this.type.delete(GarbageStationTypesUrls.item(type.toString()));
  }
}
