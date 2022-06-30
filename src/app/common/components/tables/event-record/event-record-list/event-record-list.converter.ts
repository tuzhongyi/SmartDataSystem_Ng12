import { IPromiseConverter } from 'src/app/common/interfaces/converter.interface';
import { ImageControlConverter } from 'src/app/converter/image-control.converter';
import { Division } from 'src/app/network/model/division.model';
import { Medium } from 'src/app/common/tools/medium';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';
import { ImageControlModel } from 'src/app/view-model/image-control.model';
import { EventRecordCardModel } from '../../../cards/event-record-card/event-record-card.model';

export class EventRecordListConverter
  implements IPromiseConverter<EventRecordViewModel[], EventRecordCardModel[]>
{
  converter = {
    item: new EventRecordListItemConverter(),
  };
  async Convert(
    source: EventRecordViewModel[],
    getter: {
      division: (id: string) => Promise<Division>;
      img: (id: string) => string;
    }
  ): Promise<EventRecordCardModel[]> {
    let list = new Array();
    for (let i = 0; i < source.length; i++) {
      try {
        let item = await this.converter.item.Convert(source[i], getter);
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
  converter = {
    img: new ImageControlConverter(),
  };
  async Convert(
    source: EventRecordViewModel,
    getter: {
      division: (id: string) => Promise<Division>;
      img: (id: string) => string;
    }
  ): Promise<EventRecordCardModel> {
    let model = new EventRecordCardModel(source);
    model.id = source.EventId;
    model.name = source.ResourceName ?? '-';
    model.time = source.EventTime;
    model.station = source.GarbageStation;
    if (model.station && model.station.DivisionId) {
      model.parent = await getter.division(model.station.DivisionId);
    }
    model.img = await Medium.img(source.ImageUrl);

    return model;
  }
}
