import { Injectable } from '@angular/core';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
@Injectable()
export class DivisionTreeService {
  divisions = new Array<Division>();
  garbageStations = new Array<GarbageStation>();

  constructor(
    private divisionService: DivisionRequestService,
    private garbageStationService: GarbageStationRequestService
  ) {}

  async requestGarbageStation(ancestorId: string, divisionId?: string) {
    const param = new GetGarbageStationsParams();
    param.PageIndex = 1;
    if (ancestorId) param.AncestorId = ancestorId;
    if (divisionId) param.DivisionId = divisionId;
    const response = await this.garbageStationService.list(param);
    return response.Data;
  }

  /**
   * 获取区划列表
   * @returns
   */
  async requestDivision() {
    return await this.divisionService.cache.all();
  }
}
