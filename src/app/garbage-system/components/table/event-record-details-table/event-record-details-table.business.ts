import { Injectable } from '@angular/core';
import { type } from 'os';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import {
  IllegalDropEventRecord,
  MixedIntoEventRecord,
} from 'src/app/network/model/event-record.model';
import { TableColumnModel } from 'src/app/view-model/table.model';

type EventRecordType = IllegalDropEventRecord | MixedIntoEventRecord;

@Injectable()
export class EventRecordDetailsTableBusiness
  implements IBusiness<EventRecordType[], TableColumnModel[]>
{
  Converter: IConverter<EventRecordType[], TableColumnModel[]> = ;
  subscription?: ISubscription | undefined;
  load(...args: any): Promise<TableColumnModel[]> {
    throw new Error('Method not implemented.');
  }
  getData(...args: any): Promise<EventRecordType[]> {
    throw new Error('Method not implemented.');
  }
}
