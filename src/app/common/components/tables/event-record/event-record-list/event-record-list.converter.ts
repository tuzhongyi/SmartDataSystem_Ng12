import { Injectable } from '@angular/core';
import { IPromiseConverter } from 'src/app/common/interfaces/converter.interface';
import { Medium } from 'src/app/common/tools/medium';
import { EventType } from 'src/app/enum/event-type.enum';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';
import { EventRecordCardModel } from '../../../cards/event-record-card/event-record-card.model';

@Injectable()
export class EventRecordListConverter
  implements IPromiseConverter<EventRecordViewModel[], EventRecordCardModel[]>
{
  constructor(private service: DivisionRequestService) {}
  converter = {
    item: new EventRecordListItemConverter(this.service),
  };
  async Convert(
    source: EventRecordViewModel[]
  ): Promise<EventRecordCardModel[]> {
    let list = new Array();
    for (let i = 0; i < source.length; i++) {
      try {
        let item = await this.converter.item.Convert(source[i]);
        list.push(item);
      } catch (error) {
        console.error(error, this, source[i]);
      }
    }
    return list;
  }
}

export class EventRecordListItemConverter
  implements IPromiseConverter<EventRecordViewModel, EventRecordCardModel>
{
  constructor(private service: DivisionRequestService) {}
  async Convert(source: EventRecordViewModel): Promise<EventRecordCardModel> {
    let model = new EventRecordCardModel(source);
    model.id = source.EventId;
    model.name = source.ResourceName ?? '-';
    model.time = source.EventTime;
    model.station = source.GarbageStation;
    if (model.station && model.station.DivisionId) {
      model.parent = await this.service.cache.get(model.station.DivisionId);
    }
    model.img = Medium.img(source.ImageUrl);

    if (source.EventType === EventType.GarbageFull) {
      if (source.urls && source.urls.length > 0) {
        model.img = source.urls[0];
      }
    }

    return model;
  }
}
