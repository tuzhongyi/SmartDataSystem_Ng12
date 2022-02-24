import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { StoreService } from 'src/app/global/service/store.service';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station-number-statistic.model';
import { IModel } from 'src/app/network/model/model.interface';
import { RankModel } from 'src/app/view-model/rank.model';
import { DisposalRankBusiness } from './disposal-rank.business';

@Component({
  selector: 'app-disposal-rank',
  templateUrl: './disposal-rank.component.html',
  styleUrls: ['./disposal-rank.component.less'],
  providers: [DisposalRankBusiness],
})
export class DisposalRankComponent
  implements OnInit, OnDestroy, IComponent<IModel, RankModel[]>
{
  @Output()
  itemClickedEvent: EventEmitter<RankModel> = new EventEmitter();

  public title: string = '小包垃圾处置达标率排名';

  // 处理后的排行榜数据
  public rankData: RankModel[] = [];

  constructor(business: DisposalRankBusiness) {
    this.business = business;
  }
  business: IBusiness<IModel, RankModel[]>;

  ngOnInit(): void {
    this.business.subscription?.subscribe(() => {
      this.loadData();
    });
    this.loadData();
  }
  ngOnDestroy() {
    this.business.subscription?.destroy();
  }
  async loadData() {
    this.rankData = await this.business.load();
  }

  onItemClicked(model: RankModel) {
    this.itemClickedEvent.emit(model);
  }
}
