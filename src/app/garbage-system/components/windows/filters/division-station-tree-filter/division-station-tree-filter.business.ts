import { Injectable } from '@angular/core';
import { DivisionTreeSource } from 'src/app/common/components/division-tree/division-tree.model';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';

import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';

@Injectable()
export class DivisionStationTreeFilterBusiness
  implements IBusiness<DivisionTreeSource[]>
{
  constructor(
    private divisionService: DivisionRequestService,
    private stationService: GarbageStationRequestService,
    private global: GlobalStorageService
  ) {}

  load(type: DivisionType, stationId?: string): Promise<DivisionTreeSource[]> {
    return this.getData(type, stationId, this.global.divisionId);
  }
  async getData(
    type: DivisionType,
    stationId?: string,
    divisionId?: string
  ): Promise<DivisionTreeSource[]> {
    let station: GarbageStation | undefined = undefined;
    if (stationId) {
      station = await this.stationService.cache.get(stationId);
    } else {
      let params = new GetGarbageStationsParams();
      params.PageSize = 1;
      params.DivisionId = divisionId;
      let stationPaged = await this.stationService.list(params);
      station = stationPaged.Data[0];
    }

    let array = new Array();
    array.push(station);

    if (station.DivisionId) {
      let division = await this.getDivision(station.DivisionId);
      array.unshift(division);

      while (division.ParentId) {
        division = await this.getDivision(division.ParentId);
        array.unshift(division);
        if (division.DivisionType === type) {
          break;
        }
      }
    }

    return array;
  }

  getDivision(divisionId: string) {
    return this.divisionService.cache.get(divisionId);
  }
}
