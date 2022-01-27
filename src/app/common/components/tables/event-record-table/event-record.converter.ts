import { formatDate } from '@angular/common';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/common/interfaces/converter.interface';
import { GarbageStationConverter } from 'src/app/converter/garbage-station.converter';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { Division } from 'src/app/network/model/division.model';
import {
  EventRecord,
  GarbageFullEventRecord,
  IllegalDropEventRecord,
  MixedIntoEventRecord,
} from 'src/app/network/model/event-record.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { MediumRequestService } from 'src/app/network/request/medium/medium-request.service';
import { EventRecordViewModel } from './event-record.model';

export type EventRecordType =
  | MixedIntoEventRecord
  | IllegalDropEventRecord
  | GarbageFullEventRecord;

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
    }
  ): Promise<PagedList<EventRecordViewModel>> {
    let array: EventRecordViewModel[] = [];
    for (let i = 0; i < source.Data.length; i++) {
      const data = source.Data[i];
      let model = await this.converter.item.Convert(data, get);
      array.push(model);
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
  };

  Convert(
    source: EventRecordType,
    getter: {
      station: (id: string) => Promise<GarbageStation>;
      division: (id: string) => Promise<Division>;
    }
  ): Promise<EventRecordViewModel> {
    if (source instanceof GarbageFullEventRecord) {
      return this.fromGarbageFull(source, getter);
    } else {
      return this.fromEventRecord(source, getter);
    }
  }

  async fromEventRecord(
    source: EventRecordType,
    getter: {
      station: (id: string) => Promise<GarbageStation>;
      division: (id: string) => Promise<Division>;
    }
  ): Promise<EventRecordViewModel> {
    let model = new EventRecordViewModel();
    model = Object.assign(model, source);
    let station = await getter.station(source.Data.StationId);
    model.GarbageStation = await this.converter.station.Convert(
      station,
      getter.division
    );

    model.imageSrc = MediumRequestService.jpg(source.ImageUrl);

    model.DateFormatter = formatDate(
      source.EventTime,
      'yyyy-MM-dd HH:mm:dd',
      'en'
    );

    return model;
  }

  async fromGarbageFull(
    source: GarbageFullEventRecord,
    getter: {
      station: (id: string) => Promise<GarbageStation>;
      division: (id: string) => Promise<Division>;
    }
  ) {
    let model = await this.fromEventRecord(source, getter);
    if (source.Data.CameraImageUrls && source.Data.CameraImageUrls.length > 0) {
      model.imageSrc = MediumRequestService.jpg(
        source.Data.CameraImageUrls[0].ImageUrl
      );
    }
    return model;
  }
}
