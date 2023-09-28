import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { DapuqiaoGarbageDropStationWindowDetailsChartConverter } from './dapuqiao-garbage-drop-station-window-details-chart.converter';
import {
  DapuqiaoGarbageDropStationWindowDetailsChartArgs,
  DapuqiaoGarbageDropStationWindowDetailsChartItemKey,
  DapuqiaoGarbageDropStationWindowDetailsChartModel,
  NumberStatistic,
} from './dapuqiao-garbage-drop-station-window-details-chart.model';
import { DapuqiaoGarbageDropStationWindowDetailsChartService } from './dapuqiao-garbage-drop-station-window-details-chart.service';

@Injectable()
export class DapuqiaoGarbageDropStationWindowDetailsChartBusiness
  implements
    IBusiness<
      NumberStatistic[],
      DapuqiaoGarbageDropStationWindowDetailsChartModel
    >
{
  constructor(
    private service: DapuqiaoGarbageDropStationWindowDetailsChartService,
    private global: GlobalStorageService,
    private converter: DapuqiaoGarbageDropStationWindowDetailsChartConverter
  ) {}

  async load(
    args: DapuqiaoGarbageDropStationWindowDetailsChartArgs,
    key: DapuqiaoGarbageDropStationWindowDetailsChartItemKey
  ): Promise<DapuqiaoGarbageDropStationWindowDetailsChartModel> {
    if (!args.divisionId) {
      args.divisionId = await this.global.defaultDivisionId;
    }
    let datas = await this.getData(args);

    let model = new DapuqiaoGarbageDropStationWindowDetailsChartModel();
    model.data = this.converter.data.convert(datas, key);
    model.x = this.converter.x.convert(args.date, args.unit);
    return model;
  }
  getData(
    args: DapuqiaoGarbageDropStationWindowDetailsChartArgs
  ): Promise<NumberStatistic[]> {
    return this.service.history(args);
  }

  async stations(divisionId?: string) {
    return this.service.stations(divisionId);
  }
}
