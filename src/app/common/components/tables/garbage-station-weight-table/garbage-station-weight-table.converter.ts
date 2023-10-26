import { Injectable } from '@angular/core';
import { GarbageType } from 'src/app/enum/garbage-type.enum';
import { DivisionNumberStatisticV2 } from 'src/app/network/model/garbage-station/division-number-statistic-v2.model';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station/garbage-station-number-statistic-v2.model';
import { GarbageStationWeightTableModel } from './garbage-station-weight-table.model';
import { GarbageStationWeightTableService } from './garbage-station-weight-table.service';

@Injectable()
export class GarbageStationWeightTableConverter {
  constructor(private service: GarbageStationWeightTableService) {}
  convert(source: GarbageStationNumberStatisticV2 | DivisionNumberStatisticV2) {
    if (source instanceof GarbageStationNumberStatisticV2) {
      return this.fromstation(source);
    } else {
      return this.fromdivision(source);
    }
  }

  private fromdivision(source: DivisionNumberStatisticV2) {
    let model = new GarbageStationWeightTableModel();
    model.name = source.Name;
    let division = this.service.division.get(source.Id);
    division.then((station) => {
      if (station.ParentId) {
        model.division = this.service.division.get(station.ParentId);
      }
    });
    if (source.GarbageWeights) {
      for (let i = 0; i < source.GarbageWeights.length; i++) {
        const item = source.GarbageWeights[i];

        switch (item.GarbageType) {
          case GarbageType.Dry:
            model.weight.dry = parseFloat(item.DayWeight.toFixed(2));
            break;
          case GarbageType.Wet:
            model.weight.wet = parseFloat(item.DayWeight.toFixed(2));
            break;
          default:
            break;
        }
      }
    }
    return model;
  }

  private fromstation(source: GarbageStationNumberStatisticV2) {
    let model = new GarbageStationWeightTableModel();
    model.name = source.Name;
    let station = this.service.station.get(source.Id);
    station.then((station) => {
      if (station.DivisionId) {
        model.division = this.service.division.get(station.DivisionId);
      }
    });
    if (source.GarbageWeights) {
      for (let i = 0; i < source.GarbageWeights.length; i++) {
        const item = source.GarbageWeights[i];

        switch (item.GarbageType) {
          case GarbageType.Dry:
            model.weight.dry = parseFloat(item.DayWeight.toFixed(2));
            break;
          case GarbageType.Wet:
            model.weight.wet = parseFloat(item.DayWeight.toFixed(2));
            break;
          default:
            break;
        }
      }
    }
    return model;
  }
}
