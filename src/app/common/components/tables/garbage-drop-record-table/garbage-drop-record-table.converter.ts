import { formatDate } from '@angular/common';
import { IPromiseConverter } from 'src/app/common/interfaces/converter.interface';
import { ImageControlConverter } from 'src/app/converter/image-control.converter';
import { Language } from 'src/app/global/tool/language';
import { Division } from 'src/app/network/model/division.model';
import { GarbageDropEventRecord } from 'src/app/network/model/event-record.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { EventRecordConverter } from '../event-record-table/event-record.converter';
import { GarbageDropRecordViewModel } from './garbage-drop-record.model';

export class GarbageDropEventRecordPagedConverter
  implements
    IPromiseConverter<
      PagedList<GarbageDropEventRecord>,
      PagedList<GarbageDropRecordViewModel>
    >
{
  private converter = {
    item: new GarbageDropEventRecordConverter(),
  };

  async Convert(
    source: PagedList<GarbageDropEventRecord>,
    getter: {
      station: (id: string) => Promise<GarbageStation>;
      division: (id: string) => Promise<Division>;
    }
  ): Promise<PagedList<GarbageDropRecordViewModel>> {
    let array: GarbageDropRecordViewModel[] = [];
    for (let i = 0; i < source.Data.length; i++) {
      const data = source.Data[i];
      let model = await this.converter.item.Convert(data, getter);
      array.push(model);
    }
    return {
      Page: source.Page,
      Data: array,
    };
  }
}

export class GarbageDropEventRecordConverter
  implements
    IPromiseConverter<GarbageDropEventRecord, GarbageDropRecordViewModel>
{
  converter = {
    record: new EventRecordConverter(),
    image: new ImageControlConverter(),
  };
  async Convert(
    source: GarbageDropEventRecord,
    getter: {
      station: (id: string) => Promise<GarbageStation>;
      division: (id: string) => Promise<Division>;
    }
  ): Promise<GarbageDropRecordViewModel> {
    let model = new GarbageDropRecordViewModel();
    model = Object.assign(model, source);
    model.SendTime = formatDate(source.Data.DropTime, 'HH:mm:ss', 'en');
    if (source.Data.HandleTime) {
      model.HandleTime = formatDate(source.Data.HandleTime, 'HH:mm:ss', 'en');
    }
    if (source.Data.TakeMinutes) {
      model.DropDuration = Language.Time(source.Data.TakeMinutes);
    } else {
      let now = new Date();
      let drop = new Date(source.Data.DropTime);
      let duration = new Date(now.getTime() - drop.getTime());
      model.DropDuration = Language.Time(duration);
    }

    model.status = Language.GarbageDropEventType(
      source.EventType,
      source.Data.IsTimeout
    );
    model.statusClass = Language.GarbageDropEventTypeClassName(
      source.EventType,
      source.Data.IsTimeout
    );

    if (source.Data.DropImageUrls) {
      for (let i = 0; i < source.Data.DropImageUrls.length; i++) {
        const url = source.Data.DropImageUrls[i];
        let image = this.converter.image.Convert(url);
        model.images.push(image);
      }
    }
    if (source.Data.TimeoutImageUrls) {
      for (let i = 0; i < source.Data.TimeoutImageUrls.length; i++) {
        const url = source.Data.TimeoutImageUrls[i];
        let image = this.converter.image.Convert(url);
        model.images.push(image);
      }
    }
    if (source.Data.HandleImageUrls) {
      for (let i = 0; i < source.Data.HandleImageUrls.length; i++) {
        const url = source.Data.HandleImageUrls[i];
        let image = this.converter.image.Convert(url);
        model.images.push(image);
      }
    }

    return model;
  }
}
