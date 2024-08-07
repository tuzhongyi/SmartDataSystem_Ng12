import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { GarbageStationStatisticTableService } from './garbage-station-statistic-table.service';
import { GarbageStationStatisticArrayConverter } from './garbage-station-statistic.converter';
import {
  GarbageStationStatisticModel,
  GarbageStationStatisticTableSource,
} from './garbage-station-statistic.model';

@Injectable()
export class GarbageStationStatisticTableBusiness
  implements
    IBusiness<
      GarbageStationStatisticTableSource,
      GarbageStationStatisticModel[]
    >
{
  constructor(
    private storeService: GlobalStorageService,
    private service: GarbageStationStatisticTableService,
    private converter: GarbageStationStatisticArrayConverter
  ) {}

  async load(
    date: Date,
    unit: TimeUnit,
    divisionId?: string
  ): Promise<GarbageStationStatisticModel[]> {
    if (!divisionId) {
      let division = await this.storeService.division.promise.selected;
      divisionId = division.Id;
    }
    let data = await this.getData(divisionId, date, unit);

    let model = await this.converter.Convert(data);
    return model;
  }
  async getData(
    divisionId: string,
    date: Date,
    unit: TimeUnit
  ): Promise<GarbageStationStatisticTableSource> {
    switch (unit) {
      case TimeUnit.Year:
        return this.service.getDataByYear(divisionId, date);
      case TimeUnit.Month:
        return this.service.getDataByMonth(divisionId, date);
      case TimeUnit.Week:
        return this.service.getDataByWeek(divisionId, date);
      case TimeUnit.Day:
      default:
        return this.service.getDataByDay(divisionId, date);
    }
  }
}
