import { GarbageStationStatisticModel } from 'src/app/common/components/tables/garbage-station-statistic-table/garbage-station-statistic.model';
import { IExportConverter } from 'src/app/common/interfaces/converter.interface';
import { HowellExportModel } from 'src/app/common/tools/exports/hw-export.model';

export class GarbageStationWindowGeneralExportConverter
  implements IExportConverter<GarbageStationStatisticModel[]>
{
  async Convert(source: GarbageStationStatisticModel[], ...res: any[]) {
    let model = new HowellExportModel();

    for (let i = 0; i < source.length; i++) {
      const data = source[i];
      let row = new Array();
      row.push(i + 1);
      row.push(data.Name);

      row.push((await data.Committees).Name);

      row.push((await data.GarbageStation).CommunityName);

      row.push((await data.County).Name);

      row.push(
        this.GetValue(
          data.GarbageRatioTd.format + '%',
          data.GarbageRatioTd.differ,
          true
        )
      );
      row.push(
        this.GetValue(
          data.AvgGarbageTimeTd.format,
          data.AvgGarbageTimeTd.differ,
          true
        )
      );

      row.push(
        this.GetValue(
          data.MaxGarbageTimeTd.format,
          data.MaxGarbageTimeTd.differ,
          true
        )
      );
      row.push(
        this.GetValue(
          data.GarbageDurationTd.format,
          data.GarbageDurationTd.differ,
          true
        )
      );

      row.push(
        this.GetValue(data.IllegalDropTd.format, data.IllegalDropTd.differ)
      );
      row.push(this.GetValue(data.MixedIntoTd.format, data.MixedIntoTd.differ));

      model.rowValues.push(row);
    }

    return model;
  }

  GetValue(value: string, differ: number, percent = false) {
    let up = '↑';
    let down = '↓';
    let n = '';
    if (differ > 0) {
      n = up + Math.abs(differ).toFixed(2);
    } else if (differ < 0) {
      n = down + Math.abs(differ).toFixed(2);
    } else {
    }

    return `${value}${n}${percent ? '%' : ''}`;
  }
}
