import { formatDate } from '@angular/common';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/common/interfaces/converter.interface';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { Division } from 'src/app/network/model/division.model';
import {
  EventRecord,
  IllegalDropEventRecord,
  MixedIntoEventRecord,
} from 'src/app/network/model/event-record.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { MediumRequestService } from 'src/app/network/request/medium/medium-request.service';
import { EventRecordViewModel } from './event-record.model';

export type EventRecordType = MixedIntoEventRecord | IllegalDropEventRecord;

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
  async Convert(
    source: EventRecordType,
    get: {
      station: (id: string) => Promise<GarbageStation>;
      division: (id: string) => Promise<Division>;
    }
  ): Promise<EventRecordViewModel> {
    let model = new EventRecordViewModel();
    model = Object.assign(model, source);
    model.GarbageStation = await get.station(source.Data.StationId);
    if (source.Data.DivisionId) {
      model.Committees = await get.division(source.Data.DivisionId);
      if (model.Committees.ParentId) {
        model.County = await get.division(model.Committees.ParentId);
        if (model.County.ParentId) {
          model.City = await get.division(model.County.ParentId);
        }
      }
    }

    model.imageSrc = MediumRequestService.jpg(source.ImageUrl);

    model.DateFormatter = formatDate(
      source.EventTime,
      'yyyy-MM-dd HH:mm:dd',
      'en'
    );

    return model;
  }
}
