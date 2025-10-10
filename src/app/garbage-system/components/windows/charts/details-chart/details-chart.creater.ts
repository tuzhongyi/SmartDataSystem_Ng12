import { ITimeData } from 'src/app/common/components/charts/chart.model';
import { DateTimeTool } from 'src/app/common/tools/date-time-tool/datetime.tool';
import { Language } from 'src/app/common/tools/language';
import { EventType } from 'src/app/enum/event-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import {
  IIdNameModel,
  IModel,
  IdNameModel,
} from 'src/app/network/model/model.interface';
import { DetailsChartDownloadArgs } from './details-chart.model';

export class DetailsChartCreater {
  static DetailsChartDownloadArgs(
    event: EventType,
    date: Date,
    unit: TimeUnit,
    datas: ITimeData<IModel | undefined>[][],
    station?: IdNameModel,
    division?: IIdNameModel,
    types?: EventType[]
  ) {
    let interval = this.Interval(date, unit);
    let args = new DetailsChartDownloadArgs();
    args.eventType = event ?? (types ? types[0] : EventType.None);
    args.time = interval.language;
    args.unit = unit;
    args.datas = datas;
    args.name = station ? station.Name : division ? division.Name : '';
    args.types = types ?? [event];
    return args;
  }

  static Interval(date: Date, unit: TimeUnit) {
    let interval = {
      params: DateTimeTool.allDay(date),
      language: '',
    };
    switch (unit) {
      case TimeUnit.Hour:
      case TimeUnit.Day:
        interval.params = DateTimeTool.allDay(date);
        interval.language = Language.Date(date);
        break;
      case TimeUnit.Week:
        interval.params = DateTimeTool.allWeek(date);
        interval.language = Language.Duration(
          interval.params.begin,
          interval.params.end
        );
        break;
      case TimeUnit.Month:
        interval.params = DateTimeTool.allMonth(date);
        interval.language = Language.Duration(
          interval.params.begin,
          interval.params.end
        );
        break;
      case TimeUnit.Year:
        interval.params = DateTimeTool.allYear(date);
        interval.language = Language.Duration(
          interval.params.begin,
          interval.params.end
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
