import { ITimeData } from 'src/app/common/components/charts/chart.model';
import { Language } from 'src/app/common/tools/language';
import { EventType } from 'src/app/enum/event-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import {
  IIdNameModel,
  IModel,
  IdNameModel,
} from 'src/app/network/model/model.interface';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { DetailsChartDownloadArgs } from './details-chart.model';

export class DetailsChartCreater {
  static DetailsChartDownloadArgs(
    event: EventType,
    date: Date,
    unit: TimeUnit,
    datas: ITimeData<IModel>[][],
    station?: IdNameModel,
    division?: IIdNameModel,
    types?: EventType[]
  ) {
    let interval = this.Interval(date, unit);
    let args = new DetailsChartDownloadArgs();
    args.eventType = event;
    args.time = interval.language;
    args.unit = unit;
    args.datas = datas;
    args.name = station ? station.Name : division ? division.Name : '';
    args.types = types ?? [event];
    return args;
  }

  static Interval(date: Date, unit: TimeUnit) {
    let interval = {
      params: new DurationParams(),
      language: '',
    };
    switch (unit) {
      case TimeUnit.Hour:
      case TimeUnit.Day:
        interval.params = DurationParams.allDay(date);
        interval.language = Language.Date(date);
        break;
      case TimeUnit.Week:
        interval.params = DurationParams.allWeek(date);
        interval.language = Language.Duration(
          interval.params.BeginTime,
          interval.params.EndTime
        );
        break;
      case TimeUnit.Month:
        interval.params = DurationParams.allMonth(date);
        interval.language = Language.Duration(
          interval.params.BeginTime,
          interval.params.EndTime
        );
        break;
      case TimeUnit.Year:
        interval.params = DurationParams.allYear(date);
        interval.language = Language.Duration(
          interval.params.BeginTime,
          interval.params.EndTime
        );
        break;
      default:
        break;
    }
    return interval;
  }

  static Titles(types: EventType[]) {
    return types.map((x) => {
      switch (x) {
        case EventType.GarbageDrop:
          return '垃圾滞留';
        case EventType.GarbageDropTimeout:
        case EventType.GarbageDropSuperTimeout:
          return '垃圾滞留超时';
        default:
          return Language.EventType(x);
      }
    });
  }
}
