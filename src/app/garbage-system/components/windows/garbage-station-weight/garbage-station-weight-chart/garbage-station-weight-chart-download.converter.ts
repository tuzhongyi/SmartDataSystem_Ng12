import { formatDate } from '@angular/common';
import {
  ITimeData,
  ITimeDataGroup,
} from 'src/app/common/components/charts/chart.model';
import { IExportConverter } from 'src/app/common/interfaces/converter.interface';
import { HowellExportModel } from 'src/app/common/tools/exports/hw-export.model';
import { Language } from 'src/app/common/tools/language';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { GarbageStationWeightChartArgs } from './garbage-station-weight-chart.model';

export class GarbageStationWeightChartDownloadConverter
  implements IExportConverter<ITimeDataGroup<number>>
{
  Convert(
    source: ITimeDataGroup<number>,
    args: GarbageStationWeightChartArgs
  ): HowellExportModel {
    let model = new HowellExportModel();
    model.headIndex = 1;
    model.dataIndex = [2];

    model.rowValues = source.datas.map((x: ITimeData<number>, i: number) => {
      let row = new Array();
      row.push(i + 1);

      let datetime = this.datetime(x.time, args.unit);
      row.push(datetime.date);
      row.push(datetime.time);
      row.push(x.value);
      return row;
    });
    return model;
  }

  private datetime(date: Date, unit: TimeUnit) {
    let datetime = {
      date: '',
      time: '',
    };
    switch (unit) {
      case TimeUnit.Year:
        datetime.date = formatDate(date, 'yyyy年', 'en');
        datetime.time = formatDate(date, 'MM月', 'en');
        break;
      case TimeUnit.Month:
        datetime.date = formatDate(date, 'MM月', 'en');
        datetime.time = formatDate(date, 'dd日', 'en');
        break;
      case TimeUnit.Week:
        datetime.date = formatDate(date, 'yyyy年MM月dd日', 'en');
        datetime.time = Language.Week(formatDate(date, 'EEEE', 'en'));
        break;
      case TimeUnit.Day:
      default:
        break;
    }
    return datetime;
  }
}
