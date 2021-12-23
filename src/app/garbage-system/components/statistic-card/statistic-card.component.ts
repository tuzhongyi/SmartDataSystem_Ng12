import { Component, Input, OnInit } from '@angular/core';
import { color } from 'echarts/core';
import { StatisticCardViewModel } from './statistic-card.model';

@Component({
  selector: 'app-statistic-card',
  templateUrl: './statistic-card.component.html',
  styleUrls: ['./statistic-card.component.less'],
})
export class StatisticCardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input()
  model?: StatisticCardViewModel;
}
