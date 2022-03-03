import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { EventRecord } from 'src/app/network/model/event-record.model';
import { GarbageStationWindowDetailsBusiness } from '../../garbage-station-window/tab-items/garbage-station-window-details/details-chart.business';

@Injectable()
export class EventRecordWindowDetailsBusiness extends GarbageStationWindowDetailsBusiness {}
