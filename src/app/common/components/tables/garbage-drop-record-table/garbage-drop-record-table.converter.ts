import { formatDate } from '@angular/common';
import { IPromiseConverter } from 'src/app/common/interfaces/converter.interface';
import { ImageControlConverter } from 'src/app/converter/image-control.converter';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { Language } from 'src/app/common/tools/language';
import { Camera } from 'src/app/network/model/camera.model';
import { Division } from 'src/app/network/model/division.model';
import { GarbageDropEventRecord } from 'src/app/network/model/garbage-event-record.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { EventRecordConverter } from '../event-record/event-record.converter';
import { CameraImageUrlModel } from '../event-record/event-record.model';
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
      camera: (id: string) => Promise<Camera>;
    }
  ): Promise<PagedList<GarbageDropRecordViewModel>> {
    let array: GarbageDropRecordViewModel[] = [];
    for (let i = 0; i < source.Data.length; i++) {
      try {
        const data = source.Data[i];
        let model = await this.converter.item.Convert(data, getter);
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
      camera: (stationId: string, cameraId: string) => Promise<Camera>;
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
        try {
          let url = new CameraImageUrlModel(
            source.Data.DropImageUrls[i],
            source.Data.StationId
          );
          url.Camera = getter.camera(source.Data.StationId, url.CameraId);
          let image = this.converter.image.Convert(
            url,
            true,
            source.Data.DropTime
          );
          model.images.push(image);
        } catch (error) {
          console.error(error, this, source.Data.DropImageUrls[i]);
        }
      }
    }
    if (source.Data.TimeoutImageUrls) {
      for (let i = 0; i < source.Data.TimeoutImageUrls.length; i++) {
        try {
          let url = new CameraImageUrlModel(
            source.Data.TimeoutImageUrls[i],
            source.Data.StationId
          );
          url.Camera = getter.camera(source.Data.StationId, url.CameraId);
          let image = this.converter.image.Convert(url, true, source.EventTime);
          model.images.push(image);
        } catch (error) {
          console.error(error, this, source.Data.TimeoutImageUrls[i]);
        }
      }
    }
    if (source.Data.HandleImageUrls) {
      for (let i = 0; i < source.Data.HandleImageUrls.length; i++) {
        try {
          let url = new CameraImageUrlModel(
            source.Data.HandleImageUrls[i],
            source.Data.StationId
          );
          url.Camera = getter.camera(source.Data.StationId, url.CameraId);
          let image = this.converter.image.Convert(
            url,
            true,
            source.Data.HandleTime
          );
          model.images.push(image);
        } catch (error) {
          console.error(error, this, source.Data.HandleImageUrls[i]);
        }
      }
    }

    if (source.Data.DivisionId) {
      model.Committees = await getter.division(source.Data.DivisionId);
      if (model.Committees && model.Committees.ParentId) {
        model.County = await getter.division(model.Committees.ParentId);
      }
    }

    return model;
  }
}
