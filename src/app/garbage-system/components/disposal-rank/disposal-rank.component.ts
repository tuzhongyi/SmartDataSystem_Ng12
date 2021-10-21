import { Component, OnInit } from '@angular/core';
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
export class DisposalRankComponent implements OnInit {
  public title: string = '小包垃圾处置达标率排名';

  // 处理后的排行榜数据
  public rankData: RankModel[] = [];

  // 当前区划id
  private divisionId: string = '';

  // 当前区划类型
  private currentDivisionType: DivisionType = DivisionType.None;

  // 当前区划
  private currentDivision: Division | null = null;

  // 服务器数据
  private rawData: GarbageStationNumberStatistic[] = [];

  constructor(
    private storeService: StoreService,
    private business: DisposalRankBusiness
  ) {
    this.storeService.statusChange.subscribe(() => {
      this.changeStatus();
    });
  }

  ngOnInit(): void {
    this.changeStatus();
  }
  changeStatus() {
    this.divisionId = this.storeService.divisionId;
    this.currentDivisionType = this.storeService.divisionType;

    // console.log('load data');

    this.loadData();
  }
  async loadData() {
    this.currentDivision = await this.business.getCurrentDivision(
      this.divisionId
    );
    console.log('当前区划', this.currentDivision);

    let data = await this.business.statistic(this.divisionId);

    if (data) {
      this.rawData = data;
    }
    this.rankData = this.business.toRank<GarbageStationNumberStatistic>(
      this.rawData
    );
  }
}
