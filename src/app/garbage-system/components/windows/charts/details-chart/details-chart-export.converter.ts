import { formatDate } from '@angular/common';
import { ITimeData } from 'src/app/common/components/charts/chart.model';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { HowellExportModel } from 'src/app/common/tools/exports/hw-export.model';

export class ExportExcelConverter
  implements IConverter<ITimeData<any>[][], HowellExportModel>
{
  Convert(source: ITimeData<any>[][]): HowellExportModel {
    let model = new HowellExportModel();

    for (let i = 0; i < source.length; i++) {
      const data = source[i];
      let value = new Array();
      value.push(i + 1);
      value.push(formatDate(data[0].time, 'yyyy年MM月dd日', 'en'));
      value.push(formatDate(data[0].time, 'HH:mm', 'en'));
      for (let j = 0; j < data.length; j++) {
        const item = data[j];
        value.push(item.value);
      }

      model.datas.push(value);
    }
    return model;
  }
}
