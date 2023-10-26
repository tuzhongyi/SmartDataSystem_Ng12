import { Injectable } from '@angular/core';
import { IPromiseConverter } from 'src/app/common/interfaces/converter.interface';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { EventType } from 'src/app/enum/event-type.enum';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station/garbage-station-number-statistic-v2.model';
import { NumberStatisticV2Type } from 'src/app/view-model/types/number-statistic-v2.type';
import { GarbageDropStationCountTableModel } from './garbage-drop-station-count-table.model';
import { GarbageDropStationCountTableService } from './garbage-drop-station-count-table.service';

@Injectable()
export class GarbageDropStationCountTableConverter
  implements
    IPromiseConverter<
      NumberStatisticV2Type[],
      GarbageDropStationCountTableModel[]
    >
{
  constructor(private service: GarbageDropStationCountTableService) {}

  converter = {
    item: new GarbageDropStationCountTableItemConverter(this.service),
  };

  async Convert(
    source: NumberStatisticV2Type[],
    divisionType: DivisionType,
    ...res: any[]
  ): Promise<GarbageDropStationCountTableModel[]> {
    let array: GarbageDropStationCountTableModel[] = [];
    for (let i = 0; i < source.length; i++) {
      let item = await this.converter.item.Convert(source[i], divisionType);
      array.push(item);
    }
    return array;
  }
}

export class GarbageDropStationCountTableItemConverter
  implements
    IPromiseConverter<NumberStatisticV2Type, GarbageDropStationCountTableModel>
{
  constructor(private service: GarbageDropStationCountTableService) {}
  async Convert(
    source: NumberStatisticV2Type,
    divisionType: DivisionType
  ): Promise<GarbageDropStationCountTableModel> {
    let model = new GarbageDropStationCountTableModel();
    model.Id = source.Id;
    model.Name = source.Name;

    if (source.EventNumbers) {
      let eventNumber = source.EventNumbers.find(
        (x) => x.EventType === EventType.GarbageDrop
      );
      if (eventNumber) {
        model.EventCount = eventNumber.DayNumber;
      }

      eventNumber = source.EventNumbers.find(
        (x) =>
          x.EventType ==
          (divisionType === DivisionType.City
            ? EventType.GarbageDropSuperTimeout
            : EventType.GarbageDropTimeout)
      );
      if (eventNumber) {
        model.TimeoutCount = eventNumber.DayNumber;
      }
    }
    if (model.EventCount > 0) {
      model.TimeoutRatio = (model.TimeoutCount / model.EventCount) * 100;
    }
    model.TimeinRatio = 100;

    if (model.EventCount > 0) {
      model.TimeinRatio =
        ((model.EventCount - model.TimeoutCount) / model.EventCount) * 100;
    }

    if (source instanceof GarbageStationNumberStatisticV2) {
      model.Parent = this.GetParentByStation(source.Id);
    } else {
      model.Parent = this.GetParentByDivision(source.Id);
    }
    return model;
  }

  async GetParentByStation(stationId: string) {
    let station = await this.service.station.get(stationId);
    if (station.DivisionId) {
      return this.service.division.get(station.DivisionId!);
    }
    return undefined;
  }
  async GetParentByDivision(divisionId: string) {
    let current = await this.service.division.get(divisionId);
    if (current.ParentId) {
      return this.service.division.get(current.ParentId);
    }
    return undefined;
  }
}
