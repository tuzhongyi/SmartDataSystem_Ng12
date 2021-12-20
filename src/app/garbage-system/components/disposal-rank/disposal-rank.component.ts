import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { StoreService } from 'src/app/global/service/store.service';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station-number-statistic.model';
import { RankModel } from 'src/app/view-model/rank.model';
import { DisposalRankBusiness } from './disposal-rank.business';

@Component({
  selector: 'app-disposal-rank',
  templateUrl: './disposal-rank.component.html',
  styleUrls: ['./disposal-rank.component.less'],
  providers: [DisposalRankBusiness],
})
export class DisposalRankComponent implements OnInit, OnDestroy {
  public title: string = '小包垃圾处置达标率排名';

  // 处理后的排行榜数据
  public rankData: RankModel[] = [];

  constructor(private business: DisposalRankBusiness) {}

  ngOnInit(): void {
    this.business.subscription.subscribe(() => {
      this.loadData();
    });
    this.loadData();
  }
  ngOnDestroy() {
    this.business.subscription.destroy();
  }
  async loadData() {
    this.rankData = await this.business.load();
  }
}
