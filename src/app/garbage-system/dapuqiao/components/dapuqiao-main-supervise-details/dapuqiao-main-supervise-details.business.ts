import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { Medium } from 'src/app/common/tools/medium';
import { GarbageDropEventRecord } from 'src/app/network/model/garbage-station/garbage-event-record.model';
import { Member } from 'src/app/network/model/garbage-station/member.model';
import { CameraImageUrl } from 'src/app/network/model/url.model';
import { GarbageDropSuperviseParams } from 'src/app/network/request/event/event-request.params';
import { ImageControlModel } from 'src/app/view-model/image-control.model';
import {
  GarbageDropEventRecordImage,
  GarbageDropEventRecordModel,
} from './dapuqiao-main-supervise-details.model';
import { DapuqiaoMainSuperviseDetailsService } from './dapuqiao-main-supervise-details.service';

@Injectable()
export class DapuqiaoMainSuperviseDetailsBusiness
  implements IBusiness<GarbageDropEventRecord, GarbageDropEventRecordModel>
{
  constructor(
    private service: DapuqiaoMainSuperviseDetailsService,
    private local: LocalStorageService
  ) {}
  supervise(eventId: string, member?: Member) {
    let params = new GarbageDropSuperviseParams();
    params.Supervisor = this.local.user.Username;
    params.CallUserId = member?.Id;
    params.CallUserMobileNo = member?.MobileNo;
    params.CallUserName = member?.Name;
    return this.service.event.record.GarbageDrop.supervise(eventId, params);
  }

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

    model.GarbageStation.then((station) => {
      model.Members = station.Members ?? [];
    });

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
    model.LevelTime = input.Data.DropTime;
    if (input.Data.SuperVisionData) {
      switch (input.Data.SuperVisionData.Level) {
        case 1:
          if (input.Data.SuperVisionData.Level1Time) {
            model.LevelTime = input.Data.SuperVisionData.Level1Time;
          }
          break;
        case 2:
          if (input.Data.SuperVisionData.Level2Time) {
            model.LevelTime = input.Data.SuperVisionData.Level2Time;
          }
          break;
        case 3:
          if (input.Data.SuperVisionData.Level3Time) {
            model.LevelTime = input.Data.SuperVisionData.Level3Time;
          }
          break;
        default:
          break;
      }
    }

    model.Image = new GarbageDropEventRecordImage();
    model.Image.models = urls.map((x, i) => {
      let img = new ImageControlModel();
      img.name = x.CameraName ?? input.Data.StationName;
      img.index = i;
      img.src = Medium.img(x.ImageUrl);
      img.stationId = input.Data.StationId;
      return img;
    });

    model.Minutes = input.Data.TakeMinutes;
    if (!model.Minutes) {
      model.Minutes =
        (new Date().getTime() - input.Data.DropTime.getTime()) / (1000 * 60);
    }
    return model;
  }
}
