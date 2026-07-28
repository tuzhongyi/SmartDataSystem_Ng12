import { Injectable } from '@angular/core';
import { IPromiseConverter } from 'src/app/common/interfaces/converter.interface';
import { EventType } from 'src/app/enum/event-type.enum';

import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station/garbage-station-number-statistic-v2.model';
import { NumberStatisticV2Type } from 'src/app/view-model/types/number-statistic-v2.type';
import { EventRecordCountTableDivisionBusiness } from './event-record-count-table-division.business';
import { EventRecordCountTableStationBusiness } from './event-record-count-table-station.business';
import { EventRecordCountTableModel } from './event-record-count-table.model';

@Injectable()
export class EventRecordCountTableConverter implements IPromiseConverter<
  NumberStatisticV2Type[],
  EventRecordCountTableModel[]
> {
  private service: {
    division: EventRecordCountTableDivisionBusiness;
    station: EventRecordCountTableStationBusiness;
  };
  constructor(
    division: EventRecordCountTableDivisionBusiness,
    station: EventRecordCountTableStationBusiness,
  ) {
    this.service = {
      division: division,
      station: station,
    };
    this.item = new EventRecordItemCountTableConverter(this.service);
  }

  private item: EventRecordItemCountTableConverter;

  async Convert(
    source: NumberStatisticV2Type[],
    eventType: EventType,
  ): Promise<EventRecordCountTableModel[]> {
    let array: EventRecordCountTableModel[] = [];
    for (let i = 0; i < source.length; i++) {
      try {
        const item = await this.item.Convert(source[i], eventType);
        array.push(item);
      } catch (error) {
        console.error(error, this, source[i]);
      }
    }
    return array;
  }
}

export class EventRecordItemCountTableConverter implements IPromiseConverter<
  NumberStatisticV2Type,
  EventRecordCountTableModel
> {
  constructor(
    private service: {
      division: EventRecordCountTableDivisionBusiness;
      station: EventRecordCountTableStationBusiness;
    },
  ) {}

  async Convert(
    source: NumberStatisticV2Type,
    eventType: EventType,
  ): Promise<EventRecordCountTableModel> {
    let model = new EventRecordCountTableModel();
    model.id = source.Id;
    model.name = source.Name;

    if (source.EventNumbers) {
      let eventNumber = source.EventNumbers.find(
        (x) => x.EventType === eventType,
      );
      if (eventNumber) {
        model.value = eventNumber.DayNumber;
      }
    }

    if (source instanceof GarbageStationNumberStatisticV2) {
      model.parent = await this.get.parent.station(source.Id);
      model.community = await this.get.community(source.Id);
    } else {
      model.parent = await this.get.parent.division(source.Id);
    }

    return model;
  }

  get = {
    community: async (stationId: string) => {
      let station = await this.service.station.get(stationId);
      return station.CommunityName;
    },
    parent: {
      station: async (stationId: string) => {
        let station = await this.service.station.get(stationId);
        if (station.DivisionId) {
          return await this.service.division.get(station.DivisionId);
        }
        return undefined;
      },
      division: async (divisionId: string) => {
        let current = await this.service.division.get(divisionId);
        if (current.ParentId)
          return this.service.division.get(current.ParentId);
        return undefined;
      },
    },
  };
}
