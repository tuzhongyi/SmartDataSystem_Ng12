import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { NumberStatisticV2Type } from 'src/app/view-model/types/number-statistic-v2.type';
import { GarbageDropStationCountTableConverter } from './garbage-drop-station-count-table.converter';
import {
  GarbageDropStationCountTableArgs,
  GarbageDropStationCountTableModel,
} from './garbage-drop-station-count-table.model';
import { GarbageDropStationCountTableDivisionService } from './service/garbage-drop-station-count-table-division.service';
import { GarbageDropStationCountTableStationService } from './service/garbage-drop-station-count-table-station.service';
import { GarbageDropStationCountTableService } from './service/garbage-drop-station-count-table.service';

@Injectable()
export class GarbageDropStationCountTableBusiness
  implements
    IBusiness<NumberStatisticV2Type[], GarbageDropStationCountTableModel[]>
{
  constructor(
    private store: GlobalStorageService,
    private service: GarbageDropStationCountTableService,
    private converter: GarbageDropStationCountTableConverter
  ) {}
  async load(
    args: GarbageDropStationCountTableArgs
  ): Promise<GarbageDropStationCountTableModel[]> {
    let data = await this.getData(args);
    let model = await this.converter.Convert(
      data,
      this.store.defaultDivisionType
    );
    return model;
  }
  async getData(
    args: GarbageDropStationCountTableArgs
  ): Promise<NumberStatisticV2Type[]> {
    let duration = DurationParams.TimeUnit(args.unit, args.date);
    let divisionId = args.parentId;
    if (!divisionId) {
      divisionId = await this.store.defaultDivisionId;
    }

    if (args.type === DivisionType.None) {
      return this.service.station.history(divisionId, duration, args.unit);
    } else {
      return this.service.division.history(
        divisionId,
        args.type,
        duration,
        args.unit
      );
    }
  }
}

export const GarbageDropStationCountTableBusinessProviders = [
  GarbageDropStationCountTableBusiness,
  GarbageDropStationCountTableStationService,
  GarbageDropStationCountTableDivisionService,
  GarbageDropStationCountTableService,
  GarbageDropStationCountTableConverter,
];
