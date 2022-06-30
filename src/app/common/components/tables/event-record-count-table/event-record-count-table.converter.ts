import { IPromiseConverter } from 'src/app/common/interfaces/converter.interface';
import { EventType } from 'src/app/enum/event-type.enum';

import { Division } from 'src/app/network/model/division.model';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station-number-statistic-v2.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { NumberStatisticV2Type } from 'src/app/view-model/types/number-statistic-v2.type';
import { EventRecordCountTableModel } from './event-record-count-table.model';

export class EventRecordCountTableConverter
  implements
    IPromiseConverter<NumberStatisticV2Type[], EventRecordCountTableModel[]>
{
  private converter = {
    item: new EventRecordItemCountTableConverter(),
  };
  async Convert(
    source: NumberStatisticV2Type[],
    eventType: EventType,
    getter: {
      station: (id: string) => Promise<GarbageStation>;
      division: (id: string) => Promise<Division>;
    }
  ): Promise<EventRecordCountTableModel[]> {
    let array: EventRecordCountTableModel[] = [];
    for (let i = 0; i < source.length; i++) {
      try {
        const item = await this.converter.item.Convert(
          source[i],
          eventType,
          getter
        );
        array.push(item);
      } catch (error) {
        console.error(error, this, source[i]);
      }
    }
    return array;
  }
}

export class EventRecordItemCountTableConverter
  implements
    IPromiseConverter<NumberStatisticV2Type, EventRecordCountTableModel>
{
  async Convert(
    source: NumberStatisticV2Type,
    eventType: EventType,
    getter: {
      station: (id: string) => Promise<GarbageStation>;
      division: (id: string) => Promise<Division>;
    }
  ): Promise<EventRecordCountTableModel> {
    let model = new EventRecordCountTableModel();
    model.id = source.Id;
    model.name = source.Name;

    if (source.EventNumbers) {
      let eventNumber = source.EventNumbers.find(
        (x) => x.EventType === eventType
      );
      if (eventNumber) {
        model.value = eventNumber.DayNumber;
      }
    }

    if (source instanceof GarbageStationNumberStatisticV2) {
      model.parent = await this.GetParentByStation(source.Id, getter);
    } else {
      model.parent = await this.GetParentByDivision(source.Id, getter.division);
    }

    return model;
  }

  async GetParentByStation(
    stationId: string,
    getter: {
      station: (id: string) => Promise<GarbageStation>;
      division: (id: string) => Promise<Division>;
    }
  ) {
    let station = await getter.station(stationId);
    if (station.DivisionId) {
      return await getter.division(station.DivisionId);
    }
    return undefined;
  }
  async GetParentByDivision(
    divisionId: string,
    getter: (id: string) => Promise<Division>
  ) {
    let current = await getter(divisionId);
    if (current.ParentId) return getter(current.ParentId);
    return undefined;
  }
}
