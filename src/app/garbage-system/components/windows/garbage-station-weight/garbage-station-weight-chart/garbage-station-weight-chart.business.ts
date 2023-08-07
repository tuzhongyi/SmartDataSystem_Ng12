import { Injectable } from '@angular/core';
import { ITimeDataGroup } from 'src/app/common/components/charts/chart.model';
import { ExportTool } from 'src/app/common/tools/export.tool';
import { Language } from 'src/app/common/tools/language';
import { ExportType } from 'src/app/enum/export-type.enum';
import { GarbageStationWeightChartConfigBusiness } from './garbage-station-weight-chart-business/garbage-station-weight-chart-config.business';
import { GarbageStationWeightChartConverter } from './garbage-station-weight-chart-business/garbage-station-weight-chart.converter';
import { GarbageStationWeightChartDownloadConverter } from './garbage-station-weight-chart-download.converter';
import { GarbageStationWeightChartArgs } from './garbage-station-weight-chart.model';
import { GarbageStationWeightChartService } from './garbage-station-weight-chart.service';

@Injectable()
export class GarbageStationWeightChartBusiness {
  constructor(
    private config: GarbageStationWeightChartConfigBusiness,
    private service: GarbageStationWeightChartService,
    private tool: ExportTool
  ) {}
  converter = {
    model: new GarbageStationWeightChartConverter(),
  };
  async load(args: GarbageStationWeightChartArgs) {
    return this.config.load(args);
  }

  divisions() {
    return this.service.division.list();
  }
  division(id: string) {
    return this.service.division.get(id);
  }
  stations(divisionId: string) {
    return this.service.station.list(divisionId);
  }
  // 2023年07月31日 至 2023年08月06日 五角场街道 垃圾称重.xlsx
  download(
    type: ExportType,
    args: GarbageStationWeightChartArgs,
    data: ITimeDataGroup<number>
  ) {
    let title = `${Language.Date(args.date, args.unit)} ${data.Name} 垃圾称重`;
    let headers = [
      '序号',
      '日期',
      '时间',
      Language.GarbageType(args.type.garbage),
    ];
    let converter = new GarbageStationWeightChartDownloadConverter();
    this.tool.export(type, title, headers, data, converter, args);
  }
}
