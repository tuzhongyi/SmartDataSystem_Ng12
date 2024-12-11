import { ImageControlCreater } from 'src/app/converter/image-control.creater';
import {
  GarbageDropEventData,
  GarbageDropEventRecord,
} from 'src/app/network/model/garbage-station/event-record/garbage-drop-event-record.model';
import { CameraImageUrl } from 'src/app/network/model/url.model';
import {
  EventHandleCompleteModel,
  EventHandleCompleteModelType,
  EventRecordCompleteModel,
} from '../event-handle-complete.model';
import { EventHandleCompleteService } from '../service/event-handle-complete.service';
import { IConverter } from './event-handle-complete.converter';

export class EventHandleCompleteGarbageDropConverter
  implements IConverter<GarbageDropEventRecord>
{
  constructor(private service: EventHandleCompleteService) {}
  convert(input: GarbageDropEventRecord) {
    let model = new EventRecordCompleteModel();
    model.RecordNo = input.Data.RecordNo ?? input.EventId;
    model.Record = input;
    model.GarbageStation = this.service.station.cache.get(input.Data.StationId);

    let count = {
      drop: input.Data.DropImageUrls?.length ?? 0,
      timeout: input.Data.TimeoutImageUrls?.length ?? 0,
      handle: input.Data.HandleImageUrls?.length ?? 0,
    };

    let max = Math.max(count.drop, count.timeout, count.handle);

    let item = this.getEventItem(input.Data, max);
    let items: EventHandleCompleteModel[] = [item];

    if (input.Data.IsTimeout) {
      let timeout = this.getTimeout(input.Data, max);
      items.push(timeout);
    }
    if (input.Data.IsHandle) {
      let handle = this.getHandleItem(input.Data, input.Data.HandleImageUrls);
      items.push(handle);
    }

    // items = items.sort((a, b) => {
    //   return a.Time.getTime() - b.Time.getTime();
    // });
    model.Duration = { begin: input.Data.DropTime, end: input.Data.HandleTime };

    model.Items = items;

    return model;
  }

  getEventItem(data: GarbageDropEventData, max: number) {
    let item = new EventHandleCompleteModel();
    item.Time = data.DropTime;
    item.Type = EventHandleCompleteModelType.event;
    item.Title = '发现垃圾滞留';
    item.TitleColor = '#3184e3';
    item.left = true;
    item.bottom = data.IsTimeout || data.IsHandle;
    if (data.DropImageUrls) {
      item.urls = data.DropImageUrls.map((x) => {
        let model = ImageControlCreater.Create(x);
        return model;
      });
    }
    if (item.urls.length < max) {
      item.urls = item.urls.concat(
        new Array(max - item.urls.length).fill({ src: '' })
      );
    }

    item.urls.forEach((x) => {
      if (x.polygon) {
        x.polygon.forEach((y) => {
          y.Confidence = undefined;
        });
      }
    });
    return item;
  }
  getTimeout(data: GarbageDropEventData, max: number) {
    let item = new EventHandleCompleteModel();
    item.Type = EventHandleCompleteModelType.timeout;
    item.Title = '垃圾滞留超时';
    item.TitleColor = '#ef6464';
    item.left = true;
    item.top = true;
    if (data.TimeoutImageUrls) {
      item.urls = data.TimeoutImageUrls.map((x) => {
        let model = ImageControlCreater.Create(x);
        return model;
      });
    }
    if (item.urls.length < max) {
      item.urls = item.urls.concat(
        new Array(max - item.urls.length).fill({ src: '' })
      );
    }

    item.urls.forEach((x) => {
      if (x.polygon) {
        x.polygon.forEach((y) => {
          y.Confidence = undefined;
        });
      }
    });
    return item;
  }

  getHandleItem(data: GarbageDropEventData, urls?: CameraImageUrl[]) {
    let item = new EventHandleCompleteModel();
    item.Type = EventHandleCompleteModelType.handle;
    item.Time = data.HandleTime!;
    item.Title = '已处置';

    item.TitleColor = '#21e452';
    if (urls) {
      item.urls = urls.map((x) => {
        let model = ImageControlCreater.Create(x);
        return model;
      });
    }
    item.left = false;
    item.top = true;
    item.Minitues =
      (item.Time.getTime() - data.DropTime.getTime()) / (1000 * 60);

    item.urls.forEach((x) => {
      if (x.polygon) {
        x.polygon.forEach((y) => {
          y.Confidence = undefined;
        });
      }
    });
    return item;
  }
}
