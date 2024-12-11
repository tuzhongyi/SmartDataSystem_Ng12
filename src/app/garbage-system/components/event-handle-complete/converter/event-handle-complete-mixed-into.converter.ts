import { Medium } from 'src/app/common/tools/medium';
import { ImageControlCreater } from 'src/app/converter/image-control.creater';
import { MixedIntoEventRecord } from 'src/app/network/model/garbage-station/event-record/mixed-into-event-record.model';
import {
  EventHandleCompleteModel,
  EventHandleCompleteModelType,
  EventRecordCompleteModel,
} from '../event-handle-complete.model';
import { EventHandleCompleteService } from '../service/event-handle-complete.service';
import { IConverter } from './event-handle-complete.converter';

export class EventHandleCompleteMixedIntoConverter
  implements IConverter<MixedIntoEventRecord>
{
  constructor(private service: EventHandleCompleteService) {}
  convert(input: MixedIntoEventRecord) {
    let model = new EventRecordCompleteModel();
    model.RecordNo = input.EventId;
    model.Record = input;
    model.GarbageStation = this.service.station.cache.get(input.Data.StationId);

    let items: EventHandleCompleteModel[] = [];

    let event = this.getEventItem(input);
    items = [...items, event];

    if (
      input.Data.IsHandle &&
      input.Data.HandleTime &&
      input.Data.HandleImageUrl &&
      input.ResourceId
    ) {
      let handle = this.getHandleItem(
        input,
        input.Data.HandleTime,
        input.Data.HandleImageUrl,
        input.ResourceId
      );
      items.push(handle);
    }

    items = items.sort((a, b) => {
      return a.Time.getTime() - b.Time.getTime();
    });
    model.Duration = {
      begin: input.EventTime,
      end: input.Data.HandleTime,
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

  getEventItem(data: MixedIntoEventRecord) {
    let item = new EventHandleCompleteModel();
    item.Time = data.EventTime;
    item.Type = EventHandleCompleteModelType.event;
    item.Title = '发现混合投放';
    item.TitleColor = '#3184e3';
    item.left = true;
    item.urls = [
      ImageControlCreater.create(
        data.ResourceId ?? data.EventId,
        Medium.img(data.ImageUrl ?? Medium.default),
        data.ResourceName ?? data.Data.StationName,

        {
          eventTime: data.EventTime,
          stationId: data.Data.StationId,
          rules: data.Data.Rules,
          polygon: data.Data.Objects,
          ishandle: false,
          istimeout: false,
        }
      ),
    ];

    item.urls.forEach((x) => {
      if (x.polygon) {
        x.polygon.forEach((y) => {
          y.Confidence = undefined;
        });
      }
    });

    return item;
  }

  getHandleItem(
    data: MixedIntoEventRecord,
    time: Date,
    url: string,
    id: string
  ) {
    let item = new EventHandleCompleteModel();
    item.Type = EventHandleCompleteModelType.handle;
    item.Time = time;
    item.Title = '已消失';

    item.TitleColor = '#21e452';
    item.urls = [
      ImageControlCreater.create(
        id,
        Medium.img(url),
        data.ResourceName ?? data.Data.StationName,
        {
          eventTime: data.Data.ProcessTime,
          stationId: data.Data.StationId,
          ishandle: true,
          istimeout: false,
        }
      ),
    ];

    item.urls.forEach((x) => {
      if (x.polygon) {
        x.polygon.forEach((y) => {
          y.Confidence = undefined;
        });
      }
    });
    item.left = false;
    item.top = true;
    return item;
  }
}
