import { EventRecordCountTableModel } from 'src/app/common/components/tables/event-record-count-table/event-record-count-table.model';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { HowellExportModel } from 'src/app/common/tools/exports/hw-export.model';

export class EventRecordCountExportConverter
  implements IConverter<EventRecordCountTableModel[], HowellExportModel>
{
  Convert(source: EventRecordCountTableModel[]): HowellExportModel {
    let model = new HowellExportModel();
    for (let i = 0; i < source.length; i++) {
      const data = source[i];
      let value = new Array();
      value.push(i + 1);
      value.push(data.name);
      value.push(data.parent ? data.parent.Name : '');
      value.push(data.value);
      model.rowValues.push(value);
    }
    return model;
  }
}
