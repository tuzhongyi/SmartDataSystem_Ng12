import { Injectable } from '@angular/core';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { EventRecordFilter } from 'src/app/common/components/tables/event-record/event-record.model';
import { EventType } from 'src/app/enum/event-type.enum';
import { GarbageTaskStatus } from 'src/app/enum/garbage-task-status.enum';
import { DurationParams } from 'src/app/network/request/IParams.interface';

export class GarbageStationWindowRecordFilterModel {
  divisions: SelectItem[] = [];
  stations: SelectItem[] = [];
}
