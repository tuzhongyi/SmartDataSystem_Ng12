/*
 * @Author: pmx
 * @Date: 2021-10-13 15:02:32
 * @Last Modified by: pmx
 * @Last Modified time: 2021-11-09 09:46:40
 */
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  DropListModel,
  DropListObj,
  RankDropListType,
  RankEventModel,
  RankModel,
} from 'src/app/view-model/rank.model';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { StoreService } from 'src/app/global/service/store.service';
import { DivisionNumberStatistic } from 'src/app/network/model/division-number-statistic.model';
import { Division } from 'src/app/network/model/division.model';
import { IllegalMixintoRankBusiness } from './illegal-mixinto-rank.business';
import { EventType } from 'src/app/enum/event-type.enum';
import { EventNumber } from 'src/app/network/model/event-number.model';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station-number-statistic.model';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { User } from 'src/app/network/model/user.model';
import { Language } from 'src/app/global/tool/language';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-illegal-mixinto-rank',
  templateUrl: './illegal-mixinto-rank.component.html',
  styleUrls: ['./illegal-mixinto-rank.component.less'],
  providers: [IllegalMixintoRankBusiness],
})
export class IllegalMixintoRankComponent implements OnInit, OnDestroy {
  public title: string = '乱扔垃圾排名';

  // 处理后的排行榜数据
  public rankData: RankModel[] = [];

  public dropList: Array<DropListObj> = [];

  // 在销毁组件时，取消订阅
  private subscription: Subscription | null = null;

  // 当前区划id
  private divisionId: string = '';

  // 当前区划类型
  private currentDivisionType: DivisionType = DivisionType.None;

  // 下级资源类型
  private childDivisionType!: UserResourceType;

  // 当前区划
  private currentDivision: Division | null = null;

  //当前事件类型
  private currentEventType = EventType.IllegalDrop;

  // 服务器数据
  private rawData: DivisionNumberStatistic[] | GarbageStationNumberStatistic[] =
    [];

  private dropListMap = new Map<DivisionType, Array<DropListModel>>([
    [
      DivisionType.City,
      [
        {
          id: UserResourceType.County,
          name: Language.UserResourceType(UserResourceType.County),
        },
        {
          id: UserResourceType.Committees,
          name: Language.UserResourceType(UserResourceType.Committees),
        },
      ],
    ],
    [
      DivisionType.County,
      [
        {
          id: UserResourceType.Committees,
          name: Language.UserResourceType(UserResourceType.Committees),
        },
        {
          id: UserResourceType.Station,
          name: Language.UserResourceType(UserResourceType.Station),
        },
      ],
    ],
  ]);

  // 固定显示的下拉列表
  private dropListSolid: DropListObj = {
    status: false,
    type: RankDropListType.EventType,
    index: 0,
    data: [
      {
        id: EventType.IllegalDrop,
        name: Language.EventType(EventType.IllegalDrop),
      },
      {
        id: EventType.MixedInto,
        name: Language.EventType(EventType.MixedInto),
      },
    ],
  };

  constructor(
    private storeService: StoreService,
    private business: IllegalMixintoRankBusiness
  ) {}

  ngOnInit(): void {
    // 区划改变时触发
    this.subscription = this.storeService.statusChange.subscribe(() => {
      this.changeStatus();
    });
    this.changeStatus();
  }
  ngOnDestroy() {
    console.log('destroy');
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
  changeStatus() {
    // console.log('illegalmixinto change status');
    this.divisionId = this.storeService.divisionId;
    this.currentDivisionType = this.storeService.divisionType;
    this.childDivisionType = EnumHelper.GetResourceChildType(this.currentDivisionType);

    let divisionDropList = this.dropListMap.get(this.currentDivisionType);

    this.dropList = [this.dropListSolid];
    if (divisionDropList) {
      this.dropList.unshift({
        type: RankDropListType.UserResourceType,
        index: 0,
        status: false,
        data: divisionDropList,
      });
    }

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
  toggleDropList(item: DropListObj, $event: Event) {
    item.status = !item.status;
    $event.stopPropagation();
  }
  clickHandler() {
    this.dropList.forEach((list) => (list.status = false));
  }
  changeDataSourceHandler(event: RankEventModel) {
    console.log(event);
    let type = event.type;
    let data = event.data;

    if (type == RankDropListType.EventType) {
      switch (data.id) {
        case EventType.IllegalDrop:
          this.currentEventType = EventType.IllegalDrop;

          break;
        case EventType.MixedInto:
          this.currentEventType = EventType.MixedInto;
          break;
      }
      this.title = data.name + '排名';
      this.rankData = this.business.toRank<
        DivisionNumberStatistic | GarbageStationNumberStatistic
      >(this.rawData, this.currentEventType);
    } else if (type == RankDropListType.UserResourceType) {
      switch (data.id) {
        case UserResourceType.County:
          this.childDivisionType = UserResourceType.County;
          break;
        case UserResourceType.Committees:
          this.childDivisionType = UserResourceType.Committees;
          break;
        case UserResourceType.Station:
          this.childDivisionType = UserResourceType.Station;
          break;
      }
      this.loadData();
    }
  }
}
