import { GarbageDropStationCountTableModel } from 'src/app/common/components/tables/garbage-drop-station-count-table/garbage-drop-station-count-table.model';
import { IExportConverter } from 'src/app/common/interfaces/converter.interface';
import { HowellExportModel } from 'src/app/common/tools/exports/hw-export.model';

export class GarbageDropStationWindowCountExportConverter
  implements IExportConverter<GarbageDropStationCountTableModel[]>
{
  async Convert(
    source: GarbageDropStationCountTableModel[],
    ...res: any[]
  ): Promise<HowellExportModel> {
    let model = new HowellExportModel();
    for (let i = 0; i < source.length; i++) {
      let data = source[i];
      let value = new Array();
      value.push(i + 1);
      value.push(data.Name);
      let parent = await data.Parent;
      if (parent) {
        value.push(parent.Name);
      }
      value.push(data.EventCount);
      value.push(data.TimeoutCount);
      value.push((100 - data.TimeoutRatio).toFixed(2) + '%');
      model.rowValues.push(value);
    }
    return model;
  }
}
