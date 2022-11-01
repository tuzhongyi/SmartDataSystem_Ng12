import { Injectable } from '@angular/core';
import {
  EventNumberStatisticModel,
  EventNumberStatisticCSV,
} from 'src/app/view-model/event-number-statistic.model';
import {
  IConverter,
  IExportConverter,
} from '../../interfaces/converter.interface';
import { HowellExportModel } from '../../tools/exports/hw-export.model';

@Injectable()
export class EventNumberStatisticExportConverter
  implements IExportConverter<EventNumberStatisticModel[]>
{
  item = new EventNumberStatisticItemExportConverter();
  Convert(
    source: EventNumberStatisticModel[],
    ...res: any[]
  ): HowellExportModel {
    let model = new HowellExportModel();
    model.rowValues = source.map((x, index) => {
      let item = this.item.Convert(x, index);
      let row = new Array();
      row.push(item.Id);
      row.push(item.Name);
      row.push(item.ParentName);
      row.push(item.EventNumber);

      return row;
    });
    model.headers;
    return model;
  }
}

class EventNumberStatisticItemExportConverter
  implements IConverter<EventNumberStatisticModel, EventNumberStatisticCSV>
{
  Convert(
    source: EventNumberStatisticModel,
    index: number
  ): EventNumberStatisticCSV {
    let csv = new EventNumberStatisticCSV();
    csv.Id = (index + 1).toString();
    csv.Name = source.Name;
    csv.ParentName = source.ParentModel?.Name ?? '';
    csv.EventNumber = source.EventNumber;
    return csv;
  }
}
