import { Injectable } from '@angular/core';
import { GarbageDropRecordFilter } from 'src/app/common/components/tables/garbage-drop-record-table/garbage-drop-record.model';

@Injectable()
export class GarbageStationWindowRecordBusiness {
  constructor() {}

  drop = new GarbageDropRecordFilter();
}
