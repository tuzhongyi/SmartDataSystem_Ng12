import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { IPromiseConverter } from 'src/app/common/interfaces/converter.interface';
import { Language } from 'src/app/common/tools/language';
import { Medium } from 'src/app/common/tools/medium';
import { GarbageDropEventRecord } from 'src/app/network/model/garbage-station/garbage-event-record.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { GarbageDropRecordViewModel } from './garbage-drop-record.model';

@Injectable()
export class GarbageDropEventRecordPagedConverter
  implements
    IPromiseConverter<
      PagedList<GarbageDropEventRecord>,
      PagedList<GarbageDropRecordViewModel>
    >
{
  constructor(private item: GarbageDropEventRecordConverter) {}

  async Convert(
    source: PagedList<GarbageDropEventRecord>
  ): Promise<PagedList<GarbageDropRecordViewModel>> {
    let array: GarbageDropRecordViewModel[] = [];
    for (let i = 0; i < source.Data.length; i++) {
      try {
        const data = source.Data[i];
        let model = await this.item.Convert(data);
        array.push(model);
      } catch (error) {
        console.error(error, this, source.Data[i]);
      }
    }
    return {
      Page: source.Page,
      Data: array,
    };
  }
}

@Injectable()
export class GarbageDropEventRecordConverter
  implements
    IPromiseConverter<GarbageDropEventRecord, GarbageDropRecordViewModel>
{
  constructor(
    private division: DivisionRequestService,
    private station: GarbageStationRequestService
  ) {}
  async Convert(
    source: GarbageDropEventRecord
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
    let all: Promise<string>[] = [];
    if (source.Data.DropImageUrls) {
      all.push(
        ...source.Data.DropImageUrls.map((url) => Medium.img(url.ImageUrl))
      );
    }
    if (source.Data.TimeoutImageUrls) {
      all.push(
        ...source.Data.TimeoutImageUrls.map((url) => Medium.img(url.ImageUrl))
      );
    }
    if (source.Data.HandleImageUrls) {
      all.push(
        ...source.Data.HandleImageUrls.map((url) => Medium.img(url.ImageUrl))
      );
    }
    model.urls = Promise.all(all);

    if (source.Data.DivisionId) {
      model.Committees = this.division.get(source.Data.DivisionId);
      model.County = model.Committees.then((committees) => {
        return new Promise((resolve) => {
          if (committees.ParentId) {
            resolve(this.division.get(committees.ParentId));
          }
        });
      });
    }

    return model;
  }
}
