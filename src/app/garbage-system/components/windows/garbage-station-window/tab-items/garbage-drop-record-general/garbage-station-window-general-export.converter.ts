import { GarbageStationStatisticModel } from 'src/app/common/components/tables/garbage-station-statistic-table/garbage-station-statistic.model';
import { IExportConverter } from 'src/app/common/interfaces/converter.interface';
import { HowellExportModel } from 'src/app/common/tools/exports/hw-export.model';

export class GarbageStationWindowGeneralExportConverter
  implements IExportConverter<GarbageStationStatisticModel[]>
{
  Convert(
    source: GarbageStationStatisticModel[],
    ...res: any[]
  ): HowellExportModel {
    let model = new HowellExportModel();

    for (let i = 0; i < source.length; i++) {
      const data = source[i];
      let row = new Array();
      row.push(i + 1);
      row.push(data.Name);
      if (data.Committees) {
        row.push(data.Committees.Name);
      }
      if (data.GarbageStation) {
        row.push(data.GarbageStation.CommunityName);
      }
      if (data.County) {
        row.push(data.County.Name);
      }
      row.push(
        this.GetValue(data.GarbageRatioTd.format, data.GarbageRatioTd.differ)
      );
      row.push(
        this.GetValue(
          data.AvgGarbageTimeTd.format,
          data.AvgGarbageTimeTd.differ
        )
      );

      row.push(
        this.GetValue(
          data.MaxGarbageTimeTd.format,
          data.MaxGarbageTimeTd.differ
        )
      );
      row.push(
        this.GetValue(
          data.GarbageDurationTd.format,
          data.GarbageDurationTd.differ
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

  GetValue(value: string, differ: number) {
    let up = '↑';
    let down = '↓';
    let n = '';
    if (differ > 0) {
      n = up + Math.abs(differ).toFixed(2);
    } else if (differ < 0) {
      n = down + Math.abs(differ).toFixed(2);
    } else {
    }

    return `${value}${n}`;
  }
}
