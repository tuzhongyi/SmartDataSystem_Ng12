import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { IPromiseConverter } from 'src/app/common/interfaces/converter.interface';
import { Medium } from 'src/app/common/tools/medium';
import { ImageControlConverter } from 'src/app/converter/image-control.converter';
import { GarbageStationModelConverter } from 'src/app/converter/view-models/garbage-station.model.converter';
import { EventType } from 'src/app/enum/event-type.enum';
import { Camera } from 'src/app/network/model/garbage-station/camera.model';
import { GarbageFullEventRecord } from 'src/app/network/model/garbage-station/event-record/garbage-full-event-record.model';
import { IllegalDropEventRecord } from 'src/app/network/model/garbage-station/event-record/illegal-drop-event-record.model';
import { MixedIntoEventRecord } from 'src/app/network/model/garbage-station/event-record/mixed-into-event-record.model';
import { SewageEventRecord } from 'src/app/network/model/garbage-station/event-record/sewage-event-record.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { CameraImageUrl } from 'src/app/network/model/url.model';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';
import { CameraImageUrlModel } from './event-record.model';

export type EventRecordType =
  | MixedIntoEventRecord
  | IllegalDropEventRecord
  | GarbageFullEventRecord
  | SewageEventRecord;

@Injectable()
export class EventRecordPagedConverter
  implements
    IPromiseConverter<
      PagedList<EventRecordType>,
      PagedList<EventRecordViewModel>
    >
{
  constructor(private item: EventRecordConverter) {}

  async Convert(
    source: PagedList<EventRecordType>
  ): Promise<PagedList<EventRecordViewModel>> {
    let array: EventRecordViewModel[] = [];
    for (let i = 0; i < source.Data.length; i++) {
      const data = source.Data[i];
      try {
        let model = await this.item.Convert(data);
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
@Injectable()
export class EventRecordConverter
  implements IPromiseConverter<EventRecordType, EventRecordViewModel>
{
  constructor(
    private service: GarbageStationRequestService,
    private stationConverter: GarbageStationModelConverter
  ) {}
  converter = {
    image: new ImageControlConverter(),
  };

  Convert(source: EventRecordType): Promise<EventRecordViewModel> {
    if (source instanceof GarbageFullEventRecord) {
      return this.fromGarbageFull(source);
    } else if (source instanceof IllegalDropEventRecord) {
      return this.fromIllegalDrop(source);
    } else if (source instanceof SewageEventRecord) {
      return this.fromSewage(source);
    } else if (source instanceof MixedIntoEventRecord) {
      return this.fromMixedInto(source);
    } else {
      return this.fromEventRecord(source);
    }
  }

  async fromEventRecord(
    source: EventRecordType
  ): Promise<EventRecordViewModel> {
    let model = new EventRecordViewModel();
    model = Object.assign(model, source);
    let station = await this.service.get(source.Data.StationId);
    model.GarbageStation = await this.stationConverter.Convert(station);

    let img: CameraImageUrl = {
      CameraId: source.ResourceId ?? '',
      CameraName: source.ResourceName,
      ImageUrl: source.ImageUrl ?? '',
    };
    let url = new CameraImageUrlModel(img, source.Data.StationId);

    url.Camera = new Promise<Camera>((resolve) => {
      if (station.Cameras) {
        let camera = station.Cameras.find((x) => x.Id === url.CameraId);
        if (camera) {
          resolve(camera);
        }
      }
    });
    let image = this.converter.image.Convert(url, true, source.EventTime);
    image.name = model.GarbageStation.Name;
    model.images = [image];

    model.urls = [Medium.img(source.ImageUrl)];

    model.DateFormatter = formatDate(
      source.EventTime,
      'yyyy-MM-dd HH:mm:dd',
      'en'
    );
    EventType.IllegalDrop;
    return model;
  }

  async fromIllegalDrop(source: IllegalDropEventRecord) {
    let model = await this.fromEventRecord(source);
    if (model.images && model.images.length > 0) {
      model.images[0].polygon = source.Data.Objects;
      model.images[0].rules = source.Data.Rules;
    }
    return model;
  }

  async fromGarbageFull(source: GarbageFullEventRecord) {
    let model = await this.fromEventRecord(source);
    if (source.Data.CameraImageUrls) {
      model.urls = source.Data.CameraImageUrls.map((x) => {
        return Medium.img(x.ImageUrl);
      });
    }

    model.images = [];
    if (source.Data.CameraImageUrls && model.GarbageStation) {
      for (let i = 0; i < source.Data.CameraImageUrls.length; i++) {
        try {
          const url = new CameraImageUrlModel(
            source.Data.CameraImageUrls[i],
            source.Data.StationId
          );

          url.Camera = new Promise<Camera>((resolve) => {
            if (model.GarbageStation!.Cameras) {
              let camera = model.GarbageStation!.Cameras.find(
                (x) => x.GarbageStationId === model.Data.StationId
              );
              if (camera) {
                resolve(camera);
              }
            }
          });

          let image = this.converter.image.Convert(url, true, source.EventTime);
          image.name = source.Data.StationName;
          image.index = i;
          model.images.push(image);
        } catch (error) {
          console.error(error, this, source.Data.CameraImageUrls[i]);
        }
      }
    }

    model.ProcessorName = source.Data.ProcessorName;
    model.ProcessTime = source.Data.ProcessTime;

    return model;
  }

  async fromSewage(source: SewageEventRecord) {
    let model = await this.fromEventRecord(source);
    // if (source.Data.CameraImageUrls) {
    //   model.urls = source.Data.CameraImageUrls.map((x) => {
    //     return Medium.img(x.ImageUrl);
    //   });
    // }
    model.ProcessorName = source.Data.ProcessorName;
    model.ProcessTime = source.Data.ProcessTime;
    return model;
  }

  async fromMixedInto(source: MixedIntoEventRecord) {
    let model = await this.fromEventRecord(source);
    model.ProcessorName = source.Data.ProcessorName;
    model.ProcessTime = source.Data.ProcessTime;
    return model;
  }
}
