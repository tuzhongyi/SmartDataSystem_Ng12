import { Component, OnInit } from '@angular/core';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { StoreService } from 'src/app/global/service/store.service';
import { Division } from 'src/app/network/model/division.model';
import { EventNumberStatistic } from 'src/app/network/model/event-number-statistic.model';
import { IllegalStatisticBusiness } from './illegal-statistic.business';

@Component({
  selector: 'app-illegal-statistic',
  templateUrl: './illegal-statistic.component.html',
  styleUrls: ['./illegal-statistic.component.less'],
  providers: [IllegalStatisticBusiness],
})
export class IllegalStatisticComponent implements OnInit {
  // 当前区划id
  private divisionId: string = '';

  // 当前区划类型
  private currentDivisionType: DivisionType = DivisionType.None;

  // 当前区划
  private currentDivision: Division | null = null;

  private currentDate = new Date();

  private rawData: EventNumberStatistic[] = [];

  constructor(
    private storeService: StoreService,
    private business: IllegalStatisticBusiness
  ) {
    this.storeService.statusChange.subscribe(() => {
      this.changeStatus();
    });
  }

  ngOnInit(): void {
    this.changeStatus();
  }

  changeStatus() {
    console.log('change status');
    this.divisionId = this.storeService.divisionId;
    this.currentDivisionType = this.storeService.divisionType;

    this.loadData();
  }
  async loadData() {
    this.currentDivision = await this.business.getCurrentDivision(
      this.divisionId
    );
    // console.log('当前区划', this.currentDivision);

    let data = await this.business.statistic(
      this.divisionId,
      TimeUnit.Hour,
      this.currentDate
    );
    if (data) {
      this.rawData = data;
    }
    console.log('rawData', this.rawData);
  }
}
