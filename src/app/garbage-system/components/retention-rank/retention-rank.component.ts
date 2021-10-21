import { Component, OnInit } from '@angular/core';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { EventType } from 'src/app/enum/event-type.enum';
import { RetentionType } from 'src/app/enum/retention-type.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { StoreService } from 'src/app/global/service/store.service';
import { DivisionNumberStatistic } from 'src/app/network/model/division-number-statistic.model';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station-number-statistic.model';
import {
  DropListObj,
  RankDropListType,
  RankEventModel,
  RankModel,
} from 'src/app/view-model/rank.model';
import { RetentionRankBusiness } from './retention-rank.business';

@Component({
  selector: 'app-retention-rank',
  templateUrl: './retention-rank.component.html',
  styleUrls: ['./retention-rank.component.less'],
  providers: [RetentionRankBusiness],
})
export class RetentionRankComponent implements OnInit {
  public title: string = '垃圾滞留时长排名';

  // 处理后的排行榜数据
  public rankData: RankModel[] = [];

  public dropList: Array<DropListObj> = [];

  // 当前区划id
  private divisionId: string = '';

  // 当前区划类型
  private currentDivisionType: DivisionType = DivisionType.None;

  // 下级资源类型
  private childDivisionType!: UserResourceType;

  // 当前区划
  private currentDivision: Division | null = null;

  //当前事件类型
  private currentEventType = RetentionType.GarbageTime;

  // 服务器数据
  private rawData: DivisionNumberStatistic[] | GarbageStationNumberStatistic[] =
    [];

  // 固定显示的下拉列表
  private dropListSolid: DropListObj = {
    status: false,
    type: RankDropListType.RetentionType,
    index: 0,
    data: [
      { id: RetentionType.GarbageTime, name: '滞留时长' },
      { id: RetentionType.GarbageDropStationNumber, name: '滞留点数量' },
    ],
  };

  constructor(
    private storeService: StoreService,
    private business: RetentionRankBusiness
  ) {
    // 区划改变时触发
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
    this.childDivisionType = EnumHelper.GetChildType(this.currentDivisionType);

    this.dropList = [this.dropListSolid];

    this.loadData();
  }
  async loadData() {
    // console.log('load data');
    this.currentDivision = await this.business.getCurrentDivision(
      this.divisionId
    );
    // console.log('当前区划', this.currentDivision);

    let data = await this.business.statistic(
      this.divisionId,
      this.currentDivisionType,
      this.childDivisionType
    );

    if (data) {
      this.rawData = data;
    }
    // console.log('rawData', this.rawData);
    this.rankData = this.business.toRank<
      DivisionNumberStatistic | GarbageStationNumberStatistic
    >(this.rawData, this.currentEventType);
    // console.log('rankData', this.rankData);
  }
  changeDataSourceHandler(event: RankEventModel) {
    // console.log(event);
    let type = event.type;
    let data = event.data;
    if (type == RankDropListType.RetentionType) {
      switch (data.id) {
        case RetentionType.GarbageTime:
          this.currentEventType = RetentionType.GarbageTime;
          break;
        case RetentionType.GarbageDropStationNumber:
          this.currentEventType = RetentionType.GarbageDropStationNumber;
          break;
      }
      this.title = '垃圾' + data.name + '排名';
      this.rankData = this.business.toRank<
        DivisionNumberStatistic | GarbageStationNumberStatistic
      >(this.rawData, this.currentEventType);
    }
  }
}
