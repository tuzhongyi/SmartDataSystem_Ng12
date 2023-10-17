import { formatDate } from '@angular/common';
import { IPromiseConverter } from 'src/app/common/interfaces/converter.interface';
import { LocaleCompare } from 'src/app/common/tools/locale-compare';
import { GarbageStationConverter } from 'src/app/converter/garbage-station.converter';
import { ImageControlConverter } from 'src/app/converter/image-control.converter';
import { Camera } from 'src/app/network/model/camera.model';
import { Division } from 'src/app/network/model/division.model';
import {
  GarbageFullEventRecord,
  IllegalDropEventRecord,
  MixedIntoEventRecord,
  SmokeEventRecord,
} from 'src/app/network/model/garbage-event-record.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { CameraImageUrl } from 'src/app/network/model/url.model';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';
import { CameraImageUrlModel } from './event-record.model';

export type EventRecordType =
  | MixedIntoEventRecord
  | IllegalDropEventRecord
  | GarbageFullEventRecord
  | SmokeEventRecord;

export class EventRecordPagedConverter
  implements
    IPromiseConverter<
      PagedList<EventRecordType>,
      PagedList<EventRecordViewModel>
    >
{
  private converter = {
    item: new EventRecordConverter(),
  };

  async Convert(
    source: PagedList<EventRecordType>,
    get: {
      station: (id: string) => Promise<GarbageStation>;
      division: (id: string) => Promise<Division>;
      camera: (stationId: string, cameraId: string) => Promise<Camera>;
    }
  ): Promise<PagedList<EventRecordViewModel>> {
    let array: EventRecordViewModel[] = [];
    for (let i = 0; i < source.Data.length; i++) {
      const data = source.Data[i];
      try {
        let model = await this.converter.item.Convert(data, get);
        array.push(model);
      } catch (error) {
        console.error(error, this, data);
      }
    }
    return {
      Page: source.Page,
      Data: array,
    };
  }
}

export class EventRecordConverter
  implements IPromiseConverter<EventRecordType, EventRecordViewModel>
{
  converter = {
    station: new GarbageStationConverter(),
    image: new ImageControlConverter(),
  };

  Convert(
    source: EventRecordType,
    getter: {
      station: (id: string) => Promise<GarbageStation>;
      division: (id: string) => Promise<Division>;
      camera: (stationId: string, cameraId: string) => Promise<Camera>;
    }
  ): Promise<EventRecordViewModel> {
    if (source instanceof GarbageFullEventRecord) {
      return this.fromGarbageFull(source, getter);
    } else if (source instanceof IllegalDropEventRecord) {
      return this.fromIllegalDrop(source, getter);
    } else if (source instanceof SmokeEventRecord) {
      return this.fromSmoke(source, getter);
    } else {
      return this.fromEventRecord(source, getter);
    }
  }

  async fromEventRecord(
    source: EventRecordType,
    getter: {
      station: (id: string) => Promise<GarbageStation>;
      division: (id: string) => Promise<Division>;
      camera: (stationId: string, cameraId: string) => Promise<Camera>;
    }
  ): Promise<EventRecordViewModel> {
    let model = new EventRecordViewModel();
    model = Object.assign(model, source);
    let station = await getter.station(source.Data.StationId);
    model.GarbageStation = await this.converter.station.Convert(
      station,
      getter.division
    );

    let img: CameraImageUrl = {
      CameraId: source.ResourceId ?? '',
      CameraName: source.ResourceName,
      ImageUrl: source.ImageUrl ?? '',
    };
    let url = new CameraImageUrlModel(img, source.Data.StationId);
    url.Camera = await getter.camera(source.Data.StationId, url.CameraId);
    let image = this.converter.image.Convert(url, true, source.EventTime);

    model.images = [image];

    model.BeginTimeFormatter = formatDate(
      source.EventTime,
      'yyyy-MM-dd HH:mm:ss',
      'en'
    );
    return model;
  }

  async fromIllegalDrop(
    source: IllegalDropEventRecord,
    getter: {
      station: (id: string) => Promise<GarbageStation>;
      division: (id: string) => Promise<Division>;
      camera: (stationId: string, cameraId: string) => Promise<Camera>;
    }
  ) {
    let model = await this.fromEventRecord(source, getter);
    if (model.images && model.images.length > 0) {
      model.images[0].polygon = source.Data.Objects;
      model.images[0].rules = source.Data.Rules;
    }
    return model;
  }

  async fromGarbageFull(
    source: GarbageFullEventRecord,
    getter: {
      station: (id: string) => Promise<GarbageStation>;
      division: (id: string) => Promise<Division>;
      camera: (stationId: string, cameraId: string) => Promise<Camera>;
    }
  ) {
    let model = await this.fromEventRecord(source, getter);
    model.images = [];
    if (source.Data.CameraImageUrls && model.GarbageStation) {
      let urls = source.Data.CameraImageUrls.sort((a, b) => {
        return LocaleCompare.compare(a.CameraName ?? '', b.CameraName ?? '');
      });
      for (let i = 0; i < urls.length; i++) {
        try {
          const url = new CameraImageUrlModel(urls[i], source.Data.StationId);
          url.Camera = await getter.camera(source.Data.StationId, url.CameraId);
          let image = this.converter.image.Convert(url, true, source.EventTime);
          image.index = i;
          model.images.push(image);
        } catch (error) {
          console.error(error, this, urls[i]);
        }
      }
    }

    return model;
  }
  async fromSmoke(
    source: SmokeEventRecord,
    getter: {
      station: (id: string) => Promise<GarbageStation>;
      division: (id: string) => Promise<Division>;
      camera: (stationId: string, cameraId: string) => Promise<Camera>;
    }
  ) {
    let model = await this.fromEventRecord(source, getter);
    model.images = [];
    if (source.Data.EndTime) {
      model.EndTimeFormatter = formatDate(
        source.Data.EndTime,
        'yyyy-MM-dd HH:mm:ss',
        'en'
      );
    }
    if (source.Data.BeginTime) {
      model.BeginTimeFormatter = formatDate(
        source.Data.BeginTime,
        'yyyy-MM-dd HH:mm:ss',
        'en'
      );
    }
    if (source.Data.CameraImageUrls && model.GarbageStation) {
      let urls = source.Data.CameraImageUrls.sort((a, b) => {
        return LocaleCompare.compare(b.CameraName ?? '', a.CameraName ?? '');
      });
      for (let i = 0; i < urls.length; i++) {
        try {
          const url = new CameraImageUrlModel(urls[i], source.Data.StationId);
          url.Camera = await getter.camera(source.Data.StationId, url.CameraId);
          let image = this.converter.image.Convert(url, true, source.EventTime);
          image.index = i;
          model.images.push(image);
        } catch (error) {
          console.error(error, this, urls[i]);
        }
      }
    }
    return model;
  }
}
