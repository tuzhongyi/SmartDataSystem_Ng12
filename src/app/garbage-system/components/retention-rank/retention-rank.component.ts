import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { Enum, EnumHelper } from 'src/app/enum/enum-helper';
import { EventType } from 'src/app/enum/event-type.enum';
import { RetentionType } from 'src/app/enum/retention-type.enum';
import { Language } from 'src/app/global/tool/language';
import { IModel } from 'src/app/network/model/model.interface';

import { RankModel } from 'src/app/view-model/rank.model';
import { RetentionRankBusiness } from './retention-rank.business';

@Component({
  selector: 'app-retention-rank',
  templateUrl: './retention-rank.component.html',
  styleUrls: ['./retention-rank.component.less'],
  providers: [RetentionRankBusiness],
})
export class RetentionRankComponent
  implements OnInit, OnDestroy, IComponent<IModel, RankModel[]>
{
  @Output()
  Click: EventEmitter<RetentionRankArgs> = new EventEmitter();

  public title: string = '垃圾滞留时长排名';

  // 处理后的排行榜数据
  public rankData: RankModel[] = [];

  retentionTypes: SelectItem[] = [];
  //当前事件类型
  private retentionType = RetentionType.RetentionTime;

  constructor(business: RetentionRankBusiness) {
    this.business = business;
  }
  @Input()
  business: IBusiness<IModel, RankModel[]>;

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
    if (this.business.subscription) {
      this.business.subscription.subscribe(() => {
        this.loadData();
      });
    }

    this.loadData();
  }
  ngOnDestroy() {
    if (this.business.subscription) {
      this.business.subscription.destroy();
    }
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

  onclick(item: RankModel) {
    this.Click.emit({
      type: this.retentionType,
      model: item,
    });
  }
}

export interface RetentionRankArgs {
  type: RetentionType;
  model: RankModel;
}
