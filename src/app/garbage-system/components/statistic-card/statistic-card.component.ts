import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { StatisticCardViewModel } from './statistic-card.model';

@Component({
  selector: 'app-statistic-card',
  templateUrl: './statistic-card.component.html',
  styleUrls: ['./statistic-card.component.less'],
})
export class StatisticCardComponent implements OnInit {
  constructor() {}

  @Output()
  Click: EventEmitter<StatisticCardViewModel> = new EventEmitter();

  ngOnInit(): void {}

  @Input()
  model?: StatisticCardViewModel;

  onclick() {
    this.Click.emit(this.model);
  }
}
