import { Component, OnInit } from '@angular/core';
import { EventType } from 'src/app/enum/event-type.enum';
@Component({
  selector: 'garbage-full-window-details',
  templateUrl: './garbage-full-window-details.component.html',
  styleUrls: ['./garbage-full-window-details.component.less'],
})
export class GarbageFullWindowDetailsComponent implements OnInit {
  constructor() {}
  type = EventType.GarbageFull;

  ngOnInit(): void {}
}
