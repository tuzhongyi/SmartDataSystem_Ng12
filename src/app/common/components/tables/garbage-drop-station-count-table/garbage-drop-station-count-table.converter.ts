import { IPromiseConverter } from 'src/app/common/interfaces/converter.interface';
import { EventType } from 'src/app/enum/event-type.enum';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station-number-statistic-v2.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { ConvertGetter } from 'src/app/view-model/converter-getter.model';
import { NumberStatisticV2Type } from 'src/app/view-model/types/number-statistic-v2.type';
import { GarbageDropStationCountTableModel } from './garbage-drop-station-count-table.model';

export class GarbageDropStationCountTableConverter
  implements
    IPromiseConverter<
      NumberStatisticV2Type[],
      GarbageDropStationCountTableModel[]
    >
{
  converter = {
    item: new GarbageDropStationCountTableItemConverter(),
  };

  async Convert(
    source: NumberStatisticV2Type[],
    getter: ConvertGetter,
    ...res: any[]
  ): Promise<GarbageDropStationCountTableModel[]> {
    let array: GarbageDropStationCountTableModel[] = [];
    for (let i = 0; i < source.length; i++) {
      let item = await this.converter.item.Convert(source[i], getter);
      array.push(item);
    }
    return array;
  }
}

export class GarbageDropStationCountTableItemConverter
  implements
    IPromiseConverter<NumberStatisticV2Type, GarbageDropStationCountTableModel>
{
  async Convert(
    source: NumberStatisticV2Type,
    getter: ConvertGetter
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
        (x) => x.EventType === EventType.GarbageDropTimeout
      );
      if (eventNumber) {
        model.TimeoutCount = eventNumber.DayNumber;
      }
    }

    if (model.EventCount > 0) {
      model.TimeoutRatio = (model.TimeoutCount / model.EventCount) * 100;
    }

    if (source instanceof GarbageStationNumberStatisticV2) {
      model.Parent = await this.GetParentByStation(source.Id, getter);
    } else {
      model.Parent = await this.GetParentByDivision(source.Id, getter);
    }
    return model;
  }

  async GetParentByStation(stationId: string, getter: ConvertGetter) {
    if (getter.station) {
      let station = await getter.station(stationId);
      if (station.DivisionId && getter.division) {
        return await getter.division(station.DivisionId);
      }
    }
    return undefined;
  }
  async GetParentByDivision(divisionId: string, getter: ConvertGetter) {
    if (getter.division) {
      let current = await getter.division(divisionId);
      if (current.ParentId) return getter.division(current.ParentId);
    }
    return undefined;
  }
}
