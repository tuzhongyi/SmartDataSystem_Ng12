import { GarbageDropStationCountTableModel } from 'src/app/common/components/tables/garbage-drop-station-count-table/garbage-drop-station-count-table.model';
import { IExportConverter } from 'src/app/common/interfaces/converter.interface';
import { HowellExportModel } from 'src/app/common/tools/exports/hw-export.model';

export class GarbageDropStationWindowCountExportConverter
  implements IExportConverter<GarbageDropStationCountTableModel[]>
{
  Convert(
    source: GarbageDropStationCountTableModel[],
    ...res: any[]
  ): HowellExportModel {
    let model = new HowellExportModel();
    for (let i = 0; i < source.length; i++) {
      let data = source[i];
      let value = new Array();
      value.push(i + 1);
      value.push(data.Name);
      if (data.Parent) {
        value.push(data.Parent.Name);
      }
      value.push(data.EventCount);
      value.push(data.TimeoutCount);
      value.push(data.TimeoutRatio.toFixed(2) + '%');
      model.datas.push(value);
    }
    return model;
  }
}
