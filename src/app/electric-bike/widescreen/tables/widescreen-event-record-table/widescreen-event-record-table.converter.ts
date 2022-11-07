import { CameraImageUrlModel } from 'src/app/common/components/tables/event-record/event-record.model';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { ImageControlConverter } from 'src/app/converter/image-control.converter';
import { SmokeEventRecord } from 'src/app/network/model/garbage-event-record.model';
import { WidescreenEventRecordItem } from './widescreen-event-record-table.model';

export class WidescreenEventRecordTableConverter
  implements
    IConverter<
      SmokeEventRecord[],
      WidescreenEventRecordItem<SmokeEventRecord>[]
    >
{
  private item = new WidescreenEventRecordItemConverter();
  Convert(
    source: SmokeEventRecord[],
    ...res: any[]
  ): WidescreenEventRecordItem<any>[] {
    return source.map((x) => {
      return this.item.Convert(x);
    });
  }
}

class WidescreenEventRecordItemConverter
  implements IConverter<SmokeEventRecord, WidescreenEventRecordItem>
{
  img = new ImageControlConverter();
  Convert(
    source: SmokeEventRecord,
    ...res: any[]
  ): WidescreenEventRecordItem<SmokeEventRecord> {
    let item = new WidescreenEventRecordItem();
    item.id = source.EventId;
    item.name = source.ResourceName ?? '-';
    item.time = source.EventTime;
    item.type = source.EventType;
    item.data = source;

    if (source.Data.CameraImageUrls) {
      source.Data.CameraImageUrls = source.Data.CameraImageUrls.sort((a, b) => {
        if (a.CameraName && b.CameraName)
          return a.CameraName.localeCompare(b.CameraName);
        return a.CameraId.localeCompare(b.CameraId);
      });
      item.images = source.Data.CameraImageUrls.map((x) => {
        let url = new CameraImageUrlModel(x, source.Data.StationId);

        return this.img.Convert(url, undefined, source.EventTime);
      });
    }

    return item;
  }
}
