import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'event-handle-complete-item',
  templateUrl: './event-handle-complete-item.component.html',
  styleUrls: ['./event-handle-complete-item.component.less'],
})
export class EventHandleCompleteItemComponent implements OnInit {
  @Input() left = false;
  @Input() top = false;
  @Input() bottom = false;

  @Input() lineOffset = '24px';
  @Input() width = '270px';
  @Input() note?: string;
  @Input() color?: string;

  constructor() {}

  ngOnInit(): void {}
}
