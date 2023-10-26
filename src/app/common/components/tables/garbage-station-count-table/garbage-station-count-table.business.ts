import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { LocaleCompare } from 'src/app/common/tools/locale-compare';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { DivisionModel } from './garbage-station-count-table.model';
import { GarbageStationCountTableService } from './garbage-station-count-table.service';

@Injectable()
export class GarbageStationCountTableBusiness
  implements IBusiness<Division[], DivisionModel[]>
{
  constructor(
    private service: GarbageStationCountTableService,
    private global: GlobalStorageService
  ) {}
  async load(...args: any): Promise<DivisionModel[]> {
    let data = await this.getData(this.global.divisionId);
    data = data.sort((a, b) => {
      return LocaleCompare.compare(a.Name, b.Name);
    });
    let model = data.map((x) => this.convert(x));
    return model;
  }

  convert(source: Division) {
    let plain = instanceToPlain(source);
    let model = plainToInstance(DivisionModel, plain);
    model.GarbageStations = this.stations(model.Id);
    return model;
  }

  async getData(divisionId: string): Promise<Division[]> {
    let all = await this.service.division.cache.all();
    return all.filter((x) => x.ParentId === divisionId);
  }

  async stations(divisionId: string) {
    let all = await this.service.station.cache.all();
    return all.filter((x) => x.DivisionId === divisionId) ?? [];
  }
}
