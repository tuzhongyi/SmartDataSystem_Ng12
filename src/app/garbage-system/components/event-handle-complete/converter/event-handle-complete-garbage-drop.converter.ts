import { formatDate } from '@angular/common';
import { Language } from 'src/app/common/tools/language';
import { ImageControlCreater } from 'src/app/converter/image-control.creater';
import {
  GarbageDropEventData,
  GarbageDropEventRecord,
} from 'src/app/network/model/garbage-station/event-record/garbage-drop-event-record.model';
import { GarbageDropFeedback } from 'src/app/network/model/garbage-station/garbage-drop-feedback.model';
import { GarbageDropSuperVisionData } from 'src/app/network/model/garbage-station/garbage-drop-super-vision-data.model';
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
    if (input.Data.SuperVisionData) {
      let events = this.getEventItems(
        input.Data.SuperVisionData,
        input.Data.DropImageUrls,
        input.Data.TimeoutImageUrls
      );
      items = [...items, ...events];
      if (input.Data.SuperVisionData.SupervisedState === 1) {
        let supervise = this.getSuperviseItem(input.Data.SuperVisionData);
        items.push(supervise);
      }
    }
    if (input.Data.Feedbacks) {
      let feedbacks = this.getFeedbackItems(input.Data.Feedbacks);
      items = [...items, ...feedbacks];
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

  getEventItem(data: GarbageDropEventData, max: number) {
    let item = new EventHandleCompleteModel();
    item.Time = data.DropTime;
    item.Type = EventHandleCompleteModelType.event;
    item.Title = '垃圾落地';
    item.TitleColor = '#3184e3';
    item.left = true;
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
    return item;
  }

  getEventItems(
    data: GarbageDropSuperVisionData,
    drop?: CameraImageUrl[],
    timeout?: CameraImageUrl[],
    max = 0
  ) {
    let array: EventHandleCompleteModel[] = [];

    if (data.Level2Time) {
      let item = new EventHandleCompleteModel();
      item.Time = data.Level2Time;
      item.Type = EventHandleCompleteModelType.event;
      item.Title = '垃圾滞留';
      item.TitleColor = '#ffba00';
      if (timeout) {
        item.urls = timeout.map((x) => {
          let model = ImageControlCreater.Create(x);
          return model;
        });
      }
      if (item.urls.length < max) {
        item.urls = item.urls.concat(
          new Array(max - item.urls.length).fill({ src: '' })
        );
      }
      item.left = true;
      array.push(item);
    }
    if (data.Level3Time) {
      let item = new EventHandleCompleteModel();
      item.Time = data.Level3Time;
      item.Type = EventHandleCompleteModelType.event;
      item.Title = '垃圾滞留超时';
      item.TitleColor = '#ef6464';
      item.left = true;
      if (timeout) {
        item.urls = timeout.map((x) => {
          let model = ImageControlCreater.Create(x);
          return model;
        });
      }
      if (item.urls.length < max) {
        item.urls = item.urls.concat(
          new Array(max - item.urls.length).fill({ url: '' })
        );
      }
      array.push(item);
    }
    return array;
  }

  getSuperviseItem(data: GarbageDropSuperVisionData) {
    let item = new EventHandleCompleteModel();
    item.Time = data.SupervisedTime!;
    item.Type = EventHandleCompleteModelType.supervise;
    item.Title = '督办通知';
    item.TitleColor = '#ef6464';
    item.infos = [];
    if (data.Supervisor) {
      item.infos.push(data.Supervisor);
    }
    if (data.SupervisedTime) {
      item.infos.push(formatDate(data.SupervisedTime, 'HH:mm:ss', 'en'));
    }
    if (data.SuperviseResult) {
      item.infos.push(Language.SuperviseResult(data.SuperviseResult));
    }

    item.left = false;

    return item;
  }
  getFeedbackItems(datas: GarbageDropFeedback[]) {
    let array: EventHandleCompleteModel[] = [];
    for (let i = 0; i < datas.length; i++) {
      const data = datas[i];
      let item = new EventHandleCompleteModel();
      item.Type = EventHandleCompleteModelType.feedback;
      item.Time = data.FeedbackTime;
      item.Title = '处置反馈';
      item.TitleColor = '#3184e3';
      item.urls =
        data.FeedbackImageUrls?.map((x) => {
          let model = ImageControlCreater.Create(x);
          return model;
        }) ?? [];
      item.left = false;
      item.infos = [];
      if (data.FeedbackUserName) {
        item.infos.push(data.FeedbackUserName);
      }
      if (data.FeedbackUserType) {
        item.infos.push(Language.FeedbackUserType(data.FeedbackUserType));
      }
      if (data.FeedbackUserMobileNo) {
        item.infos.push(data.FeedbackUserMobileNo);
      }
      if (data.FeedbackTime) {
        item.infos.push(formatDate(data.FeedbackTime, 'HH:mm:ss', 'en'));
      }
      if (data.FeedbackResult) {
        item.infos.push(Language.FeedbackResult(data.FeedbackResult));
      }
      if (data.FeedbackDescription) {
        item.infos.push(data.FeedbackDescription);
      }
      array.push(item);
    }
    return array;
  }
  getHandleItem(data: GarbageDropEventData, urls?: CameraImageUrl[]) {
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
