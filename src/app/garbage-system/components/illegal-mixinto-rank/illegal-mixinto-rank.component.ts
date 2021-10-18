/*
 * @Author: pmx
 * @Date: 2021-10-13 15:02:32
 * @Last Modified by: pmx
 * @Last Modified time: 2021-10-15 09:59:04
 */
import { Component, Input, OnInit } from '@angular/core';
import { DropListModel } from 'src/app/common/components/rank/rank.component';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { StoreService } from 'src/app/global/service/store.service';
import { Division } from 'src/app/network/model/division.model';
import { IllegalMixintoRankBusiness } from './illegal-mixinto-rank.business';

type dropListObj = {
  status: boolean;
  data: Array<DropListModel>;
};
@Component({
  selector: 'app-illegal-mixinto-rank',
  templateUrl: './illegal-mixinto-rank.component.html',
  styleUrls: ['./illegal-mixinto-rank.component.less'],
  providers: [IllegalMixintoRankBusiness],
})
export class IllegalMixintoRankComponent implements OnInit {
  // 当前区划类型
  private currentDivisionType: DivisionType = DivisionType.None;

  private currentDivision: Division | null = null;

  title: string = '乱扔垃圾排名';

  // 当前区划id
  divisionId: string = '';

  // 后代区划类型
  childDivisionType: DivisionType = DivisionType.None;

  dropListMap = new Map<DivisionType, Array<DropListModel>>([
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
  dropListSolid: dropListObj = {
    status: false,
    data: [
      { id: 'illegalDrop', name: '乱扔垃圾' },
      { id: 'mixInto', name: '混合投放' },
    ],
  };

  dropLists: Array<dropListObj> = [];

  constructor(
    private storeService: StoreService,
    private business: IllegalMixintoRankBusiness
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

    let divisionDropList = this.dropListMap.get(this.currentDivisionType);

    this.dropLists = [this.dropListSolid];
    if (divisionDropList) {
      this.dropLists.unshift({
        status: false,
        data: divisionDropList,
      });
    }

    this.childDivisionType = this.currentDivisionType + 1;

    this.loadData();
  }
  async loadData() {
    console.log('load data');
    this.currentDivision = await this.business.getCurrentDivision(
      this.divisionId
    );
    console.log('当前区划', this.currentDivision);
    let descendDivisions = await this.business.listDescendantDivisions(
      this.divisionId,
      this.childDivisionType
    );
    console.log(descendDivisions);
    let ids = descendDivisions.map((division) => division.Id);
    console.log(ids);
    this.business.statistic(ids);
  }
  toggleDropList(item: dropListObj, $event: Event) {
    item.status = !item.status;
    $event.stopPropagation();
  }
  clickHandler() {
    this.dropLists.forEach((list) => (list.status = false));
  }
}
