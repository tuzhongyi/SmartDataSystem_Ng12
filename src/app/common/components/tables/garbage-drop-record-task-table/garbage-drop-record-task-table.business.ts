import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { DivisionNumberStatisticV2 } from 'src/app/network/model/garbage-station/division-number-statistic-v2.model';
import { DivisionNumberStatistic } from 'src/app/network/model/garbage-station/division-number-statistic.model';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station/garbage-station-number-statistic-v2.model';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station/garbage-station-number-statistic.model';
import { GarbageDropRecordFilter } from '../garbage-drop-record-table/garbage-drop-record.model';
import { GarbageDropRecordTaskTableConverter } from './garbage-drop-record-task-table.converter';
import {
  GarbageDropRecordTaskTableModel,
  IDivision,
  IGarbageDropRecordTaskTableBusiness,
} from './garbage-drop-record-task-table.model';
import { GarbageDropRecordTaskTableService } from './garbage-drop-record-task-table.service';

@Injectable()
export class GarbageDropRecordTaskTableBusiness
  implements
    IGarbageDropRecordTaskTableBusiness,
    IBusiness<
      | Array<DivisionNumberStatistic | DivisionNumberStatisticV2>
      | Array<GarbageStationNumberStatistic | GarbageStationNumberStatisticV2>,
      GarbageDropRecordTaskTableModel[]
    >
{
  division: IDivision;

  constructor(
    private service: GarbageDropRecordTaskTableService,
    private converter: GarbageDropRecordTaskTableConverter,
    private global: GlobalStorageService
  ) {
    this.division = {
      Id: this.global.divisionId,
      DivisionType: this.global.divisionType,
    };
  }

  async load(args: GarbageDropRecordFilter) {
    if (args.divisionId) {
      this.division = await this.service.division.get(args.divisionId);
    }
    let datas = await this.getData(this.division, args);
    let model = datas.map((x) => this.converter.Convert(x));
    return model;
  }

  total(datas: GarbageDropRecordTaskTableModel[]) {
    let model = new GarbageDropRecordTaskTableModel();
    model.name = this.division.Name ?? '';
    if (!model.name) {
      this.service.division.get(this.division.Id).then((x) => {
        model.name = x.Name;
      });
    }
    for (let i = 0; i < datas.length; i++) {
      model.count += datas[i].count;
      model.unhandle += datas[i].unhandle;
      model.timeout += datas[i].timeout;
    }
    let complete = model.count - model.unhandle;

    model.ratio = `${
      model.count > 0 ? ((complete / model.count) * 100).toFixed(2) : 100
    }%`;
    return model;
  }

  getData(division: IDivision, args: GarbageDropRecordFilter) {
    if (division.DivisionType === DivisionType.Committees) {
      if (args.duration) {
        return this.service.station.history(division, args);
      } else {
        return this.service.station.today(division, args);
      }
    } else {
      if (args.duration) {
        return this.service.division.history(division, args);
      } else {
        return this.service.division.today(division, args);
      }
    }
  }
}
