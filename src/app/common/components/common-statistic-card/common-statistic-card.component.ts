import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonStatisticCardModel } from './common-statistic-card.model';

@Component({
  selector: 'common-statistic-card',
  templateUrl: './common-statistic-card.component.html',
  styleUrls: ['./common-statistic-card.component.less'],
})
export class CommonStatisticCardComponent implements OnInit {
  @Input() model?: CommonStatisticCardModel;

  @Output() clickEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  clickCard(e: Event) {
    e.stopPropagation();
    if (this.model) this.clickEvent.emit(this.model);
  }
}
