import { Component, Input, OnInit } from '@angular/core';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { EventType } from 'src/app/enum/event-type.enum';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import {
  EventRecordWindowDetailsBusiness,
  EventRecordWindowDetailsProviders,
} from './business/event-record-window-details.business';

@Component({
  selector: 'event-record-window-details',
  templateUrl: './event-record-window-details.component.html',
  styleUrls: ['./event-record-window-details.component.less'],
  providers: [...EventRecordWindowDetailsProviders],
})
export class EventRecordWindowDetailsComponent implements OnInit {
  @Input() type = EventType.IllegalDrop;
  constructor(
    public business: EventRecordWindowDetailsBusiness,
    private global: GlobalStorageService
  ) {}

  division?: Division;

  ngOnInit(): void {
    this.load();
  }

  async load() {
    this.division = await this.business.division.get(this.global.divisionId);
  }
}
