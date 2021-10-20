/*
 * @Author: pmx
 * @Date: 2021-10-13 15:02:32
 * @Last Modified by: pmx
 * @Last Modified time: 2021-10-15 09:59:04
 */
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  DropListModel,
  DropListObj,
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

  // 当前区划类型
  private currentDivisionType: DivisionType = DivisionType.None;

  // 当前区划
  private currentDivision: Division | null = null;

  //当前事件类型
  private currentEventType = EventType.IllegalDrop;

  // 服务器数据
  private rawData: DivisionNumberStatistic[] | GarbageStationNumberStatistic[] =
    [];

  // 当前区划id
  private divisionId: string = '';

  // 后代区划类型
  private childDivisionType: DivisionType | 'station' = DivisionType.None;

  /**
   * id不要用 DivisionType.City  EventType.IllegalDrop 两者会冲突
   */
  private dropListMap = new Map<DivisionType, Array<DropListModel>>([
    [
      DivisionType.City,
      [
        { id: 'county', name: '街道' },
        { id: 'committee', name: '居委会' },
      ],
    ],
    [
      DivisionType.County,
      [
        { id: 'committee', name: '居委会' },
        { id: 'station', name: '投放点' },
      ],
    ],
  ]);

  // 固定显示的下拉列表
  private dropListSolid: DropListObj = {
    status: false,
    index: 0,
    data: [
      { id: 'illegalDrop', name: '乱扔垃圾' },
      { id: 'mixInto', name: '混合投放' },
    ],
  };

  constructor(
    private storeService: StoreService,
    private business: IllegalMixintoRankBusiness
  ) {
    // 区划改变时触发
    this.storeService.statusChange.subscribe(() => {
      this.changeStatus();
    });
  }

  ngOnInit(): void {
    this.changeStatus();
  }
  ngOnDestroy() {
    console.log('destroy');
  }
  changeStatus() {
    // console.log('change status');
    this.divisionId = this.storeService.divisionId;
    this.currentDivisionType = this.storeService.divisionType;
    if (this.currentDivisionType !== DivisionType.Committees) {
      this.childDivisionType = this.currentDivisionType + 1;
    }

    let divisionDropList = this.dropListMap.get(this.currentDivisionType);

    this.dropList = [this.dropListSolid];
    if (divisionDropList) {
      this.dropList.unshift({
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
    console.log('当前区划', this.currentDivision);

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
    >(
      this.rawData,
      (item: EventNumber) => item.EventType == this.currentEventType
    );
    // console.log('rankData', this.rankData);
  }
  toggleDropList(item: DropListObj, $event: Event) {
    item.status = !item.status;
    $event.stopPropagation();
  }
  clickHandler() {
    this.dropList.forEach((list) => (list.status = false));
  }
  changeDataSourceHandler(type: string) {
    if (type == 'illegalDrop' || type == 'mixInto') {
      switch (type) {
        case 'illegalDrop':
          this.currentEventType = EventType.IllegalDrop;
          break;
        case 'mixInto':
          this.currentEventType = EventType.MixedInto;
          break;
      }
      this.rankData = this.business.toRank<
        DivisionNumberStatistic | GarbageStationNumberStatistic
      >(
        this.rawData,
        (item: EventNumber) => item.EventType == this.currentEventType
      );
      console.log('事件更新', this.rankData);
    } else if (type == 'county' || type == 'committee' || type == 'station') {
      console.log('切换区划', type);
      switch (type) {
        case 'county':
          this.childDivisionType = DivisionType.County;
          break;
        case 'committee':
          this.childDivisionType = DivisionType.Committees;
          break;
        case 'station':
          this.childDivisionType = 'station';
          break;
      }
      this.loadData();
    }
  }
}
