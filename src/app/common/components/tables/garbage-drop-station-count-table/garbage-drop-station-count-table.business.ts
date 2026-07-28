import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { DateTimeTool } from 'src/app/common/tools/date-time-tool/datetime.tool';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { NumberStatisticV2Type } from 'src/app/view-model/types/number-statistic-v2.type';
import { GarbageDropStationCountTableConverter } from './garbage-drop-station-count-table.converter';
import {
  GarbageDropStationCountTableArgs,
  GarbageDropStationCountTableModel
} from './garbage-drop-station-count-table.model';
import { GarbageDropStationCountTableDivisionService } from './service/garbage-drop-station-count-table-division.service';
import { GarbageDropStationCountTableStationService } from './service/garbage-drop-station-count-table-station.service';
import { GarbageDropStationCountTableService } from './service/garbage-drop-station-count-table.service';

@Injectable()
export class GarbageDropStationCountTableBusiness implements IBusiness<
  NumberStatisticV2Type[],
  GarbageDropStationCountTableModel[]
> {
  constructor(
    private store: GlobalStorageService,
    private service: GarbageDropStationCountTableService,
    private converter: GarbageDropStationCountTableConverter
  ) {}

  is = {
    station: false
  };

  async load(
    args: GarbageDropStationCountTableArgs
  ): Promise<GarbageDropStationCountTableModel[]> {
    let _default = await this.store.division.default;
    let data = await this.getData(args);
    let model = await this.converter.Convert(data, _default.DivisionType);
    return model;
  }
  async getData(
    args: GarbageDropStationCountTableArgs
  ): Promise<NumberStatisticV2Type[]> {
    let duration = DateTimeTool.TimeUnit(args.unit, args.date);
    let divisionId = args.parentId;
    if (!divisionId) {
      divisionId = (await this.store.division.default).Id;
    }

    if (args.type === DivisionType.None) {
      this.is.station = true;
      return this.service.station.history(divisionId, duration, args.unit);
    } else {
      this.is.station = false;
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
  GarbageDropStationCountTableConverter
];
