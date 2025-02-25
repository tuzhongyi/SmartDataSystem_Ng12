import { Injectable } from '@angular/core';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { HowellExportModel } from 'src/app/common/tools/exports/hw-export.model';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';

@Injectable()
export class EventRecordDownloadConverter
  implements IConverter<EventRecordViewModel[], HowellExportModel>
{
  Convert(source: EventRecordViewModel[], ...res: any[]): HowellExportModel {
    let model = new HowellExportModel();
    for (let i = 0; i < source.length; i++) {
      const data = source[i];
      let value = new Array();
      value.push(i + 1);
      value.push(data.GarbageStation?.Name ?? '');
      value.push(data.GarbageStation?.CommunityName ?? '');
      value.push(data.GarbageStation?.County?.Name ?? '');
      value.push(data.GarbageStation?.Committees?.Name ?? '');
      value.push(data.BeginTimeFormatter);
      value.push(data.EndTimeFormatter);
      model.datas.push(value);
    }
    return model;
  }
}
