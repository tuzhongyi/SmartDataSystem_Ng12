import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { Language } from 'src/app/common/tools/language';
import { Medium } from 'src/app/common/tools/medium';
import {
  GarbageDropEventData,
  GarbageDropEventRecord,
} from 'src/app/network/model/garbage-station/event-record/garbage-drop-event-record.model';
import { GarbageDropFeedback } from 'src/app/network/model/garbage-station/garbage-drop-feedback.model';
import { GarbageDropSuperVisionData } from 'src/app/network/model/garbage-station/garbage-drop-super-vision-data.model';
import { CameraImageUrl } from 'src/app/network/model/url.model';
import {
  DapuqiaoMainSuperviseCompleteModel,
  DapuqiaoMainSuperviseCompleteModelType,
  GarbageDropEventRecordModel,
} from './dapuqiao-main-supervise-complete.model';
import { DapuqiaoMainSuperviseCompleteService } from './dapuqiao-main-supervise-complete.service';

@Injectable()
export class DapuqiaoMainSuperviseCompleteBusiness
  implements IBusiness<GarbageDropEventRecord, GarbageDropEventRecordModel>
{
  constructor(private service: DapuqiaoMainSuperviseCompleteService) {}
  async load(id: string) {
    let data = await this.getData(id);
    let model = this.convert(data);
    return model;
  }
  getData(id: string) {
    return this.service.event.record.GarbageDrop.get(id);
  }

  convert(input: GarbageDropEventRecord) {
    let plain = instanceToPlain(input);
    let model = plainToInstance(GarbageDropEventRecordModel, plain);
    model.GarbageStation = this.service.station.cache.get(input.Data.StationId);

    let items: DapuqiaoMainSuperviseCompleteModel[] = [];
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

  getEventItems(
    data: GarbageDropSuperVisionData,
    drop?: CameraImageUrl[],
    timeout?: CameraImageUrl[]
  ) {
    let array: DapuqiaoMainSuperviseCompleteModel[] = [];
    if (data.Level1Time) {
      let item = new DapuqiaoMainSuperviseCompleteModel();
      item.Time = data.Level1Time;
      item.Type = DapuqiaoMainSuperviseCompleteModelType.event;
      item.Title = '一级事件';
      item.TitleColor = '#3184e3';
      item.left = true;
      if (drop) {
        item.urls = drop.map((x) => {
          return {
            id: x.CameraId,
            name: x.CameraName,
            url: Medium.data(x.ImageUrl),
          };
        });
      }
      array.push(item);
    }
    if (data.Level2Time) {
      let item = new DapuqiaoMainSuperviseCompleteModel();
      item.Time = data.Level2Time;
      item.Type = DapuqiaoMainSuperviseCompleteModelType.event;
      item.Title = '二级事件';
      item.TitleColor = '#ffba00';
      if (timeout) {
        item.urls = timeout.map((x) => {
          return {
            id: x.CameraId,
            name: x.CameraName,
            url: Medium.data(x.ImageUrl),
          };
        });
      }
      item.left = true;
      array.push(item);
    }
    if (data.Level3Time) {
      let item = new DapuqiaoMainSuperviseCompleteModel();
      item.Time = data.Level3Time;
      item.Type = DapuqiaoMainSuperviseCompleteModelType.event;
      item.Title = '三级事件';
      item.TitleColor = '#ef6464';
      item.left = true;
      if (timeout) {
        item.urls = timeout.map((x) => {
          return {
            id: x.CameraId,
            name: x.CameraName,
            url: Medium.data(x.ImageUrl),
          };
        });
      }
      array.push(item);
    }
    return array;
  }

  getSuperviseItem(data: GarbageDropSuperVisionData) {
    let item = new DapuqiaoMainSuperviseCompleteModel();
    item.Time = data.SupervisedTime!;
    item.Type = DapuqiaoMainSuperviseCompleteModelType.supervise;
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
    let array: DapuqiaoMainSuperviseCompleteModel[] = [];
    for (let i = 0; i < datas.length; i++) {
      const data = datas[i];
      let item = new DapuqiaoMainSuperviseCompleteModel();
      item.Type = DapuqiaoMainSuperviseCompleteModelType.feedback;
      item.Time = data.FeedbackTime;
      item.Title = '处置反馈';
      item.TitleColor = '#3184e3';
      item.urls =
        data.FeedbackImageUrls?.map((x) => {
          return {
            url: Medium.data(x),
          };
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
    let item = new DapuqiaoMainSuperviseCompleteModel();
    item.Type = DapuqiaoMainSuperviseCompleteModelType.handle;
    item.Time = data.HandleTime!;
    item.Title = '处置完成';
    item.TitleColor = '#21e452';
    if (urls) {
      item.urls = urls.map((x) => {
        return {
          id: x.CameraId,
          name: x.CameraName,
          url: Medium.data(x.ImageUrl),
        };
      });
    }
    item.left = true;
    return item;
  }
}
