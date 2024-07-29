import { Component, OnInit } from '@angular/core';
import { EventType } from 'src/app/enum/event-type.enum';

@Component({
  selector: 'garbage-full-window-count',
  templateUrl: './garbage-full-window-count.component.html',
  styleUrls: ['./garbage-full-window-count.component.less'],
})
export class GarbageFullWindowCountComponent implements OnInit {
  constructor() {}
  type = EventType.GarbageFull;
  ngOnInit(): void {}
}
