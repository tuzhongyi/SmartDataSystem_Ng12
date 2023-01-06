/*
 * @Author: pmx
 * @Date: 2021-10-13 15:02:32
 * @Last Modified by: pmx
 * @Last Modified time: 2021-11-09 09:46:40
 */
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  DropListModel,
  DropListObj,
  RankDropListType,
  RankEventModel,
  RankEventType,
  RankModel,
  RankResourceType,
} from 'src/app/view-model/rank.model';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { DivisionNumberStatistic } from 'src/app/network/model/division-number-statistic.model';
import { Division } from 'src/app/network/model/division.model';
import { IllegalMixintoRankBusiness } from './illegal-mixinto-rank.business';
import { EventType } from 'src/app/enum/event-type.enum';
import { EventNumber } from 'src/app/network/model/event-number.model';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station-number-statistic.model';
import { Enum, EnumHelper } from 'src/app/enum/enum-helper';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { User } from 'src/app/network/model/user.model';
import { Language } from 'src/app/common/tools/language';
import { Subscription } from 'rxjs';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IllegalMixintoDataResource } from './illegal-mixinto-rank.converter';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { FormControl } from '@angular/forms';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';

@Component({
  selector: 'app-illegal-mixinto-rank',
  templateUrl: './illegal-mixinto-rank.component.html',
  styleUrls: ['./illegal-mixinto-rank.component.less'],
  providers: [IllegalMixintoRankBusiness],
})
export class IllegalMixintoRankComponent implements OnInit, OnDestroy {
  public title: string = '乱扔垃圾排名';

  resourceTypes: SelectItem[] = [];
  eventTypes: SelectItem[] = [];
  currentType: DivisionType;

  resourceType: UserResourceType = UserResourceType.Committees;

  eventType: EventType = EventType.IllegalDrop;

  resourceTypeDisplay: boolean = true;

  @Output()
  itemClickedEvent: EventEmitter<IllegalMixintoRankArgs> = new EventEmitter();

  // 处理后的排行榜数据
  public rankData: RankModel[] = [];
  constructor(
    public business: IllegalMixintoRankBusiness,
    private storeService: GlobalStorageService
  ) {
    this.currentType = this.storeService.divisionType;
  }

  ngOnInit(): void {
    let type = EnumHelper.ConvertDivisionToUserResource(
      this.storeService.divisionType
    );
    this.initType(type);

    let eventTypeEnum = new Enum(RankEventType);
    this.eventTypes = eventTypeEnum.toArray((x) => {
      return new SelectItem(x, x, Language.EventType(x));
    });

    // 区划改变时触发
    this.business.subscription.subscribe(() => {
      let type = EnumHelper.ConvertDivisionToUserResource(
        this.storeService.divisionType
      );

      if (this.storeService.divisionType !== this.currentType) {
        this.initType(type);
      }
      this.loadData();
      this.currentType = this.storeService.divisionType;
    });
    this.loadData();
  }
  ngOnDestroy() {
    this.business.subscription.destroy();
  }
  async loadData() {
    this.resourceTypeDisplay =
      this.storeService.divisionType !== DivisionType.Committees;
    this.title = Language.EventType(this.eventType) + '排名';
    this.rankData = await this.business.load(
      this.storeService.divisionId,
      this.resourceType,
      this.eventType
    );
  }

  initType(type: UserResourceType) {
    let child = EnumHelper.GetResourceChildType(type);
    this.resourceTypes = [];
    let resource = new SelectItem(
      child.toString(),
      child,
      Language.UserResourceType(child)
    );
    this.resourceTypes.push(resource);
    child = EnumHelper.GetResourceChildType(child);
    resource = new SelectItem(
      child.toString(),
      child,
      Language.UserResourceType(child)
    );
    this.resourceTypes.push(resource);
    this.resourceType = this.resourceTypes[0].value;
  }

  onItemClicked(model: RankModel) {
    this.itemClickedEvent.emit({
      model: model,
      resourceType: this.resourceType,
      eventType: this.eventType,
    });
  }

  onResourceTypeSelected(item: SelectItem) {
    if (this.resourceType === item.value) return;
    this.resourceType = item.value;
    this.loadData();
  }
  onEventTypeSelected(item: SelectItem) {
    if (this.eventType == item.value) return;
    this.eventType = item.value;
    this.loadData();
  }
}

export interface IllegalMixintoRankArgs {
  model: RankModel;
  resourceType: UserResourceType;
  eventType: EventType;
}
