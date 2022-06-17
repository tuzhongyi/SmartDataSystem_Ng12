import { formatDate } from '@angular/common';
import { ITimeDataGroup } from 'src/app/common/components/charts/chart.model';
import { IExportConverter } from 'src/app/common/interfaces/converter.interface';
import { HowellExportModel } from 'src/app/common/tools/exports/hw-export.model';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { Language } from 'src/app/global/tool/language';

export class TimeDataGroupExportConverter
  implements IExportConverter<ITimeDataGroup<number>[]>
{
  Convert(source: ITimeDataGroup<number>[], unit: TimeUnit): HowellExportModel {
    let model = new HowellExportModel();

    let rowCount = 0;
    if (source.length > 0 && source[0].datas.length > 0) {
      rowCount = source[0].datas.length;
    } else {
      return model;
    }

    for (let i = 0; i < rowCount; i++) {
      let value = new Array();
      value.push(i + 1);
      value.push(formatDate(source[0].datas[i].time, 'yyyy年MM月dd日', 'en'));
      if (unit === TimeUnit.Week) {
        value.push(Language.Week(source[0].datas[i].time.getDay()));
      } else if (unit === TimeUnit.Hour) {
        value.push(formatDate(source[0].datas[i].time, 'HH:mm:ss', 'en'));
      } else {
      }

      for (let j = 0; j < source.length; j++) {
        const data = source[j].datas[i];
        value.push(data.value);
      }
      model.datas.push(value);
    }

    return model;
  }
}
