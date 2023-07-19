import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { Language } from 'src/app/common/tools/language';
import { EventType } from 'src/app/enum/event-type.enum';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station-number-statistic.model';

import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { PointInfoPanelConverter } from './point-info-panel.converter';
import {
  PointInfoPanelModel,
  PointInfoPanelModelStatistic,
} from './point-info-panel.model';

@Injectable()
export class PointInfoPanelBusiness
  implements IBusiness<GarbageStation, PointInfoPanelModel>
{
  constructor(
    private service: GarbageStationRequestService,
    private divisionService: DivisionRequestService
  ) {}

  Converter = new PointInfoPanelConverter();
  async load(source: GarbageStation): Promise<PointInfoPanelModel> {
    let model = this.Converter.Convert(source, {
      division: (id: string) => {
        return this.divisionService.get(id);
      },
      statistic: (id: string) => {
        return this.service.statistic.number.get(id);
      },
    });
    return model;
  }
  getData(...args: any): Promise<GarbageStation> {
    throw new Error('Method not implemented.');
  }
}
