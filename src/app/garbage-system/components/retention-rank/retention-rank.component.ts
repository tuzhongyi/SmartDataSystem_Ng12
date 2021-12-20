import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { Enum, EnumHelper } from 'src/app/enum/enum-helper';
import { EventType } from 'src/app/enum/event-type.enum';
import { RetentionType } from 'src/app/enum/retention-type.enum';
import { Language } from 'src/app/global/tool/language';

import { RankModel } from 'src/app/view-model/rank.model';
import { RetentionRankBusiness } from './retention-rank.business';

@Component({
  selector: 'app-retention-rank',
  templateUrl: './retention-rank.component.html',
  styleUrls: ['./retention-rank.component.less'],
  providers: [RetentionRankBusiness],
})
export class RetentionRankComponent implements OnInit, OnDestroy {
  public title: string = '垃圾滞留时长排名';

  // 处理后的排行榜数据
  public rankData: RankModel[] = [];

  retentionTypes: SelectItem[] = [];
  //当前事件类型
  private retentionType = RetentionType.RetentionTime;

  constructor(private business: RetentionRankBusiness) {}

  ngOnInit(): void {
    let _enum = new Enum(RetentionType);
    this.retentionTypes = _enum.toArray((x) => {
      return new SelectItem({
        key: x,
        value: x,
        language: Language.RetentionType(x),
      });
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
    this.rankData = await this.business.load(this.retentionType);

    switch (this.retentionType) {
      case RetentionType.RetentionTime:
        this.title = '今日垃圾滞留时长排名';
        break;
      case RetentionType.RetentionStationNumber:
        this.title = '今日垃圾滞留投放点数量排名';
        break;
      default:
        break;
    }
  }

  onRetentionTypeSelected(item: SelectItem) {
    this.retentionType = item.value;
    this.loadData();
  }
}
