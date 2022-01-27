import { Injectable } from '@angular/core';
import { EventRecordOperationFilterBusiness } from '../../event-record-operation-filter.business';

@Injectable()
export class EventRecordWindowRecordBusiness {
  constructor(public filter: EventRecordOperationFilterBusiness) {}
}
