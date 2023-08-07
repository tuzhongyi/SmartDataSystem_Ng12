import { IExportConverter } from 'src/app/common/interfaces/converter.interface';
import { HowellExportModel } from 'src/app/common/tools/exports/hw-export.model';
import { GarbageStationWeightTableExportModel } from '../garbage-station-weight-table.model';

export class GarbageStationWeightTableExcelConverter
  implements IExportConverter<GarbageStationWeightTableExportModel[]>
{
  Convert(
    source: GarbageStationWeightTableExportModel[],
    ...res: any[]
  ): HowellExportModel {
    let model = new HowellExportModel();
    model.rowValues = source.map((x, index) => {
      let row = new Array();
      row.push(index + 1);
      row.push(x.name);
      row.push(x.division.Name);
      row.push(x.weight.dry);
      row.push(x.weight.wet);
      return row;
    });
    model.headers;
    return model;
  }
}
