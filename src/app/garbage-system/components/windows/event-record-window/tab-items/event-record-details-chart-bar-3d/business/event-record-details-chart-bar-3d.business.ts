import { Injectable } from '@angular/core';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { EventType } from 'src/app/enum/event-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { EventNumberStatisticModel } from '../../event-record-window-details/event-record-window-details.model';
import { EventRecordDetailsChartBarD3Args } from '../event-record-details-chart-bar-3d.model';
import { EventRecordDetailsChartBarD3DivisionBusiness } from './event-record-details-chart-bar-3d-division.business';
import { EventRecordDetailsChartBarD3StationBusiness } from './event-record-details-chart-bar-3d-station.business';

@Injectable()
export class EventRecordDetailsChartBarD3Business {
  constructor(
    private division: EventRecordDetailsChartBarD3DivisionBusiness,
    private station: EventRecordDetailsChartBarD3StationBusiness,
    private global: GlobalStorageService
  ) {}

  async load(args: EventRecordDetailsChartBarD3Args) {
    let datas = [];
    switch (args.unit) {
      case TimeUnit.Month:
        datas = await this.month(args);
        break;
      default:
        throw new Error('Method not implemented.');
    }
    let models = datas.map((x) => {
      return this.convert(x, args.type, args.unit);
    });
    return models;
  }

  month(args: EventRecordDetailsChartBarD3Args) {
    if (args.stationId) {
      return this.station.history(args.stationId, args.duration);
    }
    let divisionId = args.divisonId;
    if (!divisionId) {
      divisionId = this.global.divisionId;
    }
    return this.division.history(divisionId, args.duration);
  }

  year() {}

  convert(data: EventNumberStatisticModel, type: EventType, unit: TimeUnit) {
    if (data.EventNumbers) {
      let item = data.EventNumbers.find((x) => x.EventType === type);
      if (item) {
        let value =
          unit === TimeUnit.Hour ? item.DeltaNumber ?? 0 : item.DayNumber;
        return value;
      }
    }
    return null;
  }
}
