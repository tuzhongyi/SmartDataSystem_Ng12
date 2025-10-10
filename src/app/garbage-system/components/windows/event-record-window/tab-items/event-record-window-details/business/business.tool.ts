import { DateTimeTool } from 'src/app/common/tools/date-time-tool/datetime.tool';
import { TimeUnit } from 'src/app/enum/time-unit.enum';

interface TType {
  Time: Date;
}

export class BusinessTool {
  full<T extends TType>(
    datas: T[],
    times: Date[],
    unit: TimeUnit,
    empty: (...p: any[]) => T
  ) {
    datas = datas.sort((a, b) => {
      return a.Time.getTime() - b.Time.getTime();
    });

    let index = 0;
    for (let i = 0; i < times.length; i++) {
      const time = times[i];
      if (this.stop(time, unit)) {
        break;
      }

      if (!DateTimeTool.is.equal.unit(unit, time, datas[index].Time)) {
        datas.splice(index, 0, empty(i));
      }
      index++;
    }
    return datas;
  }
  private stop(time: Date, unit: TimeUnit) {
    if (unit == TimeUnit.Day) {
      if (DateTimeTool.is.today(time)) {
        true;
      }
    } else if (unit == TimeUnit.Hour) {
      if (DateTimeTool.is.equal.hour(time, new Date())) {
        return true;
      }
    } else {
    }

    switch (unit) {
      case TimeUnit.Hour:
        return DateTimeTool.is.equal.hour(time, new Date());
      case TimeUnit.Day:
        return DateTimeTool.is.today(time);
      case TimeUnit.Month:
        return DateTimeTool.is.equal.month(time, new Date());

      default:
        return false;
    }
  }
}
