import { ITimeData, ITimeDataGroup } from 'src/app/common/components/charts/chart.model';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { EventType } from 'src/app/enum/event-type.enum';
import { StatisticType } from 'src/app/enum/statistic-type.enum';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station-number-statistic-v2.model';
import { StatisticTime } from 'src/app/network/model/statistic-time.model';
import { GarbageStationNumberStatisticV2Group } from 'src/app/view-model/garbage-station-number-statistic-v2-group.model';
import { Group } from 'src/app/view-model/group.model';

export class GarbageStationWindowDetailsConverter
  implements IConverter<GarbageStationNumberStatisticV2[], ITimeDataGroup<number>[]>{
  converter = {
    group: new GroupConverter(),
    item: new GarbageStationWindowDetailsGroupConverter()
  }
  Convert(source: GarbageStationNumberStatisticV2[], type: StatisticType): ITimeDataGroup<number>[] {
    let groups = this.converter.group.Convert(source)
    return groups.map(x => {
      return this.converter.item.Convert(x, type);
    })
  }
}

class GroupConverter implements IConverter<GarbageStationNumberStatisticV2[], GarbageStationNumberStatisticV2Group[]>{
  Convert(source: GarbageStationNumberStatisticV2[], ...res: any[]): GarbageStationNumberStatisticV2Group[] {
    let group = Group.from(source, x => x.Id);
    let groups = new Array<GarbageStationNumberStatisticV2Group>();
    for (const key in group) {
      if (Object.prototype.hasOwnProperty.call(group, key)) {

        const element = group[key];
        let g = new GarbageStationNumberStatisticV2Group()
        g.Id = key;
        g.Name = element[0].Name;
        g.datas = element;
        groups.push(g);
      }
    }
    return groups;
  }

}


class GarbageStationWindowDetailsGroupConverter
  implements IConverter<GarbageStationNumberStatisticV2Group, ITimeDataGroup<number>>
{


  Convert(
    source: GarbageStationNumberStatisticV2Group,
    type: StatisticType
  ): ITimeDataGroup<number> {
    switch (type) {
      case StatisticType.garde:
        return this.fromGarbageRatio(source);
      case StatisticType.avgGarbageTime:
        return this.fromAvgDropDuration(source)
      case StatisticType.maxGarbageTime:
        return this.fromMaxDropDuration(source)
      case StatisticType.garbageDuration:
        return this.fromCountDropDuration(source)
      case StatisticType.illegalDrop:
        return this.fromEventRecord(source, EventType.IllegalDrop)
      case StatisticType.mixedInto:
        return this.fromEventRecord(source, EventType.MixedInto)
      default:
        throw new Error("type is error")
    }
  }

  fromGarbageRatio(source: GarbageStationNumberStatisticV2Group): ITimeDataGroup<number> {
    return {
      Id: source.Id,
      Name: source.Name,
      datas: source.datas.map(x => {
        return {
          time: StatisticTime.toDate(x.Time),
          value: parseFloat((x.GarbageRatio ?? 0).toFixed(2))
        }
      })
    };
  }
  fromAvgDropDuration(source: GarbageStationNumberStatisticV2Group): ITimeDataGroup<number> {
    return {
      Id: source.Id,
      Name: source.Name,
      datas: source.datas.map(x => {
        return {
          time: StatisticTime.toDate(x.Time),
          value: Math.ceil(x.AvgGarbageTime ?? 0)
        }
      })
    };
  }
  fromMaxDropDuration(source: GarbageStationNumberStatisticV2Group) {
    return {
      Id: source.Id,
      Name: source.Name,
      datas: source.datas.map(x => {
        return {
          time: StatisticTime.toDate(x.Time),
          value: Math.ceil(x.MaxGarbageTime ?? 0)
        }
      })
    };
  }
  fromCountDropDuration(source: GarbageStationNumberStatisticV2Group) {
    return {
      Id: source.Id,
      Name: source.Name,
      datas: source.datas.map(x => {
        return {
          time: StatisticTime.toDate(x.Time),
          value: Math.ceil(x.GarbageDuration ?? 0)
        }
      })
    };
  }
  fromEventRecord(source: GarbageStationNumberStatisticV2Group, eventType: EventType) {
    return {
      Id: source.Id,
      Name: source.Name,
      datas: source.datas.map(x => {
        let count = 0;
        if (x.EventNumbers) {
          for (let i = 0; i < x.EventNumbers.length; i++) {
            const event = x.EventNumbers[i];
            if (event.EventType === eventType) {
              count += event.DeltaNumber ?? 0;
            }
          }
        }
        return {
          time: StatisticTime.toDate(x.Time),
          value: count
        }
      })
    };
  }

}
