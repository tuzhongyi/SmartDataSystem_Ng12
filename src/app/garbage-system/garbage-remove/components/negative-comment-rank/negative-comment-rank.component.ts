/*
 * @Author: pmx
 * @Date: 2021-10-13 15:02:32
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-01 14:44:12
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
import { GlobalStoreService } from 'src/app/common/service/global-store.service';
import { DivisionNumberStatistic } from 'src/app/network/model/division-number-statistic.model';
import { Division } from 'src/app/network/model/division.model';
import { NegativeCommentRankBusiness } from './negative-comment-rank.business';
import { EventType } from 'src/app/enum/event-type.enum';
import { EventNumber } from 'src/app/network/model/event-number.model';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station-number-statistic.model';
import { Enum, EnumHelper } from 'src/app/enum/enum-helper';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { User } from 'src/app/network/model/user.model';
import { Language } from 'src/app/common/tools/language';
import { Subscription } from 'rxjs';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { NegativeCommentResource } from './negative-comment-rank.converter';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { FormControl } from '@angular/forms';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';

@Component({
  selector: 'app-negative-comment-rank',
  templateUrl: './negative-comment-rank.component.html',
  styleUrls: ['./negative-comment-rank.component.less'],
  providers: [NegativeCommentRankBusiness],
})
export class NegativeCommentRankComponent implements OnInit, OnDestroy {
  public title: string = '垃圾清运差评榜';

  resourceTypes: SelectItem[] = [];
  eventTypes: SelectItem[] = [];

  resourceType: UserResourceType = UserResourceType.Committees;

  eventType: EventType = EventType.IllegalDrop;

  resourceTypeDisplay: boolean = true;

  @Output()
  itemClickedEvent: EventEmitter<IllegalMixintoRankArgs> = new EventEmitter();

  // 处理后的排行榜数据
  public rankData: RankModel[] = [];
  constructor(
    public business: NegativeCommentRankBusiness,
    private storeService: GlobalStoreService
  ) {}

  ngOnInit(): void {
    let child = EnumHelper.GetResourceChildTypeByDivisionType(
      this.storeService.divisionType
    );
    this.resourceTypes = [
      new SelectItem(child.toString(), child, Language.UserResourceType(child)),
      new SelectItem(
        UserResourceType.Station.toString(),
        UserResourceType.Station,
        Language.UserResourceType(UserResourceType.Station)
      ),
    ];

    let eventTypeEnum = new Enum(RankEventType);
    this.eventTypes = eventTypeEnum.toArray((x) => {
      return new SelectItem(x, x, Language.EventType(x));
    });

    // 区划改变时触发
    this.business.subscription.subscribe(() => {
      this.loadData();
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
      this.storeService.divisionType === DivisionType.Committees
        ? UserResourceType.Station
        : this.resourceType,
      this.eventType
    );
    console.log(this.rankData);
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
