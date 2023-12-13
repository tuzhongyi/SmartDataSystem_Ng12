import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { Medium } from 'src/app/common/tools/medium';
import { OrderType } from 'src/app/enum/order-type.enum';
import { GarbageDropEventRecord } from 'src/app/network/model/garbage-station/event-record/garbage-drop-event-record.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { CameraImageUrl } from 'src/app/network/model/url.model';
import { GetGarbageDropEventRecordsParams } from 'src/app/network/request/event/event-request.params';
import {
  DapuqiaoGarbageDropRecordTableArgs,
  GarbageDropEventRecordModel,
} from './dapuqiao-garbage-drop-record-table.model';
import { DaPuQiaoGarbageDropRecordTableService } from './dapuqiao-garbage-drop-record-table.service';

@Injectable()
export class DaPuQiaoGarbageDropRecordTableBusiness
  implements
    IBusiness<
      PagedList<GarbageDropEventRecord>,
      PagedList<GarbageDropEventRecordModel>
    >
{
  constructor(private service: DaPuQiaoGarbageDropRecordTableService) {}
  async load(
    index: number,
    size: number,
    args: DapuqiaoGarbageDropRecordTableArgs
  ): Promise<PagedList<GarbageDropEventRecordModel>> {
    let data = await this.getData(index, size, args);
    let paged = new PagedList<GarbageDropEventRecordModel>();
    paged.Page = data.Page;
    paged.Data = data.Data.map((x) => this.convert(x));
    return paged;
  }
  getData(
    index: number,
    size: number,
    args: DapuqiaoGarbageDropRecordTableArgs
  ): Promise<PagedList<GarbageDropEventRecord>> {
    let params = new GetGarbageDropEventRecordsParams();
    params.PageIndex = index;
    params.PageSize = size;
    params.BeginTime = args.duration.begin;
    params.EndTime = args.duration.end;
    if (args.divisionId) {
      params.DivisionIds = [args.divisionId];
    }
    if (args.stationId) {
      params.StationIds = [args.stationId];
    }
    // if (args.level !== undefined) {
    //   params.Level = args.level;
    // }
    if (args.supervised !== undefined) {
      params.SupervisedState = args.supervised ? 1 : 0;
    }
    if (args.feedback !== undefined) {
      params.FeedbackState = args.feedback ? 1 : 0;
    }
    params.IsHandle = args.handle;

    params.DropTimeOrderBy = OrderType.Desc;

    return this.service.event.record.GarbageDrop.list(params);
  }

  convert(input: GarbageDropEventRecord) {
    let plain = instanceToPlain(input);
    let model = plainToInstance(GarbageDropEventRecordModel, plain);
    model.GarbageStation = this.service.station.cache.get(input.Data.StationId);

    model.LevelTime = input.Data.DropTime;
    if (input.Data.SuperVisionData) {
      switch (input.Data.SuperVisionData.Level) {
        case 1:
          model.Level = '一级';
          if (input.Data.SuperVisionData.Level1Time) {
            model.LevelTime = input.Data.SuperVisionData.Level1Time;
          }
          break;
        case 2:
          model.Level = '二级';
          if (input.Data.SuperVisionData.Level2Time) {
            model.LevelTime = input.Data.SuperVisionData.Level2Time;
          }
          break;
        case 3:
          model.Level = '三级';
          if (input.Data.SuperVisionData.Level3Time) {
            model.LevelTime = input.Data.SuperVisionData.Level3Time;
          }
          break;
        default:
          break;
      }
    }
    model.Minutes = input.Data.TakeMinutes;
    if (!model.Minutes) {
      model.Minutes =
        (new Date().getTime() - input.Data.DropTime.getTime()) / (1000 * 60);
    }

    if (model.Data.DivisionId) {
      model.Committee = this.service.division.cache
        .get(model.Data.DivisionId)
        .then((x) => {
          if (x.ParentId) {
            model.County = this.service.division.cache.get(x.ParentId);
          }
          return x;
        });
    }

    if (input.Data.Feedbacks && input.Data.Feedbacks.length > 0) {
      model.FeedbackUserName = input.Data.Feedbacks[0].FeedbackUserName;
    }

    let urls: CameraImageUrl[] = [];
    if (input.Data.DropImageUrls) {
      urls = [...urls, ...input.Data.DropImageUrls];
    }
    if (input.Data.TimeoutImageUrls) {
      urls = [...urls, ...input.Data.TimeoutImageUrls];
    }
    if (input.Data.HandleImageUrls) {
      urls = [...urls, ...input.Data.HandleImageUrls];
    }
    model.imgs = urls.map((x) => {
      return {
        id: x.CameraId,
        name: x.CameraName,
        url: Medium.data(x.ImageUrl),
      };
    });

    return model;
  }
}
