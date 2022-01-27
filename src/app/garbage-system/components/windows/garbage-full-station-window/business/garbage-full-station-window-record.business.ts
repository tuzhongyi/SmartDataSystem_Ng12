import { Injectable } from '@angular/core';
import { EventRecordOperationFilterBusiness } from '../../event-record-operation-filter.business';

@Injectable()
export class GarbageFullStationWindowRecordBusiness {
  constructor(public filter: EventRecordOperationFilterBusiness) {}
}
