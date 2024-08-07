import { Injectable } from '@angular/core';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { EventType } from 'src/app/enum/event-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';

import { EventNumberStatisticModel } from '../../../event-record-window/tab-items/event-record-window-details/event-record-window-details.model';
import {
  DetailsChartHeatmapArgs,
  DetailsChartHeatmapModel,
} from '../details-chart-heatmap.model';
import { DetailsChartHeatmapDivisionBusiness } from './details-chart-heatmap-division.business';
import { DetailsChartHeatmapStationBusiness } from './details-chart-heatmap-station.business';

@Injectable()
export class DetailsChartHeatmapBusiness {
  constructor(
    private division: DetailsChartHeatmapDivisionBusiness,
    private station: DetailsChartHeatmapStationBusiness,
    private global: GlobalStorageService
  ) {}

  async load(args: DetailsChartHeatmapArgs) {
    let datas = [];
    let unit = TimeUnit.Hour;
    switch (args.unit) {
      case TimeUnit.Month:
        datas = await this.month(args);
        unit = TimeUnit.Hour;
        break;
      case TimeUnit.Year:
        datas = await this.year(args);
        unit = TimeUnit.Day;
        break;
      default:
        throw new Error('Method not implemented.');
    }

    let models = datas.map((x) => {
      return this.convert(x, args.type, unit);
    });
    return models;
  }

  async month(args: DetailsChartHeatmapArgs) {
    if (args.stationId) {
      return this.station.month(args.stationId, args.duration);
    }
    let divisionId = args.divisonId;
    if (!divisionId) {
      let division = await this.global.division.promise.selected;
      divisionId = division.Id;
    }
    return this.division.month(divisionId, args.duration);
  }

  async year(args: DetailsChartHeatmapArgs) {
    if (args.stationId) {
      return this.station.year(args.stationId, args.duration);
    }
    let divisionId = args.divisonId;
    if (!divisionId) {
      let division = await this.global.division.promise.selected;
      divisionId = division.Id;
    }
    return this.division.year(divisionId, args.duration);
  }

  convert(data: EventNumberStatisticModel, type: EventType, unit: TimeUnit) {
    let model: DetailsChartHeatmapModel = {
      time: data.Time,
    };
    if (data.EventNumbers) {
      let item = data.EventNumbers.find((x) => x.EventType === type);
      if (item) {
        if (unit === TimeUnit.Hour) {
          model.value = item.DeltaNumber ?? 0;
        } else {
          model.value = item.DayNumber;
        }
      }
    }

    return model;
  }
}
