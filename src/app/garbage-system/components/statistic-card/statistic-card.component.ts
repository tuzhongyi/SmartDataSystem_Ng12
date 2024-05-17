import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { StatisticCardViewModel } from './statistic-card.model';

@Component({
  selector: 'app-statistic-card',
  templateUrl: './statistic-card.component.html',
  styleUrls: ['./statistic-card.component.less'],
})
export class StatisticCardComponent implements OnInit {
  @Input() model?: StatisticCardViewModel;
  @Output() Click: EventEmitter<StatisticCardViewModel> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onclick() {
    this.Click.emit(this.model);
  }
}
