import { Component, Input, OnInit } from '@angular/core';

import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';

import { IModel } from 'src/app/network/model/model.interface';
import { StatisticCardBussiness } from '../monitor/business/statistic-card.bussiness';
import { StatisticCardViewModel } from './statistic-card.model';

@Component({
  selector: 'app-statistic-card',
  templateUrl: './statistic-card.component.html',
  styleUrls: ['./statistic-card.component.less'],
  providers: [StatisticCardBussiness],
})
export class StatisticCardComponent implements OnInit {
  constructor(business: StatisticCardBussiness) {
    this.business = business;
  }

  @Input()
  business: IBusiness<IModel, StatisticCardViewModel[]>;

  ngOnInit(): void {}

  @Input()
  model?: StatisticCardViewModel;
}
