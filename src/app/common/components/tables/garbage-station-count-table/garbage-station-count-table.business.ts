import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { IBusiness, IGet } from 'src/app/common/interfaces/bussiness.interface';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { LocaleCompare } from 'src/app/common/tools/locale-compare';
import { DivisionNumberStatistic } from 'src/app/network/model/garbage-station/division-number-statistic.model';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { GetDivisionStatisticNumbersParams } from 'src/app/network/request/division/division-request.params';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { DivisionModel } from './garbage-station-count-table.model';
import { GarbageStationCountTableService } from './garbage-station-count-table.service';

@Injectable()
export class GarbageStationCountTableBusiness
  implements IBusiness<DivisionNumberStatistic[]>, IGet<DivisionModel>
{
  constructor(
    private service: GarbageStationCountTableService,
    private global: GlobalStorageService,
  ) {}

  async load(...args: any): Promise<DivisionNumberStatistic[]> {
    let division = await this.global.division.selected;
    return this.getData(division.Id);
  }

  convert(source: Division) {
    let plain = instanceToPlain(source);
    let model = plainToInstance(DivisionModel, plain);
    model.GarbageStations = this.stations(model.Id);
    return model;
  }

  async getData(divisionId: string): Promise<DivisionNumberStatistic[]> {
    let all = await this.service.division.cache.all();
    let divisions = all.filter((x) => x.ParentId === divisionId);
    let params = new GetDivisionStatisticNumbersParams();
    params.Ids = divisions.map((x) => x.Id);
    let paged = await this.service.division.statistic.number.cache.list(params);
    let data = paged.Data.filter((x) => x.StationNumber > 0).sort((a, b) => {
      return (
        LocaleCompare.compare(!!b.StationNumber, !!a.StationNumber) ||
        LocaleCompare.compare(a.Name, b.Name)
      );
    });
    return data;
  }

  async stations(divisionId: string) {
    let params = new GetGarbageStationsParams();
    params.AncestorId = divisionId;
    let all = await this.service.station.cache.list(params);
    return all.Data;
  }

  async get(divisionId: string): Promise<DivisionModel> {
    let data = await this.service.division.cache.get(divisionId);
    return this.convert(data);
  }
}
