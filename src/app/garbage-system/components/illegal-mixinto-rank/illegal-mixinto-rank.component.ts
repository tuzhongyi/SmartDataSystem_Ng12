/*
 * @Author: pmx
 * @Date: 2021-10-13 15:02:32
 * @Last Modified by: pmx
 * @Last Modified time: 2021-11-09 09:46:40
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Language } from 'src/app/common/tools/language';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { Enum, EnumHelper } from 'src/app/enum/enum-helper';
import { EventType } from 'src/app/enum/event-type.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { RankEventType, RankModel } from 'src/app/view-model/rank.model';
import { IllegalMixintoRankBusiness } from './illegal-mixinto-rank.business';

@Component({
  selector: 'app-illegal-mixinto-rank',
  templateUrl: './illegal-mixinto-rank.component.html',
  styleUrls: ['./illegal-mixinto-rank.component.less'],
  providers: [IllegalMixintoRankBusiness],
})
export class IllegalMixintoRankComponent implements OnInit {
  @Input() load?: EventEmitter<void>;

  public title: string = '今日乱扔垃圾排名';

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
    if (this.load) {
      this.load.subscribe((x) => {
        let type = EnumHelper.ConvertDivisionToUserResource(
          this.storeService.divisionType
        );

        if (this.storeService.divisionType !== this.currentType) {
          this.initType(type);
        }
        this.loadData();
        this.currentType = this.storeService.divisionType;
      });
    }
    this.loadData();
  }
  async loadData() {
    this.resourceTypeDisplay =
      this.storeService.divisionType !== DivisionType.Committees;
    this.title = '今日' + Language.EventType(this.eventType) + '排名';
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
    if (item) {
      if (this.resourceType === item.value) return;
      this.resourceType = item.value;
      this.loadData();
    }
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
