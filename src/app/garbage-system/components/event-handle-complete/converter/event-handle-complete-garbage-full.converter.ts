import { ImageControlCreater } from 'src/app/converter/image-control.creater';
import {
  GarbageFullEventData,
  GarbageFullEventRecord,
} from 'src/app/network/model/garbage-station/event-record/garbage-full-event-record.model';
import { CameraImageUrl } from 'src/app/network/model/url.model';
import {
  EventHandleCompleteModel,
  EventHandleCompleteModelType,
  EventRecordCompleteModel,
} from '../event-handle-complete.model';
import { EventHandleCompleteService } from '../service/event-handle-complete.service';
import { IConverter } from './event-handle-complete.converter';

export class EventHandleCompleteGarbageFullConverter
  implements IConverter<GarbageFullEventRecord>
{
  constructor(private service: EventHandleCompleteService) {}
  convert(input: GarbageFullEventRecord) {
    let model = new EventRecordCompleteModel();
    model.Record = input;
    model.GarbageStation = this.service.station.cache.get(input.Data.StationId);

    let items: EventHandleCompleteModel[] = [];

    if (input.Data.CameraImageUrls) {
      let event = this.getEventItem(input.Data, input.Data.CameraImageUrls);
      items = [...items, event];
    }

    if (input.Data.IsHandle) {
      let handle = this.getHandleItem(input.Data, input.Data.HandleImageUrls);
      items.push(handle);
    }

    items = items.sort((a, b) => {
      return a.Time.getTime() - b.Time.getTime();
    });
    model.Duration = {
      begin: items[0].Time,
      end: items[items.length - 1].Time,
    };
    for (let i = 0; i < items.length; i++) {
      let first = i === 0;
      let last = i === items.length - 1;
      if (!first) {
        items[i].top = true;

        items[i].Minitues =
          (items[i].Time.getTime() - model.Duration.begin.getTime()) /
          (1000 * 60);
      }
      if (!last) {
        items[i].bottom = true;
      }
    }

    model.Items = items;

    return model;
  }

  getEventItem(data: GarbageFullEventData, urls?: CameraImageUrl[]) {
    let item = new EventHandleCompleteModel();
    item.Time = data.FullTime;
    item.Type = EventHandleCompleteModelType.event;
    item.Title = '垃圾满溢';
    item.TitleColor = '#3184e3';
    item.left = true;
    if (urls) {
      item.urls = urls.map((x) => {
        let model = ImageControlCreater.Create(x);
        return model;
      });
    }
    return item;
  }

  getHandleItem(data: GarbageFullEventData, urls?: CameraImageUrl[]) {
    let item = new EventHandleCompleteModel();
    item.Type = EventHandleCompleteModelType.handle;
    item.Time = data.HandleTime!;
    item.Title = '处置完成';

    item.TitleColor = '#21e452';
    if (urls) {
      item.urls = urls.map((x) => {
        let model = ImageControlCreater.Create(x);
        return model;
      });
    }
    item.left = false;
    item.top = true;
    return item;
  }
}
