/*
 * @Author: pmx
 * @Date: 2021-10-13 15:02:32
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-01 14:44:12
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Language } from 'src/app/common/tools/language';
import { DivisionType } from 'src/app/enum/division-type.enum';

import { EnumTool } from 'src/app/common/tools/enum-tool/enum.tool';
import { Enum } from 'src/app/enum/enum.model';
import { EventType } from 'src/app/enum/event-type.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { RankEventType, RankModel } from 'src/app/view-model/rank.model';
import { NegativeCommentRankBusiness } from './negative-comment-rank.business';

@Component({
  selector: 'app-negative-comment-rank',
  templateUrl: './negative-comment-rank.component.html',
  styleUrls: ['./negative-comment-rank.component.less'],
  providers: [NegativeCommentRankBusiness],
})
export class NegativeCommentRankComponent implements OnInit {
  @Input() load?: EventEmitter<void>;

  @Output() itemClickedEvent: EventEmitter<IllegalMixintoRankArgs> =
    new EventEmitter();

  constructor(
    public business: NegativeCommentRankBusiness,
    private storeService: GlobalStorageService
  ) {}

  public title: string = '垃圾清运差评榜';

  resourceTypes: SelectItem[] = [];
  eventTypes: SelectItem[] = [];

  resourceType: UserResourceType = UserResourceType.Committees;

  eventType: EventType = EventType.IllegalDrop;

  resourceTypeDisplay: boolean = true;
  // 处理后的排行榜数据
  public rankData: RankModel[] = [];
  ngOnInit(): void {
    let child = EnumTool.resource.child(
      EnumTool.resource.from.division(
        this.storeService.division.selected.DivisionType
      )
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
    if (this.load) {
      this.load.subscribe((x) => {
        this.loadData();
      });
    }
    this.loadData();
  }
  async loadData() {
    this.resourceTypeDisplay =
      this.storeService.division.selected.DivisionType !==
      DivisionType.Committees;
    this.title = Language.EventType(this.eventType) + '排名';
    this.rankData = await this.business.load(
      this.storeService.division.selected.Id,
      this.storeService.division.selected.DivisionType ===
        DivisionType.Committees
        ? UserResourceType.Station
        : this.resourceType,
      this.eventType
    );
    // console.log(this.rankData);
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
