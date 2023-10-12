/*
 * @Author: pmx
 * @Date: 2021-10-13 15:02:32
 * @Last Modified by: pmx
 * @Last Modified time: 2021-11-09 09:46:40
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Language } from 'src/app/common/tools/language';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { EventType } from 'src/app/enum/event-type.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { RankModel } from 'src/app/view-model/rank.model';
import { IllegalMixintoRankBusiness } from './illegal-mixinto-rank.business';

@Component({
  selector: 'app-illegal-mixinto-rank',
  templateUrl: './illegal-mixinto-rank.component.html',
  styleUrls: ['./illegal-mixinto-rank.component.less'],
  providers: [IllegalMixintoRankBusiness],
})
export class IllegalMixintoRankComponent implements OnInit {
  @Input() load?: EventEmitter<void>;
  @Input() set type(v: EventType | undefined) {
    if (v === undefined) {
      if (this.eventType !== EventType.IllegalDrop) {
        this.eventType = EventType.IllegalDrop;
        this.loadData();
      }
    } else {
      this.eventType = v;
      this.loadData();
    }
  }

  public title: string = '今日乱扔垃圾排名';

  resourceType: UserResourceType = UserResourceType.Committees;

  resourceTypeDisplay: boolean = true;
  EventType = EventType;
  UserResourceType = UserResourceType;
  DivisionType = DivisionType;
  Language = Language;
  eventType: EventType = EventType.IllegalDrop;

  @Output()
  itemClickedEvent: EventEmitter<IllegalMixintoRankArgs> = new EventEmitter();

  // 处理后的排行榜数据
  public rankData: RankModel[] = [];
  constructor(
    public business: IllegalMixintoRankBusiness,
    public global: GlobalStorageService
  ) {}

  ngOnInit(): void {
    // 区划改变时触发
    if (this.load) {
      this.load.subscribe((x) => {
        this.loadData();
      });
    }
    this.loadData();
  }
  async loadData() {
    let resourceType = this.resourceType;
    if (this.global.divisionType === DivisionType.Committees) {
      this.resourceTypeDisplay = false;
      resourceType = UserResourceType.Station;
    } else {
      this.resourceTypeDisplay = true;
    }

    this.title = '今日' + Language.EventType(this.eventType) + '排名';
    this.rankData = await this.business.load(
      this.global.divisionId,
      resourceType,
      this.eventType
    );
  }

  onItemClicked(model: RankModel) {
    this.itemClickedEvent.emit({
      model: model,
      resourceType: this.resourceType,
      eventType: this.eventType,
    });
  }

  onchange() {
    this.loadData();
  }
}

export interface IllegalMixintoRankArgs {
  model: RankModel;
  resourceType: UserResourceType;
  eventType: EventType;
}
