import { Component, OnInit } from '@angular/core';
import { EventRecordCardModel } from './event-record-card.model';

@Component({
  selector: 'howell-event-record-card',
  templateUrl: './event-record-card.component.html',
  styleUrls: ['./event-record-card.component.less']
})
export class EventRecordCardComponent implements OnInit {

  model?: EventRecordCardModel

  constructor() { }

  ngOnInit(): void {
    
  }

}
