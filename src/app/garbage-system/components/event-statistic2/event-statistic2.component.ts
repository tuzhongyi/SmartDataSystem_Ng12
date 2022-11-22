/*
 * @Author: pmx
 * @Date: 2022-11-21 17:33:38
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-21 17:39:42
 */
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { EventType } from 'src/app/enum/event-type.enum';

@Component({
  selector: 'event-statistic2',
  templateUrl: './event-statistic2.component.html',
  styleUrls: ['./event-statistic2.component.less'],
})
export class EventStatistic2Component implements OnInit, OnDestroy {
  @Input() type: EventType = EventType.MixedInto;

  constructor() {}

  ngOnInit(): void {}
  ngOnDestroy(): void {}
}
