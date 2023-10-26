import { Injectable } from '@angular/core';
import { ExportTool } from 'src/app/common/tools/export.tool';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { ExportType } from 'src/app/enum/export-type.enum';
import { DivisionNumberStatisticV2 } from 'src/app/network/model/garbage-station/division-number-statistic-v2.model';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station/garbage-station-number-statistic-v2.model';
import { GarbageStationWeightTableExcelConverter } from './converter/garbage-station-weight-table-excel.converter';
import { GarbageStationWeightTableConverter } from './garbage-station-weight-table.converter';
import {
  GarbageStationWeightTableArgs,
  GarbageStationWeightTableExportModel,
  GarbageStationWeightTableModel,
} from './garbage-station-weight-table.model';
import { GarbageStationWeightTableService } from './garbage-station-weight-table.service';

@Injectable()
export class GarbageStationWeightTableBusiness {
  constructor(
    private service: GarbageStationWeightTableService,
    private converter: GarbageStationWeightTableConverter,
    private exporter: ExportTool
  ) {}
  async load(args: GarbageStationWeightTableArgs) {
    let statistic: Array<
      GarbageStationNumberStatisticV2 | DivisionNumberStatisticV2
    >;
    if (args.type === DivisionType.None) {
      statistic = await this.service.station.getData(args);
    } else {
      statistic = await this.service.division.getData(args);
    }

    let model: GarbageStationWeightTableModel[] = [];

    model = statistic.map((x) => {
      return this.converter.convert(x);
    });
    return model;
  }

  async download(
    type: ExportType,
    title: string,
    headers: string[],
    models: GarbageStationWeightTableModel[]
  ) {
    let datas = models.map(async (x) => {
      let item = new GarbageStationWeightTableExportModel();
      item.name = x.name;
      item.division = await x.division;
      item.weight = x.weight;
      return item;
    });

    Promise.all(datas).then((x) => {
      let converter = new GarbageStationWeightTableExcelConverter();
      this.exporter.export(type, title, headers, x, converter);
    });
  }
}
