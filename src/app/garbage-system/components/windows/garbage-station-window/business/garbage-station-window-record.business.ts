import { Injectable } from '@angular/core';
import { GarbageDropRecordFilter } from 'src/app/common/components/tables/garbage-drop-record-table/garbage-drop-record.model';
import { EventRecordOperationFilterBusiness } from '../../event-record-operation-filter.business';

@Injectable()
export class GarbageStationWindowRecordBusiness {
  constructor(public filter: EventRecordOperationFilterBusiness) {
    filter.filter = new GarbageDropRecordFilter();
  }
}
