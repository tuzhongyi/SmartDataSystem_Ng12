import { formatDate } from '@angular/common';
import { CameraImageUrlModel } from 'src/app/common/components/tables/event-record/event-record.model';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { Language } from 'src/app/common/tools/language';
import { ImageControlConverter } from 'src/app/converter/image-control.converter';
import { SmokeEventRecord } from 'src/app/network/model/garbage-event-record.model';
import { ElectricBikeAlarmModel } from './alarm.model';

export class AlarmListConverter
  implements
    IConverter<SmokeEventRecord[], ElectricBikeAlarmModel<SmokeEventRecord>[]>
{
  item = new AlarmItemConverter();
  Convert(
    source: SmokeEventRecord[],
    ...res: any[]
  ): ElectricBikeAlarmModel<SmokeEventRecord>[] {
    return source.map((x) => {
      return this.item.Convert(x);
    });
  }
}

export class AlarmItemConverter
  implements
    IConverter<SmokeEventRecord, ElectricBikeAlarmModel<SmokeEventRecord>>
{
  img = new ImageControlConverter();
  Convert(
    source: SmokeEventRecord,
    ...res: any[]
  ): ElectricBikeAlarmModel<SmokeEventRecord> {
    let model = new ElectricBikeAlarmModel();
    model.data = source;
    model.id = source.EventId;
    model.name = source.ResourceName ?? '';
    model.type = Language.EventType(source.EventType);
    model.date = formatDate(source.EventTime, 'MM-dd HH:mm:ss', 'en');
    if (source.Data.CameraImageUrls) {
      source.Data.CameraImageUrls = source.Data.CameraImageUrls.sort((a, b) => {
        if (a.CameraName && b.CameraName)
          return a.CameraName.localeCompare(b.CameraName);
        return a.CameraId.localeCompare(b.CameraId);
      });
      model.images = source.Data.CameraImageUrls.map((x) => {
        let url = new CameraImageUrlModel(x, source.Data.StationId);

        return this.img.Convert(url, undefined, source.EventTime);
      });
    }

    return model;
  }
}
